import Link from "next/link";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";

type HeroSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function HeroSection({ locale, dir }: HeroSectionProps) {
  const t = translations[locale];

  return (
    <section
      className="group relative overflow-hidden rounded-3xl h-[420px] px-6 py-24 text-white shadow-xl transition-all duration-500 hover:shadow-2xl sm:px-10 sm:py-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: "url('/images/senate-building.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/35" aria-hidden="true" />
      <div className={`relative z-10 mx-auto max-w-5xl ${dir === "rtl" ? "text-end" : "text-center"}`}>
        <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
          {t.hero.badge}
        </p>
        <p className={`mb-3 text-sm font-semibold text-amber-100 ${dir === "rtl" ? "text-end" : "text-center"}`}>
          SHADAI: Sule Lamido University Journal of Research in Humanities
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
          {t.hero.title}
        </h1>
        <p className={`mt-4 max-w-3xl text-base text-amber-50 sm:text-xl ${dir === "rtl" ? "me-0 ms-auto" : "mx-auto"}`}>
          {t.hero.tagline}
        </p>
        <div className={`mt-8 flex flex-col gap-4 ${dir === "rtl" ? "items-end sm:flex-row-reverse" : "items-center sm:flex-row"} justify-center`}>
          <Link
            href={withLocalePath(locale, "/submit")}
            className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-slate-100"
          >
            {t.hero.ctaPrimary}
          </Link>
          <Link
            href={withLocalePath(locale, "/issues")}
            className="rounded-xl border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
