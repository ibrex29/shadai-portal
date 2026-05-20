import Link from "next/link";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";
import { containsArabic } from "@/lib/text-direction";

type LatestIssuesSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function LatestIssuesSection({ locale, dir }: LatestIssuesSectionProps) {
  const t = translations[locale];

  return (
    <section className="rounded-2xl bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200 sm:px-10">
      <h2 className={`text-2xl font-bold text-primary sm:text-3xl ${dir === "rtl" ? "text-end" : "text-start"}`}>{t.latest.title}</h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {t.latest.issues.map((issue) => (
          <article
            key={`${issue.volume}-${issue.issue}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className={`text-xs font-semibold uppercase tracking-wide text-accent ${dir === "rtl" ? "text-end" : "text-start"}`}>
              {issue.volume} • {issue.issue}
            </p>
            <h3 className={`mt-3 text-lg font-semibold text-slate-800 ${dir === "rtl" ? "text-end" : "text-start"}`}>{issue.title}</h3>
            <p
              className={`mt-2 text-sm text-slate-600 ${dir === "rtl" ? "text-end" : "text-start"} ${containsArabic(issue.abstract) ? "font-arabic text-end" : ""}`}
              dir={containsArabic(issue.abstract) ? "rtl" : "ltr"}
              lang={containsArabic(issue.abstract) ? "ar" : "en"}
            >
              {issue.abstract}
            </p>
            <Link
              href={withLocalePath(locale, "/issues")}
              className={`mt-4 inline-block text-sm font-semibold text-primary hover:underline ${dir === "rtl" ? "text-end" : "text-start"}`}
            >
              {t.latest.readMore}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
