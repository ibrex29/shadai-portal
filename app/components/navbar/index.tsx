"use client";
import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { translations } from "@/app/constants/translations";
import { Direction, Locale, withLocalePath } from "@/lib/locale";
import Image from "next/image";

type NavbarProps = {
  locale: Locale;
  dir: Direction;
};

export default function Navbar({ locale, dir }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[locale];
  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about-us", label: t.nav.about },
    { href: "/issues", label: t.nav.issues },
    { href: "/signin", label: t.nav.submit },
    { href: "/contact-us", label: t.nav.contact },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className={`container mx-auto flex items-center justify-between px-6 py-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
        <Link href={withLocalePath(locale, "/")} className="flex items-center gap-3">
          <Image src="/images/shadai-logo.png" alt="SHADAI Journal Logo" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <span className="text-lg font-bold tracking-tight text-primary sm:text-xl">
            {t.journalName}
          </span>
        </Link>

        <div className={`hidden items-center gap-6 lg:flex ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocalePath(locale, item.href)}
              className="text-sm font-semibold text-slate-700 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={withLocalePath(locale, "/signin")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {t.nav.login}
          </Link>
        </div>

        <button
          className={`text-slate-700 lg:hidden ${dir === "rtl" ? "order-first" : "order-last"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={30} /> : <List size={30} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-6 lg:hidden">
          <div className={`flex flex-col gap-4 ${dir === "rtl" ? "items-end text-end" : "items-start text-start"}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocalePath(locale, item.href)}
                className="text-base font-semibold text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={withLocalePath(locale, "/signin")}
              className="mt-2 inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.login}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
