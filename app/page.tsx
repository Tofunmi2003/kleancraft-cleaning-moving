import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  Check,
  ChevronRight,
  House,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  StarHalf,
  Users,
  Wrench,
  Zap,
  BriefcaseBusiness,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BookingForm } from "@/components/booking-form";
import { FloatingChat } from "@/components/floating-chat";

const trustPillars = [
  "Professional Cleaners",
  "Reliable Service",
  "Flexible Scheduling",
  "Satisfaction Focused",
];

const services = [
  {
    title: "Residential Cleaning",
    description: "Comfort-first care for homes, apartments, and family spaces with routine and tailored detailing.",
    icon: House,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Deep Cleaning",
    description: "Comprehensive refresh for kitchens, bathrooms, baseboards, and hidden buildup that standard cleans miss.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sofa & Chair Cleaning",
    description: "Gentle yet thorough upholstery cleaning that removes dust, stains, and daily buildup from soft furnishings.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Surface Cleaning",
    description: "Precision care for counters, fixtures, glass, and high-touch surfaces that keep spaces polished daily.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Cleaning",
    description: "Discreet, efficient cleaning plans for productive workspaces that support employee wellbeing.",
    icon: BriefcaseBusiness,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial Cleaning",
    description: "Reliable service for retail, clinic, fitness, and hospitality spaces with flexible scheduling windows.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Post-Construction Cleaning",
    description: "Final dust removal and detail cleaning for freshly renovated or newly built spaces before handover or occupancy.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Event / Hall Cleaning",
    description: "Post-event and pre-event reset services designed for polished, guest-ready spaces without the stress.",
    icon: CalendarCheck2,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Move-In / Move-Out Cleaning",
    description: "Fresh, detail-focused transitions that help properties feel ready for the next chapter.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Custom Cleaning",
    description: "Personalized clean plans built around your property, timing, and unique cleaning priorities.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  },
];

const reasons = [
  {
    title: "Reliable Professionals",
    description: "Trained cleaners who arrive prepared, punctual, and ready to deliver a consistently high standard.",
    icon: ShieldCheck,
  },
  {
    title: "Quality-Focused Cleaning",
    description: "We pay attention to the details that turn a tidy space into one that truly feels refreshed and cared for.",
    icon: BadgeCheck,
  },
  {
    title: "Flexible Scheduling",
    description: "Choose the timing that suits your routine, from one-time appointments to recurring service plans.",
    icon: CalendarCheck2,
  },
  {
    title: "Residential & Commercial",
    description: "Support for homes, offices, venues, and larger premises with adaptable service levels.",
    icon: Users,
  },
  {
    title: "Easy Booking",
    description: "Request a cleaning without a phone call using a quick, guided form that keeps things simple.",
    icon: Zap,
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share the type of cleaning, property details, and any special requirements or priorities.",
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description: "Select your preferred date and time for the service and note recurring or one-time needs.",
  },
  {
    number: "03",
    title: "We Match You With a Cleaner",
    description: "We pair your request with a suitable professional based on the scope of the work and location.",
  },
  {
    number: "04",
    title: "Enjoy a Cleaner Space",
    description: "Your cleaner arrives prepared with equipment and completes the service with a careful finish.",
  },
];

const testimonials = [
  {
    name: "Natalie R.",
    role: "Homeowner",
    quote:
      "The team was punctual, thoughtful, and left our home feeling genuinely fresh. It was the easiest booking experience we’ve had.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Jason M.",
    role: "Office Manager",
    quote:
      "Their commercial cleaning service was reliable and detail-focused. Our office has never looked more polished.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Amelia P.",
    role: "Event Coordinator",
    quote:
      "We needed a fast turn-around before a large event. They handled the venue beautifully and with zero stress.",
    stars: 4,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
  },
];

const faqs = [
  { question: "What cleaning services do you offer?", answer: "We provide residential, deep, sofa & chair, office, commercial, post-construction, move-in or move-out, surface, event, and custom cleaning services tailored to your space." },
  { question: "Do you provide cleaning equipment?", answer: "Yes. Our team brings the necessary supplies and equipment for standard service visits, with optional product preferences available on request." },
  { question: "Do you clean offices and commercial spaces?", answer: "Yes. We support workplaces, clinics, rental properties, retail spaces, and other commercial environments with flexible schedules." },
  { question: "Can I book a one-time cleaning?", answer: "Absolutely. You can request a one-time clean or choose weekly, bi-weekly, or monthly recurring service." },
  { question: "Can I schedule recurring cleaning?", answer: "Yes. We offer recurring plans designed around your home or business routine and preferred availability." },
  { question: "How much does cleaning cost?", answer: "Pricing depends on property size, type, cleaning scope, and frequency. We also offer a quote request form for fast estimates." },
  { question: "How do I reschedule?", answer: "You can contact our team or use the booking form to request a reschedule with as much notice as possible." },
  { question: "What areas do you serve?", answer: "We serve residential and commercial clients across Portland and surrounding neighborhoods, with custom coverage available by request." },
  { question: "How long does a cleaning take?", answer: "Most standard cleaning visits range from 2 to 5 hours depending on size, condition, and service selection." },
  { question: "Can I request a specific type of cleaner?", answer: "Yes. We can discuss preferences during the booking process and do our best to align with your needs." },
  { question: "What happens after I submit a booking?", answer: "Your request is reviewed, we confirm availability, and a team member follows up with scheduling and next steps." },
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

export default function Home() {
  return (
    <>
      <section className="container pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.05fr]">
          <div>
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
              A Cleaner Space. A Better Experience.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              KleanCraft provides Residential Cleaning, Deep Cleaning, Sofa&chair Cleaning, Surface Cleaning, office cleaning, commercial cleaning, move-in/move-out Cleaning services across Akure, Ondo State.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/booking" className="btn-primary h-12 px-6">
                Book a Service
              </Link>
              <a
                href="https://wa.me/2349064621664?text=Hi%20KleanCraft%2C%20I%20want%20to%20book%20a%20service."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary h-12 px-6"
              >
                Contact us on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustPillars.map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <Check size={14} className="text-violet-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="gradient-ring absolute -left-10 top-10 h-56 w-56 rounded-full blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_70px_-25px_rgba(26,13,45,0.32)]">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional cleaner working in a modern home"
                  width={900}
                  height={1100}
                  className="h-[600px] w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/50 bg-white/85 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Trusted by clients</div>
                    <div className="mt-2 flex items-center gap-2 text-slate-900">
                      <div className="flex items-center gap-1 text-violet-600">
                        <Star size={16} className="fill-current" />
                        <Star size={16} className="fill-current" />
                        <Star size={16} className="fill-current" />
                        <Star size={16} className="fill-current" />
                        <StarHalf size={16} className="fill-current" />
                      </div>
                      <span className="text-sm font-medium">4.9/5 rating</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-violet-100 px-3 py-2 text-right">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-violet-700">Booked</div>
                    <div className="text-xl font-semibold text-slate-900">1.2k+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1b1724] section">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { value: "10+", label: "Years of experience" },
              { value: "1.2k+", label: "Properties cleaned" },
              { value: "98%", label: "Client satisfaction" },
              { value: "Same-week", label: "Availability" },
            ].map((item) => (
              <div key={item.label} className="surface-card border-white/10 bg-white/5 p-6 text-center shadow-none backdrop-blur-sm">
                <div className="text-3xl font-semibold tracking-tight text-black">{item.value}</div>
                <div className="mt-2 text-sm text-black">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our services"
            title="Cleaning solutions designed around the way you live and work."
            description="From routine home care to detailed event resets and commercial upkeep, our team brings the same high standard across every space."
            align="center"
            theme="dark"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ title, description, icon: Icon, image }) => (
              <article key={title} className="service-card overflow-hidden border-white/10 bg-[#201b2d] shadow-none">
                <div className="relative h-48 overflow-hidden">
                  <Image src={image} alt={title} width={900} height={700} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-violet-700 shadow-sm">
                    <Icon size={18} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{description}</p>
                  <Link href="/booking" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                    Learn More <ChevronRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1724] section">
        <div className="container">
          <SectionHeading
            eyebrow="Why choose us"
            title="Dependable service, elevated standards, and a cleaner routine."
            description="We combine attentive detail, flexible scheduling, and professional standards to make every visit feel seamless."
            theme="dark"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {reasons.map(({ title, description, icon: Icon }) => (
              <div key={title} className="feature-card bg-[#1b1724] p-5 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="A simple process designed to feel effortless."
            description="From your first request to final walkthrough, we make the experience straightforward and stress-free."
            align="center"
            theme="light"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="step-card bg-[#1b1724] p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">{number}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <ArrowRight size={14} />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Reviews"
            title="Clients trust us to make their spaces feel cared for."
            description="Our work is built on consistency, professionalism, and the kind of service that keeps people coming back."
            align="center"
            theme="light"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map(({ name, role, quote, stars, image }) => (
              <article key={name} className="review-card bg-[#1b1724] p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <Image src={image} alt={name} width={120} height={120} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-sm text-slate-300">{role}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Stars count={stars} />
                </div>
                <p className="mt-4 text-base leading-7 text-slate-200">“{quote}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-[#1b1724] section">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Book a cleaning"
              title="Need your space cleaned or refreshed?"
              description="Use this form to request a cleaning service and confirm your preferred schedule, property details, and service needs."
              theme="dark"
            />

            <div className="mt-8 space-y-4">
              {[
                "Available same-week appointments for many service types",
                "Friendly, vetted professionals with clear communication",
                "Easy communication on scheduling, pricing, and special requests",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <Check size={14} />
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <BookingForm />
        </div>
      </section>

      <section id="faq" className="bg-[#1b1724] section">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Everything customers usually ask before booking."
            description="Clear information helps customers feel confident before they choose a service and schedule their clean."
            align="center"
            theme="dark"
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="surface-card p-5">
                <h3 className="text-lg font-semibold text-slate-900">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="surface-card mx-auto max-w-4xl p-8 sm:p-12">
            <span className="section-kicker">Ready when you are</span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Ready for a Cleaner Space?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Book a professional cleaning service and let us take care of the work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/booking" className="btn-primary h-12 px-6">
                Book a Service
              </Link>
              <a
                href="https://wa.me/2349064621664?text=Hi%20KleanCraft%2C%20I%20want%20to%20talk%20about%20a%20service."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-secondary--light h-12 px-6"
              >
                Contact us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingChat />
    </>
  );
}
