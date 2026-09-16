import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminGate } from "@/components/admin-gate";

export default function AdminPage() {
  return (
    <AdminGate>
      <div className="container py-12 md:py-16">
        <div className="mb-8">
          <p className="section-kicker">Business operations</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-900">Admin dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Review all bookings, monitor new requests, and update the status of each customer inquiry from one place.
          </p>
        </div>

        <AdminDashboard />
      </div>
    </AdminGate>
  );
}
