import { translations } from "@/app/constants/translations";
import { Direction, Locale } from "@/lib/locale";

type AboutJournalSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function AboutJournalSection({ locale, dir }: AboutJournalSectionProps) {
  const t = translations[locale];

  return (
    <section className="rounded-2xl bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200 sm:px-10">
      <h2 className={`text-2xl font-bold text-primary sm:text-3xl ${dir === "rtl" ? "text-end" : "text-start"}`}>{t.about.title}</h2>
      <p className={`mt-4 max-w-4xl text-slate-700 ${dir === "rtl" ? "text-end ms-auto" : "text-start"}`}>
        {t.about.description}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {t.about.stats.map((stat) => (
          <div
            key={stat}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-800"
          >
            {stat}
          </div>
        ))}
      </div>
    </section>
  );
}
