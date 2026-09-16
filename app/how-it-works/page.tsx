import { ArrowRight, CalendarCheck2, CheckCircle2, MapPinned, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "Choose the type of cleaning and share property details, service goals, and any special requirements.",
    icon: MapPinned,
  },
  {
    number: "02",
    title: "Choose your schedule",
    description: "Select your preferred date and time, and decide whether you need a one-time or recurring visit.",
    icon: CalendarCheck2,
  },
  {
    number: "03",
    title: "We match you with a cleaner",
    description: "We assign a suitable professional based on your property, cleaning scope, and timing preferences.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Enjoy a cleaner space",
    description: "The cleaning team arrives prepared and completes the work with attention to detail and quality assurance.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title="Simple steps for a smoother cleaning experience."
      description="Our booking process is built around clarity, flexibility, and a smooth handoff from request to completed service."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(({ number, title, description, icon: Icon }) => (
          <div key={number} className="step-card border-white/10 bg-[#201b2d] p-6 shadow-none">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">{number}</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Icon size={16} className="text-violet-700" />
              </div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">{description}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet-300">
              Next step <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
