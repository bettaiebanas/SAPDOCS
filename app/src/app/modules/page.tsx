import Link from "next/link";
import { MODULES } from "@/config/modules";

export default async function ModulesPage() {
  const modules = [...MODULES].sort((a, b) => a.order - b.order);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">
        Modules SAP Manufacturing – Documentation
      </h1>

      <ul className="space-y-3">
        {modules.map((m) => (
          <li key={m.id} className="border rounded-md p-3 bg-white">
            <h2 className="text-xl font-semibold">
              <Link href={`/modules/${m.id}`}>
                {m.code} – {m.title}
              </Link>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Documentation et exercices pour le module {m.code}.
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}