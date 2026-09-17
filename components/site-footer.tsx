import Link from "next/link";
import { MapPin, Mail, Phone, Sparkles } from "lucide-react";

const services = [
  "Residential Cleaning",
  "Deep Cleaning",
  "Sofa & Chair Cleaning",
  "Office Cleaning",
  "Commercial Cleaning",
  "Post-Construction Cleaning",
  "Event Cleaning",
  "Move-In / Move-Out",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/login" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">KleanCraft</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Cleaning &amp; Moving</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Professional cleaning and moving support for homes, workplaces, and transitions—designed to make every space and move feel easier.
            </p>
            <div className="mt-6 flex items-center gap-3 text-slate-300">
              <a href="https://instagram.com" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold transition hover:border-violet-400 hover:text-white">
                IG
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold transition hover:border-violet-400 hover:text-white">
                FB
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold transition hover:border-violet-400 hover:text-white">
                IN
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Location</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-violet-300" />
                <span>Akure, Ondo State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-violet-300" />
                <a href="mailto:onyekatofunmi@gmail.com" className="transition hover:text-white">onyekatofunmi@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 KleanCraft Cleaning &amp; Moving. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
