/**
 * Blog basado en archivos markdown en src/content/blog/*.md
 * Cada post tiene un frontmatter (metadatos) entre "---" y el cuerpo en markdown.
 * Vite los carga en build, así que el contenido queda pre-incluido (bueno para SEO).
 *
 * Los posts en español viven en src/content/blog/ y su traducción al inglés en
 * src/content/blog/en/, con el MISMO nombre de archivo (así el selector de idioma
 * lleva de una versión a la otra). Un post sin traducción solo aparece en español.
 *
 * Para publicar un post nuevo: crear un .md en src/content/blog/ con este formato:
 *
 *   ---
 *   title: Título del artículo
 *   description: Resumen de 1-2 frases para Google y redes.
 *   date: 2026-06-20
 *   author: Meiba Talent
 *   tags: [recruiting, tech, argentina]
 *   seoTitle: Opcional. Versión corta del title para el tag <title> (<=60 caracteres con " | Meiba Talent" incluido). Si no se define, se usa title.
 *   seoDescription: Opcional. Versión para meta description si description queda larga (<=155 caracteres). Si no se define, se usa description.
 *   image: Opcional. Ruta absoluta desde la raíz (ej: /blog/mi-post-og.jpg) para la imagen de Open Graph/Twitter de este post. Si no se define, se usa la imagen default del sitio.
 *   ---
 *   # Contenido en markdown...
 */

import type { Lang } from "@/i18n";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

const files: Record<Lang, Record<string, string>> = {
  es: import.meta.glob("/src/content/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
  en: import.meta.glob("/src/content/blog/en/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
};

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const [, fm, body] = match;
  const data: Record<string, string> = {};
  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return { data, body: body.trim() };
}

function parseTags(value?: string): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function buildPost(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Meiba Talent",
    tags: parseTags(data.tags),
    readingMinutes: estimateReadingMinutes(body),
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    image: data.image,
    content: body,
  };
}

function loadPosts(lang: Lang): Post[] {
  return Object.entries(files[lang])
    .map(([path, raw]) => buildPost(path, raw))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const allPosts: Record<Lang, Post[]> = { es: loadPosts("es"), en: loadPosts("en") };

export function getAllPosts(lang: Lang = "es"): Post[] {
  return allPosts[lang];
}

export function getPostBySlug(slug: string, lang: Lang = "es"): Post | undefined {
  return allPosts[lang].find((p) => p.slug === slug);
}

export function formatDate(date: string, locale = "es-AR"): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  // timeZone UTC: la fecha del frontmatter no tiene hora, y sin esto en Argentina
  // (UTC-3) se mostraba el día anterior.
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
