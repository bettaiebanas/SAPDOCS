import { getDocBySlug } from "@/lib/content";

export default async function DocPage({
  params,
}: {
  params: Promise<{ moduleId: string; slug: string }>;
}) {
  // NEXT 16 : params est un Promise
  const { moduleId, slug } = await params;
  const normalizedId = moduleId.toLowerCase();

  const doc = await getDocBySlug(normalizedId, slug);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{doc.meta.title}</h1>

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </main>
  );
}
