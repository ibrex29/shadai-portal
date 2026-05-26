import {
  AboutJournalSection,
  CtaBannerSection,
  ForAuthorsSection,
  HeroSection,
  JournalCoverSection,
  LatestIssuesSection,
} from "@/app/components/landing";
import { defaultLocale, getDirection } from "@/lib/locale";
import { getIssues } from "@/app/api/volume";

export default async function Home() {
  const locale = defaultLocale;
  const dir = getDirection(locale);
  const fetchedIssues = await getIssues();
  const latestIssues = Array.isArray(fetchedIssues) ? fetchedIssues : [];

  return (
    <div className="space-y-8 bg-background px-0 pb-8 sm:space-y-10 sm:px-2">
      <HeroSection locale={locale} dir={dir} />
      <AboutJournalSection locale={locale} dir={dir} />
      <JournalCoverSection locale={locale} dir={dir} />
      <LatestIssuesSection locale={locale} dir={dir} issues={latestIssues} />
      <ForAuthorsSection locale={locale} dir={dir} />
      <CtaBannerSection locale={locale} dir={dir} />
    </div>
  );
}
