import { getDirection } from "@/lib/locale";

const boardMembers = [
  { role: "Editor-in-Chief", name: "Prof. Umar Saje — Dean, SPGS, SLUK" },
  { role: "Editor", name: "Dr. Iliyasu Yahaya — Dept. of Islamic Studies" },
  { role: "Editor", name: "Dr. Idris Hamza Yana — Department of English" },
  { role: "Editor", name: "Dr. Abdulkadir Ginsau — Dept. of Nigerian Languages" },
  { role: "Editor", name: "Dr. Muhammad Abubakar Suleiman — Dept. of Arabic" },
  { role: "Editor", name: "Dr. Sadi Ibrahim Koki — Dept. of History" },
  { role: "Editorial Secretary", name: "Dr. Makiyu Abubakar Danyaya" },
  { role: "Editorial Manager", name: "Umar Abdulhamid" },
];

const editorialConsultants = [
  { name: "Prof. Yusuf Dalhatu", affiliation: "Department of Islamic Studies, SLUK" },
  { name: "Prof. Dahiru Abdulkadir", affiliation: "Department of Nigerian Languages, SLUK" },
  { name: "Prof. Jamilu Abdullahi", affiliation: "Department of Arabic, BUK" },
  { name: "Prof. M.T. Usman", affiliation: "Department of History" },
  { name: "Prof. Umar Yusus", affiliation: "Department of Arabic, University of Maiduguri" },
  { name: "Prof. Nura Sani", affiliation: "Department of Islamic Studies, BUK" },
  { name: "Prof. Ahmad Murtala", affiliation: "Department of Islamic Studies, BUK" },
  { name: "Prof. Umar Abbas", affiliation: "Department of Islamic Studies, BUK" },
  { name: "Prof. Sanusi Ibrahim Chinade", affiliation: "Department of English, FUD" },
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
            SHADAI Journal Leadership
          </h1>
          <p className={`mt-5 max-w-4xl text-base leading-8 text-amber-50 sm:text-lg ${dir === "rtl" ? "ms-auto text-end" : "text-start"}`}>
            The editorial board is composed of experienced scholars from the Faculty of Humanities and partner universities. The board guarantees that every accepted paper meets rigorous academic standards and publication ethics.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-2">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-4 text-xs font-semibold uppercase tracking-wide text-accent ${dir === "rtl" ? "text-end" : "text-start"}`}>
                {member.role}
              </div>
              <h2 className={`text-lg font-bold text-slate-900 ${dir === "rtl" ? "text-end" : "text-start"}`}>
                {member.name}
              </h2>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Editorial Consultants</h2>
          <p className="mt-3 text-slate-700">
            The journal is supported by a panel of editorial consultants from leading departments in Nigerian universities.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {editorialConsultants.map((consultant) => (
              <li key={consultant.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{consultant.name}</p>
                <p className="mt-2 text-sm text-slate-700">{consultant.affiliation}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
