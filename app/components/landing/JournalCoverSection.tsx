import Image from "next/image";
import { Direction, Locale } from "@/lib/locale";

type JournalCoverSectionProps = {
  locale: Locale;
  dir: Direction;
};

export default function JournalCoverSection({ dir }: JournalCoverSectionProps) {
  return (
    <section className="rounded-2xl bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200 sm:px-10">
      <div className={`mx-auto max-w-5xl ${dir === "rtl" ? "text-end" : "text-start"}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Featured</p>
        <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Journal Cover</h2>
        <p className="mt-3 text-slate-700">
          Official cover for SHADAI Journal of Contemporary Research in Humanities.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="group w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Image
              src="/images/SHADAI2.jpg"
              alt="SHADAI Journal cover"
              width={1200}
              height={1600}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}