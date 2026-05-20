export const ARABIC_REGEX = /[\u0600-\u06FF]/;

export function containsArabic(text: string | undefined | null): boolean {
  if (!text) {
    return false;
  }

  return ARABIC_REGEX.test(text);
}
