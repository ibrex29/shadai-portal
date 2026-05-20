export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function stripLocaleFromPath(pathname: string): string {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
}

export function withLocalePath(locale: Locale, pathname: string): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return cleanPath;
}
