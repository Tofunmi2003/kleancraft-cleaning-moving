type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className={isDark ? "section-kicker section-kicker--dark" : "section-kicker"}>{eyebrow}</span>
      <h2 className={`mt-5 text-3xl font-semibold tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 sm:text-lg ${isDark ? "text-slate-200" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
