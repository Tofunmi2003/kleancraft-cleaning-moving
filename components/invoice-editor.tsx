"use client";

import { useEffect, useState } from "react";

type InvoiceItem = { description: string; amount: number };

type InvoiceEditorProps = {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  requestLabel: string;
};

const currency = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function InvoiceEditor({ bookingId, customerName, customerEmail, customerPhone, customerAddress, requestLabel }: InvoiceEditorProps) {
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", amount: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/invoice?bookingId=${bookingId}`)
      .then((response) => response.json())
      .then((result) => {
        if (!result.invoice) return;
        setItems(result.invoice.items?.map((item: InvoiceItem) => ({ description: item.description, amount: Number(item.amount) })) ?? [{ description: "", amount: 0 }]);
        setDiscount(Number(result.invoice.discount ?? 0));
        setDueDate(result.invoice.due_date ?? "");
        setPaymentDetails(result.invoice.payment_details ?? "");
        setNotes(result.invoice.notes ?? "");
        setInvoiceNumber(result.invoice.invoice_number ?? "");
        setStatus(result.invoice.status ?? "draft");
      })
      .catch(() => setMessage("Unable to load the existing invoice."));
  }, [bookingId]);

  const subtotal = items.reduce((sum, item) => sum + Math.max(0, Number(item.amount) || 0), 0);
  const total = Math.max(0, subtotal - Math.max(0, discount));

  async function saveInvoice(nextStatus = status) {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, items, discount, dueDate, paymentDetails, notes, status: nextStatus }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save invoice.");
      setInvoiceNumber(result.invoice.invoice_number);
      setStatus(nextStatus);
      setMessage("Invoice saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save invoice.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="surface-card invoice-editor p-6 print:border-0 print:shadow-none">
      <div className="invoice-letterhead -mx-6 -mt-6 mb-6 flex items-center justify-between bg-violet-700 px-6 py-5 text-white print:-mx-0 print:-mt-0">
        <div>
          <p className="text-2xl font-semibold tracking-tight">KleanCraft</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-violet-100">Cleaning &amp; Moving</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-100">Official invoice</p>
          <p className="mt-1 text-sm font-medium">Akure, Ondo State, Nigeria</p>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="section-kicker">Invoice editor</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{invoiceNumber || "New invoice"}</h2>
          <p className="mt-1 text-sm text-slate-500">For {requestLabel}</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="btn-primary h-10 px-4 text-sm">Print / Save PDF</button>
          <button type="button" onClick={() => saveInvoice("sent")} disabled={saving} className="btn-secondary btn-secondary--light h-10 px-4 text-sm">{saving ? "Saving..." : "Save invoice"}</button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
        <div><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Bill to</p><p className="mt-2 font-semibold text-slate-900">{customerName}</p><p className="text-sm text-slate-600">{customerEmail}</p><p className="text-sm text-slate-600">{customerPhone}</p><p className="text-sm text-slate-600">{customerAddress || "No address provided"}</p></div>
        <div className="sm:text-right"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Status</p><p className="mt-2 font-semibold capitalize text-slate-900">{status}</p><label className="mt-3 inline-grid gap-1 text-left text-sm text-slate-600 sm:text-right">Due date<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700" /></label></div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-[1fr_9rem_2rem] gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"><span>Description</span><span>Amount</span><span /></div>
        {items.map((item, index) => <div key={index} className="grid grid-cols-[1fr_9rem_2rem] gap-3"><input value={item.description} onChange={(event) => setItems((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, description: event.target.value } : entry))} placeholder="e.g. Deep cleaning" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" /><input type="number" min="0" value={item.amount} onChange={(event) => setItems((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, amount: Number(event.target.value) } : entry))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" /><button type="button" aria-label="Remove invoice item" onClick={() => setItems((current) => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index))} className="text-slate-400 hover:text-red-600">×</button></div>)}
        <button type="button" onClick={() => setItems((current) => [...current, { description: "", amount: 0 }])} className="text-sm font-semibold text-violet-700 print:hidden">+ Add another item</button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-4 print:hidden"><label className="grid gap-2 text-sm font-medium text-slate-700">Payment details<textarea value={paymentDetails} onChange={(event) => setPaymentDetails(event.target.value)} rows={4} placeholder="Bank name, account name, account number, and payment reference" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="Thank you for choosing KleanCraft." className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" /></label></div>
        <div className="ml-auto w-full max-w-sm space-y-3 text-sm"><div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{currency.format(subtotal)}</span></div><label className="flex items-center justify-between gap-4 text-slate-600"><span>Discount</span><input type="number" min="0" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} className="w-32 rounded-xl border border-slate-200 px-3 py-2 text-right text-slate-700 print:border-0" /></label><div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-900"><span>Total</span><span>{currency.format(total)}</span></div></div>
      </div>
      <p className="mt-5 text-sm text-slate-600 print:block">{paymentDetails}</p><p className="mt-2 whitespace-pre-wrap text-sm text-slate-600 print:block">{notes}</p>
      {message ? <p className="mt-5 text-sm font-medium text-violet-700 print:hidden">{message}</p> : null}
    </section>
  );
}