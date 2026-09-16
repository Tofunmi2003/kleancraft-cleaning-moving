import Image from "next/image";
import { Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";

const testimonials = [
  {
    name: "Natalie R.",
    role: "Homeowner",
    quote: "The team was punctual, thoughtful, and left our home feeling genuinely fresh. It was the easiest booking experience we’ve had.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Jason M.",
    role: "Office Manager",
    quote: "Their commercial cleaning service was reliable and detail-focused. Our office has never looked more polished.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Amelia P.",
    role: "Event Coordinator",
    quote: "We needed a fast turn-around before a large event. They handled the venue beautifully and with zero stress.",
    stars: 4,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Daniel K.",
    role: "Property Manager",
    quote: "We’ve used them for recurring property cleans and they have been consistently reliable, professional, and easy to coordinate with.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-violet-600">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={14} className={index < count ? "fill-current" : "text-slate-300 fill-slate-300"} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <PageShell
      eyebrow="Reviews"
      title="Real feedback from real clients."
      description="Our work is built on trust, consistency, and the sort of service people remember because the space simply feels better afterward."
    >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {testimonials.map(({ name, role, quote, stars, image }) => (
          <article key={name} className="review-card border-white/10 bg-[#201b2d] p-6 shadow-none">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <Image src={image} alt={name} width={120} height={120} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-white">{name}</div>
                <div className="text-sm text-slate-300">{role}</div>
              </div>
            </div>
            <div className="mt-4"><Stars count={stars} /></div>
            <p className="mt-4 text-base leading-7 text-slate-200">“{quote}”</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
