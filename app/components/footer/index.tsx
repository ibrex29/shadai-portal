"use client";
import Link from "next/link";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";

type FooterProps = {
  locale: Locale;
  dir: Direction;
};

const Footer = ({ locale, dir }: FooterProps) => {
  const t = translations[locale];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-6 py-10 md:px-12 lg:px-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className={dir === "rtl" ? "order-2 md:order-2 text-end" : "order-1 md:order-1 text-start"}>
          <h3 className="text-xl font-bold text-primary">{t.journalName}</h3>
          <p className="mt-3 max-w-md text-sm text-slate-700">
            {t.footer.description}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            {t.footer.emailLabel}: editor@shadaijournal.com
          </p>
          <p className="text-sm text-slate-600">{t.footer.websiteLabel}: shadaijournal.com</p>
        </div>

        <div className={dir === "rtl" ? "order-1 md:order-1 text-end" : "order-2 md:order-2 text-start"}>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {t.footer.linksTitle}
          </h4>
          <div className={`mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-700 ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
            <Link href={withLocalePath(locale, "/")} className="hover:text-primary">
              {t.footer.links.home}
            </Link>
            <Link href={withLocalePath(locale, "/about-us")} className="hover:text-primary">
              {t.footer.links.about}
            </Link>
            <Link href={withLocalePath(locale, "/issues")} className="hover:text-primary">
              {t.footer.links.issues}
            </Link>
            <Link href={withLocalePath(locale, "/submit")} className="hover:text-primary">
              {t.footer.links.submit}
            </Link>
            <Link href={withLocalePath(locale, "/contact-us")} className="hover:text-primary">
              {t.footer.links.contact}
            </Link>
            <Link href={withLocalePath(locale, "/editorial-board")} className="hover:text-primary">
              {t.footer.links.editorialBoard}
            </Link>
          </div>
        </div>
      </div>

      <div className={`mx-auto mt-8 max-w-6xl border-t border-slate-200 pt-4 text-sm text-slate-600 ${dir === "rtl" ? "text-start" : "text-end"}`}>
        <p>{t.footer.copy}</p>
      </div>
    </footer>
  );
};

export default Footer;
