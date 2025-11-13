import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { MODULES } from "@/config/modules";

export const metadata = {
  title: "SAPDOCS – SAP Manufacturing",
  description: "Plateforme de documentation & formation SAP Manufacturing (PP/MM/...)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="border-b bg-white">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
              <Link href="/" className="font-bold tracking-tight">
                SAPDOCS
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/modules" className="hover:underline">
                  Modules
                </Link>
              </nav>
            </div>
          </header>

          {/* MAIN LAYOUT */}
          <div className="flex flex-1 max-w-6xl mx-auto w-full">
            {/* SIDEBAR */}
            <aside className="hidden md:block w-64 border-r bg-white">
              <div className="p-4">
                <h2 className="text-xs font-semibold uppercase text-slate-500 mb-2">
                  Modules
                </h2>
                <ul className="space-y-1 text-sm">
                  {MODULES.map((m) => (
                    <li key={m.id}>
                      <Link
                        href={`/modules/${m.id}`}
                        className="text-slate-700 hover:underline"
                      >
                        {m.code} – {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* CONTENU */}
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}