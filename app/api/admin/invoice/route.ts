import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function invoiceNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `KC-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function GET(request: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured." }, { status: 400 });

    const bookingId = new URL(request.url).searchParams.get("bookingId");
    if (!bookingId) return NextResponse.json({ error: "Missing booking id." }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("invoices")
      .select("*, items:invoice_items(*)")
      .eq("booking_id", bookingId)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json({ invoice: data }, { status: 200 });
  } catch (error) {
    console.error("Invoice fetch error:", error);
    return NextResponse.json({ error: "Unable to load invoice." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured." }, { status: 400 });

    const body = await request.json();
    const bookingId = String(body.bookingId ?? "").trim();
    const status = String(body.status ?? "draft").trim();
    const dueDate = String(body.dueDate ?? "").trim() || null;
    const paymentDetails = String(body.paymentDetails ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const discount = Math.max(0, Number(body.discount ?? 0) || 0);
    const items = Array.isArray(body.items)
      ? body.items
          .map((item: { description?: unknown; amount?: unknown }, index: number) => ({
            description: String(item.description ?? "").trim(),
            amount: Math.max(0, Number(item.amount ?? 0) || 0),
            sort_order: index,
          }))
          .filter((item: { description: string }) => item.description)
      : [];

    if (!bookingId || items.length === 0) {
      return NextResponse.json({ error: "Add at least one invoice item." }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, item: { amount: number }) => sum + item.amount, 0);
    const total = Math.max(0, subtotal - discount);
    const { data: existing, error: existingError } = await supabaseAdmin
      .from("invoices")
      .select("id, invoice_number")
      .eq("booking_id", bookingId)
      .maybeSingle();

    if (existingError) throw existingError;

    const payload = {
      booking_id: bookingId,
      invoice_number: existing?.invoice_number ?? invoiceNumber(),
      status,
      subtotal,
      discount,
      total,
      due_date: dueDate,
      payment_details: paymentDetails,
      notes,
      updated_at: new Date().toISOString(),
    };

    const { data: invoice, error: invoiceError } = await supabaseAdmin
      .from("invoices")
      .upsert(payload, { onConflict: "booking_id" })
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    const { error: deleteError } = await supabaseAdmin.from("invoice_items").delete().eq("invoice_id", invoice.id);
    if (deleteError) throw deleteError;

    const { error: itemError } = await supabaseAdmin.from("invoice_items").insert(
      items.map((item: { description: string; amount: number; sort_order: number }) => ({ ...item, invoice_id: invoice.id }))
    );
    if (itemError) throw itemError;

    return NextResponse.json({ invoice: { ...invoice, items } }, { status: 200 });
  } catch (error) {
    console.error("Invoice save error:", error);
    return NextResponse.json({ error: "Unable to save invoice. Run the invoice tables in Supabase first." }, { status: 500 });
  }
}