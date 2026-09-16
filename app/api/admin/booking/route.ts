import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const baseSelect = `
      id,
      status,
      price,
      date,
      time,
      notes,
      created_at,
      customer:customer_id (
        name,
        email,
        phone,
        address
      ),
      service:service_id (
        name,
        description
      )
    `;

    let response: any = await supabaseAdmin
      .from("bookings")
      .select(baseSelect)
      .order("created_at", { ascending: false });

    if (response.error && response.error.code === "42703") {
      response = await supabaseAdmin
        .from("bookings")
        .select(
          `
            id,
            status,
            price,
            notes,
            created_at,
            customer:customer_id (
              name,
              email,
              phone,
              address
            ),
            service:service_id (
              name,
              description
            )
          `
        )
        .order("created_at", { ascending: false });
    }

    if (response.error) {
      throw response.error;
    }

    return NextResponse.json({ items: response.data ?? [] }, { status: 200 });
  } catch (error) {
    console.error("Booking admin fetch error:", error);
    return NextResponse.json(
      { error: "Unable to fetch booking requests right now." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 400 });
    }

    const body = await request.json();
    const id = String(body.id ?? "").trim();
    const status = String(body.status ?? "").trim();
    const priceValue = body.price;
    const normalizedPrice = priceValue === undefined || priceValue === null || priceValue === "" ? 0 : Number(priceValue);

    if (!id || !status) {
      return NextResponse.json({ error: "Missing booking id or status." }, { status: 400 });
    }

    const updatePayload: { status: string; price?: number } = { status };
    if (status === "quoted" || status === "confirmed" || status === "in_progress" || status === "completed") {
      updatePayload.price = Number.isFinite(normalizedPrice) ? normalizedPrice : 0;
    }

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ item: data }, { status: 200 });
  } catch (error) {
    console.error("Booking admin update error:", error);
    return NextResponse.json(
      { error: "Unable to update booking status right now." },
      { status: 500 }
    );
  }
}
