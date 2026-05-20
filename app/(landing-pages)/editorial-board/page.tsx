import Image from "next/image";
import { getDirection } from "@/lib/locale";

const boardMembers = [
  {
    role: "Chief Editor",
    name: "Prof. Umar Saje",
    image: "/images/chief-editor.jpg",
  },
  {
    role: "Editor",
    name: "Ass. Prof. Ilyasu Yahaya",
    image: "/images/editor.jpg",
  },
  {
    role: "Secretary / Editor",
    name: "Dr. Makiyu Abubakar Danyaya",
    image: "/images/secretary-editor.jpg",
  },
  {
    role: "Editorial Manager",
    name: "Umar Abdulhamid",
    image: "/images/editorial-manager.jpg",
  },
];

export default async function EditorialBoardPage() {
  const locale = "en" as const;
  const dir = getDirection(locale);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-secondaryAccent px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 ${dir === "rtl" ? "text-end" : "text-start"}`}>
            Editorial Board
          </p>
          <h1 className={`mt-3 text-3xl font-extrabold sm:text-5xl ${dir === "rtl" ? "text-end" : "text-start"}`}>
            Meet Our Editorial Board
          </h1>
          <p className={`mt-5 max-w-4xl text-base leading-8 text-amber-50 sm:text-lg ${dir === "rtl" ? "ms-auto text-end" : "text-start"}`}>
            The Editorial Board of the journal comprises distinguished scholars and researchers drawn from various
            departments within and outside the University. The board is responsible for maintaining the journal&apos;s
            academic standards through rigorous peer-review processes, ensuring the quality, relevance, and originality
            of every publication.
          </p>
          <p className={`mt-4 max-w-4xl text-base leading-8 text-amber-50 sm:text-lg ${dir === "rtl" ? "ms-auto text-end" : "text-start"}`}>
            Under the leadership of the Editor-in-Chief, the board oversees manuscript evaluation, editorial policies,
            and publication ethics in line with international best practices. Members of the editorial team are
            committed to fostering intellectual exchange, encouraging interdisciplinary research, and providing a
            credible platform for academic discourse within the humanities.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-2">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`p-5 ${dir === "rtl" ? "text-end" : "text-start"}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{member.role}</p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">{member.name}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
