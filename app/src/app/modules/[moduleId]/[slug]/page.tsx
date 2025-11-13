import { notFound } from "next/navigation";
import { getDocBySlug } from "@/lib/content";

export default async function DocPage({
  params,
}: {
  params: Promise<{ moduleId: string; slug: string }>;
}) {
  const { moduleId, slug } = await params;
  const normalizedId = moduleId.toLowerCase();

  let doc;
  try {
    doc = await getDocBySlug(normalizedId, slug);
  } catch {
    return notFound();
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">{doc.meta.title}</h1>

      {doc.meta.status && (
        <p className="text-xs uppercase text-slate-500 mb-2">
          Statut : {doc.meta.status}
        </p>
      )}

      <article
        className="prose max-w-none bg-white p-4 rounded-md border"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </main>
  );
}