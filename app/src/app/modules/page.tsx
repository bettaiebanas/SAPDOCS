import Link from "next/link";
import { getModuleIds } from "@/lib/content";

export default async function ModulesPage() {
  const moduleIds = await getModuleIds();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Modules SAP Manufacturing – Documentation
      </h1>

      <ul className="space-y-3">
        {moduleIds.map((id) => (
          <li key={id} className="border rounded-md p-3">
            <h2 className="text-xl font-semibold">
              <Link href={`/modules/${id.toLowerCase()}`}>
                Module {id.toUpperCase()}
              </Link>
            </h2>
            <p className="text-sm text-gray-600">
              Documentation et exercices pour le module {id.toUpperCase()}.
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
