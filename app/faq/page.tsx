import { PageShell } from "@/components/page-shell";

const faqs = [
  { question: "What cleaning services do you offer?", answer: "We provide residential, deep, office, commercial, move-in or move-out, surface, event, and custom cleaning services tailored to your space." },
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

export default function FAQPage() {
  return (
    <PageShell
      eyebrow="FAQ"
      title="Answers to the questions clients ask most often."
      description="We believe clear communication makes the booking process easier and helps you feel confident before choosing a service."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="surface-card border-white/10 bg-[#201b2d] p-5 shadow-none">
            <h2 className="text-lg font-semibold text-black">{question}</h2>
            <p className="mt-3 text-sm leading-7 text-black">{answer}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
