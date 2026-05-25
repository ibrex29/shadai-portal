import Image from "next/image";
import { getDirection } from "@/lib/locale";

const copy = {
  en: {
    title: "About SHADAI Journal",
    subtitle: "Faculty of Humanities, Sule Lamido University Kafin Hausa",
    body:
      "The SHADAI Journal of Contemporary Research in Humanities (SJCRH) is a reputable peer-reviewed academic journal published twice yearly by the Faculty of Humanities, Sule Lamido University Kafin Hausa. It publishes original, well-researched articles in Humanities, Education, Social Sciences, and Law in Arabic, English, Hausa, Fulfulde, Yoruba, Igbo, and French.",
    stat1: "Biannual Publication",
    stat2: "Multilingual Scholarship",
    stat3: "Peer-Reviewed Humanities",
    missionTitle: "Our Mission",
    missionBody:
      "To advance rigorous humanities scholarship, support ethical peer review, and promote research that strengthens academic discourse across Nigeria and beyond.",
    visionTitle: "Our Vision",
    visionBody:
      "To be the leading humanities journal from Sule Lamido University Kafin Hausa, connecting scholars and communities through original research and scholarly exchange.",
  },
  // Arabic content is temporarily disabled.
  // ar: { ... },
};

export default async function AboutUsPage() {
  const locale = "en" as const;
  const dir = getDirection(locale);
  const t = copy[locale];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-secondaryAccent px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className={`text-3xl font-extrabold sm:text-5xl ${dir === "rtl" ? "text-end" : "text-start"}`}>
            {t.title}
          </h1>
          <p className={`mt-4 text-base text-blue-50 sm:text-xl ${dir === "rtl" ? "text-end" : "text-start"}`}>
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 px-2 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <Image
            src="/images/aboutus_bg.jpg"
            alt="SHADAI Journal"
            width={900}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 ${dir === "rtl" ? "text-end" : "text-start"}`}>
          <p className="text-slate-700 leading-8">{t.body}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[t.stat1, t.stat2, t.stat3].map((stat) => (
              <div
                key={stat}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-800"
              >
                {stat}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h2 className="text-lg font-bold text-primary">{t.missionTitle}</h2>
              <p className="mt-2 text-slate-700">{t.missionBody}</p>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <h2 className="text-lg font-bold text-accent">{t.visionTitle}</h2>
              <p className="mt-2 text-slate-700">{t.visionBody}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
