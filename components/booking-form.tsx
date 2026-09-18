"use client";

import { useState } from "react";

const serviceOptions = [
  "Residential Cleaning",
  "Deep Cleaning",
  "Sofa & Chair Cleaning",
  "Surface Cleaning",
  "Office Cleaning",
  "Commercial Cleaning",
  "Post-Construction Cleaning",
  "Event / Hall Cleaning",
  "Move-In / Move-Out Cleaning",
  "Custom Cleaning",
];

const propertyTypes = ["Apartment", "House", "Office", "Commercial Space", "Event Venue", "Other"];

export function BookingForm() {
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
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      service: String(formData.get("service") ?? ""),
      propertyType: String(formData.get("propertyType") ?? ""),
      bedrooms: Number(formData.get("bedrooms") ?? 0),
      location: String(formData.get("location") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      preferredDay: String(formData.get("preferredDay") ?? ""),
      preferredTime: String(formData.get("preferredTime") ?? ""),
      frequency: String(formData.get("frequency") ?? "One-time"),
      notes: String(formData.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to submit booking request.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit booking request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="surface-card p-6 sm:p-8">
      {submitted ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Booking request received</p>
          <h3 className="mt-3 text-2xl font-semibold">Thanks, your cleaning request is ready for review.</h3>
          <p className="mt-3 text-sm leading-6 text-emerald-800">
            A scheduling specialist will reach out soon to confirm availability and next steps.
          </p>
        </div>
      ) : (
        <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-black">
            Full name
            <input name="fullName" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Your full name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Phone number (Nigeria)
            <input name="phone" type="tel" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="+234 90 1234 5678" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Email
            <input name="email" type="email" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="you@example.com" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Cleaning type
            <select name="service" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Property type
            <select name="propertyType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Bedrooms
            <input name="bedrooms" type="number" min="1" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="e.g. 3" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Street address
            <input name="address" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Your street address" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Location
            <input name="location" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="e.g. Akure" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Preferred day
            <input name="preferredDay" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="e.g. Saturday" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Preferred time
            <input name="preferredTime" type="time" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Service date
            <input name="date" type="date" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black">
            Service time
            <input name="time" type="time" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
            Frequency
            <select name="frequency" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition focus:border-violet-400 focus:bg-white" required>
              <option>One-time</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
            Additional requirements
            <textarea name="notes" rows={4} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Any details we should know?" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
            Optional photo upload
            <input type="file" accept="image/*" className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-black file:mr-4 file:rounded-full file:border-0 file:bg-violet-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-violet-800" />
          </label>

          {error ? <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary h-12 px-6 text-sm" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
