import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, CalendarCheck2, House, Search, Sparkles, Wrench } from "lucide-react";
import { PageShell } from "@/components/page-shell";

const services = [
  {
    title: "Residential Cleaning",
    description: "Routine care for apartments and homes, built around comfort, consistency, and spotless finishing touches.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    icon: House,
  },
  {
    title: "Deep Cleaning",
    description: "Detailed service for kitchens, bathrooms, and hard-to-reach areas that standard maintenance often misses.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
    icon: Sparkles,
  },
  {
    title: "Surface Cleaning",
    description: "Polishing and sanitizing for counters, surfaces, glass, and touchpoints that need frequent care.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
    icon: Sparkles,
  },
  {
    title: "Office Cleaning",
    description: "Discreet workplace care designed to keep common areas, desks, and meeting rooms guest-ready.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    icon: BriefcaseBusiness,
  },
  {
    title: "Commercial Cleaning",
    description: "Reliable upkeep for businesses needing consistency, flexibility, and excellent presentation.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
    icon: Building2,
  },
  {
    title: "Event / Hall Cleaning",
    description: "Pre-event prep and post-event reset services for venues, halls, and hospitality spaces.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
    icon: CalendarCheck2,
  },
  {
    title: "Move-In / Move-Out Cleaning",
    description: "Fresh-start cleaning that helps spaces feel ready for occupancy, inspection, or a new chapter.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    icon: Wrench,
  },
  {
    title: "Custom Cleaning",
    description: "A flexible plan tailored to your priorities, space, schedule, and the standards you expect.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    icon: Search,
  },
];

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Tailored cleaning services for every kind of space."
      description="Whether the need is routine upkeep, a seasonal deep clean, or a polished event reset, we build care plans around your property and priorities."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map(({ title, description, image, icon: Icon }) => (
          <article key={title} className="service-card overflow-hidden border-white/10 bg-[#201b2d] shadow-none">
            <div className="relative h-48 overflow-hidden">
              <Image src={image} alt={title} width={900} height={700} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-violet-700">
                <Icon size={18} />
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-200">{description}</p>
              <Link href="/booking" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                Book this service <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
