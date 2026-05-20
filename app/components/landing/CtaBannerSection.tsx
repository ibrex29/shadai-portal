import Link from "next/link";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";

type CtaBannerSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function CtaBannerSection({ locale, dir }: CtaBannerSectionProps) {
  const t = translations[locale];

  return (
    <section className={`rounded-2xl border border-primary/20 bg-primary px-6 py-10 text-white sm:px-10 ${dir === "rtl" ? "text-end" : "text-center"}`}>
      <h2 className="text-2xl font-bold sm:text-3xl">
        {t.cta.title}
      </h2>
      <Link
        href={withLocalePath(locale, "/submit")}
        className="mt-6 inline-flex rounded-xl bg-secondaryAccent px-6 py-3 text-sm font-bold text-slate-900 transition hover:opacity-90"
      >
        {t.cta.button}
      </Link>
    </section>
  );
}
