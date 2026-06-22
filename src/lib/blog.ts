/**
 * Blog basado en archivos markdown en src/content/blog/*.md
 * Cada post tiene un frontmatter (metadatos) entre "---" y el cuerpo en markdown.
 * Vite los carga en build, así que el contenido queda pre-incluido (bueno para SEO).
 *
 * Para publicar un post nuevo: crear un .md en src/content/blog/ con este formato:
 *
 *   ---
 *   title: Título del artículo
 *   description: Resumen de 1-2 frases para Google y redes.
 *   date: 2026-06-20
 *   author: Meiba Talent
 *   tags: [recruiting, tech, argentina]
 *   ---
 *   # Contenido en markdown...
 */

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

const files = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

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
    content: body,
  };
}

const allPosts: Post[] = Object.entries(files)
  .map(([path, raw]) => buildPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return allPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}
