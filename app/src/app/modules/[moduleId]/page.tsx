import Link from "next/link";
import { getDocsForModule } from "@/lib/content";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  // NEXT 16 : params est un Promise, on le "unwrap"
  const { moduleId } = await params;
  const normalizedId = moduleId.toLowerCase();

  const docs = await getDocsForModule(normalizedId);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Module {normalizedId.toUpperCase()}
      </h1>

      {docs.length === 0 ? (
        <p>Aucune page trouvée pour ce module pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc.slug} className="border rounded-md p-3">
              <Link href={`/modules/${doc.moduleId}/${doc.slug}`}>
                <span className="font-semibold">{doc.title}</span>
              </Link>
              {doc.level && (
                <p className="text-sm text-gray-600 mt-1">
                  Niveau : {doc.level}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
