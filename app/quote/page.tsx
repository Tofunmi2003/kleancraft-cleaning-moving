import { QuoteForm } from "@/components/quote-form";
import { PageShell } from "@/components/page-shell";

export default function QuotePage() {
  return (
    <PageShell
      eyebrow="Get a quote"
      title="Fast estimates for homes, offices, and commercial spaces."
      description="Tell us about your property and cleaning needs and we will send a tailored estimate or connect with the right team member for a final quote."
    >
      <div className="mx-auto max-w-5xl">
        <QuoteForm />
      </div>
    </PageShell>
  );
}
