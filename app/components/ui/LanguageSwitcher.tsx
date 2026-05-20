"use client";

import { Locale, stripLocaleFromPath, withLocalePath } from "@/lib/locale";
import { usePathname, useRouter } from "next/navigation";

type LanguageSwitcherProps = {
  locale: Locale;
  dir: "ltr" | "rtl";
};

export default function LanguageSwitcher({ locale, dir }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale: Locale = locale === "en" ? "ar" : "en";

  const switchLanguage = () => {
    const target = withLocalePath(nextLocale, stripLocaleFromPath(pathname || "/"));
    router.push(target);
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className={`inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent ${
        dir === "rtl" ? "self-start" : "self-end"
      }`}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {locale === "en" ? "🇸🇦 العربية" : "🇬🇧 English"}
    </button>
  );
}
