import Link from "next/link";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";

type ForAuthorsSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function ForAuthorsSection({ locale, dir }: ForAuthorsSectionProps) {
  const t = translations[locale];

  return (
    <section className="px-1 py-4">
      <div className={`rounded-2xl bg-[#4c3a1c] px-6 py-12 text-white sm:px-10 ${dir === "rtl" ? "text-end" : "text-start"}`}>
        <h2 className="text-2xl font-bold sm:text-3xl">{t.authors.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.authors.steps.map((step, index) => (
            <div key={step.title} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
              <p className="text-xs font-semibold uppercase tracking-widest text-secondaryAccent">
                {t.authors.stepPrefix} {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{step.detail}</p>
            </div>
          ))}
        </div>
        <Link
          href={withLocalePath(locale, "/submission-guidelines")}
          className="mt-8 inline-flex rounded-xl bg-secondaryAccent px-6 py-3 text-sm font-bold text-slate-900 transition hover:opacity-90"
        >
          {t.authors.guidelines}
        </Link>
      </div>
    </section>
  );
}
