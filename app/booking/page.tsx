import { BookingForm } from "@/components/booking-form";
import { PageShell } from "@/components/page-shell";

export default function BookingPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Request your cleaning service in minutes."
      description="Share a few details and our team will review your request, confirm availability, and guide the next step.
"
    >
      <div className="mx-auto max-w-5xl">
        <BookingForm />
      </div>
    </PageShell>
  );
}
