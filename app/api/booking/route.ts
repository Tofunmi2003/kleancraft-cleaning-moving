import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

function isUnsupportedColumnError(error: any) {
  const message = String(error?.message ?? error?.details ?? "").toLowerCase();
  return (
    error?.code === "42703" ||
    error?.code === "PGRST204" ||
    message.includes("column") && message.includes("does not exist") ||
    message.includes("could not find the") && message.includes("column") ||
    message.includes("unknown column") ||
    message.includes("property_type") ||
    message.includes("preferred_day") ||
    message.includes("preferred_time")
  );
}

function isTransientBookingInsertFailure(error: any) {
  const message = String(error?.message ?? error?.details ?? "").toLowerCase();
  return message.includes("fetch failed") || message.includes("socketerror") || message.includes("other side closed");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const address = String(body.address ?? "").trim();
    const serviceName = String(body.service ?? "").trim();
    const propertyType = String(body.propertyType ?? "").trim();
    const bedrooms = Number(body.bedrooms ?? 0);
    const location = String(body.location ?? "").trim();
    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();
    const preferredDay = String(body.preferredDay ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();
    const frequency = String(body.frequency ?? "One-time").trim();
    const notes = String(body.notes ?? "").trim();

    if (!fullName || !phone || !email || !serviceName || !date || !time) {
      return NextResponse.json(
        { error: "Missing required booking details." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        {
          message: "Booking accepted in demo mode. Add your Supabase credentials to persist it to the database.",
          demoMode: true,
          data: {
            fullName,
            phone,
            email,
            address,
            serviceName,
            propertyType,
            bedrooms,
            location,
            date,
            time,
            preferredDay,
            preferredTime,
            frequency,
            notes,
          },
        },
        { status: 202 }
      );
    }

    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .upsert(
        {
          name: fullName,
          phone,
          email,
          address,
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (customerError) {
      throw customerError;
    }

    const { data: service, error: serviceError } = await supabaseAdmin
      .from("services")
      .upsert(
        {
          name: serviceName,
          description: `Service requested for ${fullName}`,
          base_price: 0,
        },
        { onConflict: "name" }
      )
      .select()
      .single();

    if (serviceError) {
      throw serviceError;
    }

    const baseBookingPayload = {
      customer_id: customer.id,
      service_id: service.id,
      date: date || null,
      time: time || null,
      status: "pending",
      price: 0,
      notes: `${frequency} • ${notes}`,
    };

    const bookingPayloads = [
      {
        ...baseBookingPayload,
        ...(propertyType ? { property_type: propertyType } : {}),
        ...(bedrooms ? { bedrooms } : {}),
        ...(location ? { location } : {}),
        ...(preferredDay ? { preferred_day: preferredDay } : {}),
        ...(preferredTime ? { preferred_time: preferredTime } : {}),
      },
      baseBookingPayload,
    ];

    let booking;
    let bookingError;

    for (const payload of bookingPayloads) {
      try {
        const result = await supabaseAdmin.from("bookings").insert(payload).select().single();
        booking = result.data;
        bookingError = result.error;

        if (!bookingError) {
          break;
        }

        if (!isUnsupportedColumnError(bookingError) && !isTransientBookingInsertFailure(bookingError)) {
          break;
        }
      } catch (error) {
        bookingError = error as { message?: string; code?: string };
        if (!isUnsupportedColumnError(bookingError) && !isTransientBookingInsertFailure(bookingError)) {
          break;
        }
      }
    }

    if (bookingError || !booking) {
      throw bookingError ?? new Error("Booking insert failed without an error payload.");
    }

    const { error: paymentError } = await supabaseAdmin.from("payments").insert({
      booking_id: booking.id,
      amount: 0,
      status: "pending",
      reference: `booking-${booking.id}`,
    });

    if (paymentError) {
      throw paymentError;
    }

    return NextResponse.json(
      {
        message: "Booking saved successfully.",
        demoMode: false,
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      {
        error: "Unable to save booking right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
