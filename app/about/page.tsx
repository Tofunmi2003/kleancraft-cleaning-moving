import { CheckCircle2, Clock3, ShieldCheck, Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";

const points = [
  "Professionally trained cleaning teams",
  "High standards for detail and presentation",
  "Flexible service for homes and commercial spaces",
  "Clear communication before, during, and after service",
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About us"
      title="A premium cleaning partner built on trust, care, and consistency."
      description="We help homes and businesses feel calmer, brighter, and more comfortable through dependable cleaning services that feel personal, professional, and carefully managed."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card border-white/10 bg-[#201b2d] p-8 shadow-none">
          <h2 className="text-2xl font-semibold text-black">Our approach</h2>
          <p className="mt-4 text-base leading-8 text-black">
            KleanCraft was created for clients who want more than a basic tidy-up. We focus on quality, reliability, and thoughtful detail across cleaning, moving, and home support services.
          </p>
          <div className="mt-6 space-y-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <CheckCircle2 size={18} className="mt-0.5 text-violet-300" />
                <span className="text-sm text-black">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Years in service", value: "10+" },
            { label: "Properties served", value: "1.2k+" },
            { label: "Average response time", value: "< 24h" },
            { label: "Client satisfaction", value: "98%" },
          ].map((item) => (
            <div key={item.label} className="surface-card border-white/10 bg-[#201b2d] p-3 text-center shadow-none sm:p-4">
              <div className="text-2xl font-semibold text-black">{item.value}</div>
              <div className="mt-2 text-xs text-black">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Trust-first service", text: "We prioritize professionalism, strong communication, and accountability from request to completion." },
          { icon: Clock3, title: "Flexible schedules", text: "Whether it is a one-off need or regular upkeep, we work around your timing and preferences." },
          { icon: Star, title: "Quality-minded care", text: "Our standards are built around details that make a space feel fresh, comfortable, and cared for." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="feature-card border-white/10 bg-[#201b2d] p-6 shadow-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Icon size={20} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
