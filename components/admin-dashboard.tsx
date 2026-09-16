"use client";

import { useEffect, useState } from "react";

type AdminItem = {
  id: string;
  status: string;
  price?: number | null;
  property_type?: string | null;
  bedrooms?: number | null;
  location?: string | null;
  date?: string | null;
  time?: string | null;
  preferred_day?: string | null;
  preferred_time?: string | null;
  notes?: string | null;
  created_at?: string | null;
  address?: string | null;
  customer?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
  service?: {
    name?: string | null;
    description?: string | null;
  } | null;
};

const statusOptions = [
  "pending",
  "quote_requested",
  "quoted",
  "confirmed",
  "in_progress",
  "completed",
  "declined",
];

const requestFilters = [
  { id: "all", label: "All requests" },
  { id: "booking", label: "Bookings" },
  { id: "quote", label: "Quotes" },
] as const;

function formatStatusLabel(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AdminDashboard() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof requestFilters)[number]["id"]>("all");

  async function loadItems() {
    try {
      const response = await fetch("/api/admin/booking");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to load bookings.");
      }

      setItems(result.items ?? []);
    } catch (error) {
      console.error("Failed to load bookings", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function updateStatus(id: string, status: string, price?: number) {
    setUpdatingId(id);

    try {
      const response = await fetch("/api/admin/booking", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status, price }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to update booking status.");
      }

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: result.item?.status ?? status,
                price: result.item?.price ?? item.price ?? price ?? 0,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update booking status", error);
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "quote") return item.status === "quote_requested" || item.status === "quoted";
    return item.status !== "quote_requested" && item.status !== "quoted";
  });

  const totalPending = items.filter((item) => item.status !== "completed" && item.status !== "declined").length;
  const totalConfirmed = items.filter((item) => item.status === "confirmed" || item.status === "in_progress").length;
  const quoteCount = items.filter((item) => item.status === "quote_requested" || item.status === "quoted").length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="surface-card p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Total requests</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{items.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalPending}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Active</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalConfirmed}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Quotes</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{quoteCount}</p>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Bookings & quote requests</h2>
            <div className="flex flex-wrap gap-2">
              {requestFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeFilter === filter.id
                      ? "bg-violet-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-slate-600">Loading requests…</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-6 text-slate-600">
            {activeFilter === "quote"
              ? "No quote requests are waiting for review."
              : activeFilter === "booking"
                ? "No bookings are currently active."
                : "No bookings or quote requests have been submitted yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Service</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 align-top">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.customer?.name ?? "Unknown"}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.customer?.email ?? "No email"}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.customer?.phone ?? "No phone"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{item.service?.name ?? "Unknown service"}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item.status === "quote_requested" || item.status === "quoted" ? "Quote request" : item.property_type ?? ""}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{item.bedrooms ? `${item.bedrooms} bedrooms` : ""}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{item.location ?? "—"}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.address ?? item.customer?.address ?? ""}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{item.date ?? item.preferred_day ?? "—"}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.time ?? item.preferred_time ?? "—"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="mb-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        {item.status === "quote_requested" || item.status === "quoted" ? "Quote" : "Booking"}
                      </div>

                      {item.status === "quote_requested" || item.status === "quoted" ? (
                        <div className="mt-2 space-y-2">
                          <label className="grid gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                            Quote amount
                            <input
                              type="number"
                              min="0"
                              step="1"
                              defaultValue={item.price ?? 0}
                              onBlur={(event) => {
                                const value = Number(event.target.value || 0);
                                if (!Number.isNaN(value)) {
                                  updateStatus(item.id, "quoted", value);
                                }
                              }}
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-400"
                            />
                          </label>
                        </div>
                      ) : null}

                      <div className="mt-2">
                        <select
                          value={item.status}
                          onChange={(event) => updateStatus(item.id, event.target.value, item.price ?? 0)}
                          disabled={updatingId === item.id}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-400"
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {formatStatusLabel(option)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs text-xs text-slate-600">
                        {item.notes || "No notes provided."}
                      </div>
                      <a
                        href={`/admin/${item.id}`}
                        className="mt-3 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
                      >
                        View details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
