"use client";

import { useState } from "react";

const propertyTypes = ["Apartment", "House", "Office", "Commercial", "Event Venue", "Other"];
const cleaningTypes = ["Residential", "Deep Clean", "Office", "Commercial", "Move-In / Move-Out", "Custom"];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      propertyType: String(formData.get("propertyType") ?? ""),
      size: String(formData.get("size") ?? ""),
      cleaningType: String(formData.get("cleaningType") ?? ""),
      rooms: String(formData.get("rooms") ?? ""),
      frequency: String(formData.get("frequency") ?? "One-time"),
      location: String(formData.get("location") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to submit quote request.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit quote request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="surface-card p-6 sm:p-8">
      {submitted ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Quote request submitted</p>
          <h3 className="mt-3 text-2xl font-semibold">Your request is in the queue.</h3>
          <p className="mt-3 text-sm leading-6 text-emerald-800">
            We will review your details and send a final estimate within one business day.
          </p>
        </div>
      ) : (
        <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-black">
            Full name
            <input name="fullName" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Your full name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Email
            <input name="email" type="email" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="you@example.com" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Phone / WhatsApp number (Nigeria)
            <input name="phone" type="tel" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="+234 90 1234 5678" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Type of property
            <select name="propertyType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Size of space
            <input name="size" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="e.g. 1,200 sq ft" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Cleaning type
            <select name="cleaningType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              {cleaningTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Number of rooms
            <input name="rooms" type="number" min="1" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="e.g. 4" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Frequency
            <select name="frequency" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              <option>One-time</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
            Location
            <input name="location" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="City or zip code" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
            Special requirements
            <textarea name="notes" rows={4} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Tell us about pets, sensitive products, extra rooms, or access details." />
          </label>

          {error ? <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary h-12 px-6 text-sm" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request My Quote"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
