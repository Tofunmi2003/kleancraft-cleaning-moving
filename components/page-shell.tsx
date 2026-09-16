import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  theme?: "light" | "dark";
};

export function PageShell({ eyebrow, title, description, children, theme = "dark" }: PageShellProps) {
  const isDark = theme === "dark";

  return (
    <div className="container py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <span className={isDark ? "section-kicker section-kicker--dark" : "section-kicker"}>{eyebrow}</span>
        <h1 className={`mt-6 text-4xl font-semibold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h1>
        <p className={`mt-5 text-lg leading-8 ${isDark ? "text-slate-200" : "text-slate-600"}`}>{description}</p>
      </div>
      <div className="mt-12">{children}</div>
    </div>
  );
}
