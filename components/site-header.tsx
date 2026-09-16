"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="KleanCraft Cleaning & Moving home">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 shadow-sm">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">KleanCraft</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Cleaning &amp; Moving</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-violet-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/booking" className="btn-primary h-11 px-5 text-sm">
            Book a Cleaning
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-4 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 transition hover:bg-violet-50 hover:text-violet-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="btn-primary mt-3 h-11 px-5 text-sm"
              onClick={() => setOpen(false)}
            >
              Book a Cleaning
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
