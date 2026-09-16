import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let’s talk about your cleaning needs."
      description="Reach out to request a booking, discuss a custom cleaning plan, or ask a question about availability and service."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="surface-card border-white/10 bg-[#201b2d] p-5 shadow-none">
            <div className="flex items-center gap-3 text-violet-200">
              <Mail size={16} />
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-black">Email</span>
            </div>
            <p className="mt-3 text-lg font-medium text-black">onyekatofunmi@gmail.com</p>
          </div>
          <div className="surface-card border-white/10 bg-[#201b2d] p-5 shadow-none">
            <div className="flex items-center gap-3 text-violet-200">
              <MapPin size={16} />
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-black">Address</span>
            </div>
            <p className="mt-3 text-lg font-medium text-black">Akure, Ondo State, Nigeria</p>
          </div>
        </div>

        <div className="surface-card border-white/10 bg-[#201b2d] p-6 shadow-none sm:p-8">
          <form className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-black">
              Full name
              <input className="rounded-2xl border border-slate-600 bg-slate-100 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Your full name" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-black">
              Email
              <input type="email" className="rounded-2xl border border-slate-600 bg-slate-100 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
              Subject
              <input className="rounded-2xl border border-slate-600 bg-slate-100 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="How can we help?" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
              Message
              <textarea rows={5} className="rounded-2xl border border-slate-600 bg-slate-100 px-4 py-3 text-black outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white" placeholder="Tell us about the service you need." />
            </label>
            <div className="md:col-span-2 flex justify-end">
              <button type="button" className="btn-primary h-12 px-6 text-sm">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
