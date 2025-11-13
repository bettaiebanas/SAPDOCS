import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type DocMeta = {
  moduleId: string;
  slug: string;
  title: string;
  order: number;
  level?: string;
};

const contentRoot = path.join(process.cwd(), "content", "modules");

/**
 * Retourne la liste des modules disponibles (m01, m02, ...).
 */
export async function getModuleIds(): Promise<string[]> {
  const entries = await fs.readdir(contentRoot, { withFileTypes: true });
  return entries.filter((d) => d.isDirectory()).map((d) => d.name);
}

/**
 * Retourne les métadonnées de toutes les pages d'un module.
 */
export async function getDocsForModule(moduleId: string): Promise<DocMeta[]> {
  const moduleDir = path.join(contentRoot, moduleId.toLowerCase());
  const files = await fs.readdir(moduleDir);
  const docs: DocMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(moduleDir, file);
    const source = await fs.readFile(fullPath, "utf8");
    const { data } = matter(source);

    docs.push({
      moduleId: moduleId.toLowerCase(),
      slug: String(data.slug ?? file.replace(/\.md$/, "")),
      title: String(data.title ?? file),
      order: Number(data.order ?? 0),
      level: data.level ? String(data.level) : undefined,
    });
  }

  docs.sort((a, b) => a.order - b.order);
  return docs;
}

/**
 * Retourne une page complète (métadonnées + HTML) pour un module/slug donné.
 */
export async function getDocBySlug(moduleId: string, slug: string) {
  const moduleDir = path.join(contentRoot, moduleId.toLowerCase());
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
        moduleId: moduleId.toLowerCase(),
        slug: docSlug,
        title: String(data.title ?? file),
        order: Number(data.order ?? 0),
        level: data.level ? String(data.level) : undefined,
      };

      return { meta, html: htmlContent };
    }
  }

  throw new Error(`Doc not found for module=${moduleId}, slug=${slug}`);
}
