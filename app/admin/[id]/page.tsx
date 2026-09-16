import { AdminGate } from "@/components/admin-gate";
import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

async function loadRequest(id: string) {
  if (!supabaseAdmin) {
    return null;
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

  const extendedSelect = `
    ${baseSelect},
    property_type,
    bedrooms,
    location,
    preferred_day,
    preferred_time
  `;

  let response = await supabaseAdmin.from("bookings").select(extendedSelect).eq("id", id).single();

  if (response.error && (response.error.code === "42703" || String(response.error.message ?? "").toLowerCase().includes("does not exist"))) {
    response = await supabaseAdmin.from("bookings").select(baseSelect).eq("id", id).single();
  }

  const { data, error } = response;

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function AdminRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await loadRequest(id);

  if (!item) {
    notFound();
  }

  const customer = Array.isArray(item.customer) ? item.customer[0] : item.customer;
  const service = Array.isArray(item.service) ? item.service[0] : item.service;

  return (
    <AdminGate>
      <div className="container py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Customer details</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-900">Request details</h1>
          </div>
          <Link href="/admin" className="btn-primary inline-flex h-11 items-center px-5 text-sm">
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Request</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{service?.name ?? "Service request"}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                {item.status}
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Customer</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{customer?.name ?? "Unknown customer"}</p>
                <p className="mt-1 text-sm text-slate-600">{customer?.email ?? "No email"}</p>
                <p className="text-sm text-slate-600">{customer?.phone ?? "No phone"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Property</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.property_type ?? "Not specified"}</p>
                <p className="mt-1 text-sm text-slate-600">{item.bedrooms ? `${item.bedrooms} bedrooms` : "Bedrooms not specified"}</p>
                <p className="text-sm text-slate-600">{item.location ?? "Location not specified"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Preferred date</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.date ?? item.preferred_day ?? "Not specified"}</p>
                <p className="mt-1 text-sm text-slate-600">{item.time ?? item.preferred_time ?? "No time specified"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Quote value</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {item.price != null ? `$${Number(item.price).toLocaleString()}` : "Not quoted yet"}
                </p>
                <p className="mt-1 text-sm text-slate-600">Created {new Date(item.created_at ?? Date.now()).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Notes</p>
              <p className="mt-3 whitespace-pre-wrap text-slate-700">
                {item.notes || "No notes provided by the customer."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-card p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Contact info</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p><span className="font-semibold text-slate-900">Name:</span> {customer?.name ?? "—"}</p>
                <p><span className="font-semibold text-slate-900">Email:</span> {customer?.email ?? "—"}</p>
                <p><span className="font-semibold text-slate-900">Phone:</span> {customer?.phone ?? "—"}</p>
                <p><span className="font-semibold text-slate-900">Address:</span> {customer?.address ?? "—"}</p>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Service summary</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p><span className="font-semibold text-slate-900">Service:</span> {service?.name ?? "—"}</p>
                <p><span className="font-semibold text-slate-900">Description:</span> {service?.description ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
