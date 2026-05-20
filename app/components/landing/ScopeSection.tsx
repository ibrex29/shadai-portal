import {
  FiActivity,
  FiBookOpen,
  FiCpu,
  FiGlobe,
  FiHeart,
  FiTool,
} from "react-icons/fi";
import { translations } from "@/app/constants/translations";
import { Direction, Locale } from "@/lib/locale";

type ScopeSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function ScopeSection({ locale, dir }: ScopeSectionProps) {
  const t = translations[locale];
  const focusAreas = [
    { label: t.scope.areas[0], Icon: FiCpu },
    { label: t.scope.areas[1], Icon: FiTool },
    { label: t.scope.areas[2], Icon: FiHeart },
    { label: t.scope.areas[3], Icon: FiGlobe },
    { label: t.scope.areas[4], Icon: FiBookOpen },
    { label: t.scope.areas[5], Icon: FiActivity },
  ];

  return (
    <section className="px-1 py-4">
      <h2 className={`text-2xl font-bold text-primary sm:text-3xl ${dir === "rtl" ? "text-end" : "text-start"}`}>{t.scope.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map(({ label, Icon }) => (
          <div
            key={label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1"
          >
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <Icon size={22} />
            </div>
            <p className={`font-semibold text-slate-800 ${dir === "rtl" ? "text-end" : "text-start"}`}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
