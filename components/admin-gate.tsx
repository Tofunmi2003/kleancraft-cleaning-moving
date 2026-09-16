"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function hasAdminRole(session: { user?: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } } | null) {
  const user = session?.user;
  const roleValue =
    user?.app_metadata?.role ??
    user?.app_metadata?.admin ??
    user?.user_metadata?.role ??
    user?.user_metadata?.admin ??
    "";

  const normalizedRole = String(roleValue).toLowerCase();
  return normalizedRole === "admin" || normalizedRole === "staff" || normalizedRole === "manager";
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      if (!supabase) {
        setAuthorized(false);
        setReady(true);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      setAuthorized(Boolean(session) && hasAdminRole(session));
      setReady(true);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase
      ? supabase.auth.onAuthStateChange((_event, session) => {
          if (!active) return;
          setAuthorized(Boolean(session) && hasAdminRole(session));
        })
      : { data: { subscription: null } };

    return () => {
      active = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  if (!ready) {
    return <div className="surface-card p-6 text-slate-600">Checking access…</div>;
  }

  if (!authorized) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="section-kicker">Restricted area</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Admin access required</h2>
        <p className="mt-3 text-slate-600">
          Only approved staff accounts with an admin role can view this dashboard. Please log in with a verified admin account.
        </p>
        <Link href="/login" className="btn-primary mt-6 inline-flex h-11 items-center px-6 text-sm">
          Go to login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
