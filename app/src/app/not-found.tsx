import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
      <p className="mb-6">
        La page ou le module que vous cherchez n&apos;existe pas ou plus.
      </p>
      <Link
        href="/modules"
        className="inline-block px-4 py-2 rounded-md border bg-black text-white"
      >
        Revenir aux modules
      </Link>
    </main>
  );
}