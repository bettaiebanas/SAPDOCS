import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SAPDOCS – SAP Manufacturing</h1>
      <p className="mb-4">
        Bienvenue sur ta plateforme de documentation SAP Manufacturing
        (PP / MM / SD / QM / PM). Tu trouveras ici les modules structurés,
        la terminologie, les schémas et les exercices pratiques.
      </p>

      <Link
        href="/modules"
        className="inline-block px-4 py-2 rounded-md border bg-black text-white"
      >
        Accéder aux modules
      </Link>
    </main>
  );
}