import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

async function sendQuoteNotification(details: {
  bookingId: string;
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  size: string;
  cleaningType: string;
  rooms: string;
  frequency: string;
  location: string;
  notes: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.QUOTE_NOTIFICATION_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.warn("Quote email notification skipped: Resend environment variables are not configured.");
    return;
  }

  const message = [
    "New quote request",
    `Reference: ${details.bookingId}`,
    `Name: ${details.fullName}`,
    `Email: ${details.email}`,
    `Phone / WhatsApp: ${details.phone}`,
    `Property: ${details.propertyType}`,
    `Size: ${details.size || "Not provided"}`,
    `Cleaning type: ${details.cleaningType}`,
    `Rooms: ${details.rooms || "Not provided"}`,
    `Frequency: ${details.frequency}`,
    `Location: ${details.location}`,
    `Notes: ${details.notes || "None"}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: `New quote request from ${details.fullName}`,
      text: message,
    }),
  });

  if (!response.ok) {
    console.error("Quote email notification failed:", await response.text());
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const propertyType = String(body.propertyType ?? "").trim();
    const size = String(body.size ?? "").trim();
    const cleaningType = String(body.cleaningType ?? "").trim();
    const rooms = String(body.rooms ?? "").trim();
    const frequency = String(body.frequency ?? "One-time").trim();
    const location = String(body.location ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const fullName = String(body.fullName ?? "").trim();

    if (!fullName || !email || !phone || !propertyType || !cleaningType || !location) {
      return NextResponse.json(
        { error: "Missing required quote details." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        {
          message: "Quote request accepted in demo mode. Add your Supabase credentials to store it in the database.",
          demoMode: true,
          data: {
            fullName,
            email,
            phone,
            propertyType,
            size,
            cleaningType,
            rooms,
            frequency,
            location,
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
          address: location,
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
          name: cleaningType,
          description: `${propertyType} • ${size} • ${frequency}`,
          base_price: 0,
        },
        { onConflict: "name" }
      )
      .select()
      .single();

    if (serviceError) {
      throw serviceError;
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        customer_id: customer.id,
        service_id: service.id,
        date: new Date().toISOString().slice(0, 10),
        time: "TBD",
        status: "quote_requested",
        price: 0,
        notes: `${propertyType} • ${size} • ${rooms} rooms • ${location} • ${notes}`,
      })
      .select()
      .single();

    if (bookingError) {
      throw bookingError;
    }

    await supabaseAdmin.from("payments").insert({
      booking_id: booking.id,
      amount: 0,
      status: "pending",
      reference: `quote-${booking.id}`,
    });

    await sendQuoteNotification({
      bookingId: booking.id,
      fullName,
      email,
      phone,
      propertyType,
      size,
      cleaningType,
      rooms,
      frequency,
      location,
      notes,
    });

    return NextResponse.json(
      {
        message: "Quote request saved successfully.",
        demoMode: false,
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      {
        error: "Unable to save quote request right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
