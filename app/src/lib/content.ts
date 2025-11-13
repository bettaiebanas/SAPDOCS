import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { MODULES } from "@/config/modules";

export type DocMeta = {
  moduleId: string;
  slug: string;
  title: string;
  order: number;
  level?: string;
  status?: string;
  labels?: string[];
};

const contentRoot = path.join(process.cwd(), "content", "modules");

/**
 * IDs de modules autorisés (m01, m02, ...)
 * -> base sur la config centrale.
 */
export async function getModuleIds(): Promise<string[]> {
  return MODULES.map((m) => m.id);
}

/**
 * Retourne les métadonnées de toutes les pages d'un module.
 */
export async function getDocsForModule(moduleId: string): Promise<DocMeta[]> {
  const normalized = moduleId.toLowerCase();
  const moduleDir = path.join(contentRoot, normalized);

  let files: string[];
  try {
    files = await fs.readdir(moduleDir);
  } catch {
    // pas de dossier => pas de pages
    return [];
  }

  const docs: DocMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(moduleDir, file);
    const source = await fs.readFile(fullPath, "utf8");
    const { data } = matter(source);

    docs.push({
      moduleId: normalized,
      slug: String(data.slug ?? file.replace(/\.md$/, "")),
      title: String(data.title ?? file),
      order: Number(data.order ?? 0),
      level: data.level ? String(data.level) : undefined,
      status: data.status ? String(data.status) : undefined,
      labels: Array.isArray(data.labels)
        ? data.labels.map((l: unknown) => String(l))
        : undefined,
    });
  }

  docs.sort((a, b) => a.order - b.order);
  return docs;
}

/**
 * Retourne une page complète (métadonnées + HTML) pour un module/slug donné.
 */
export async function getDocBySlug(moduleId: string, slug: string) {
  const normalized = moduleId.toLowerCase();
  const moduleDir = path.join(contentRoot, normalized);

  const files = await fs.readdir(moduleDir);

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(moduleDir, file);
    const source = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(source);
    const docSlug = String(data.slug ?? file.replace(/\.md$/, ""));

    if (docSlug === slug) {
      const processed = await remark().use(html).process(content);
      const htmlContent = processed.toString();

      const meta: DocMeta = {
        moduleId: normalized,
        slug: docSlug,
        title: String(data.title ?? file),
        order: Number(data.order ?? 0),
        level: data.level ? String(data.level) : undefined,
        status: data.status ? String(data.status) : undefined,
        labels: Array.isArray(data.labels)
          ? data.labels.map((l: unknown) => String(l))
          : undefined,
      };

      return { meta, html: htmlContent };
    }
  }

  throw new Error(`Doc not found for module=${moduleId}, slug=${slug}`);
}