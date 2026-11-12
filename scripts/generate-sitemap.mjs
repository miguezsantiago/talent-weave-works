/**
 * Genera public/sitemap.xml automáticamente a partir de los posts del blog
 * (en español y, cuando existe la traducción en src/content/blog/en, en inglés).
 * Corre en cada build (npm script "prebuild"), así el sitemap siempre queda
 * al día sin tocarlo a mano cuando se publica un post nuevo.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BASE = (process.env.VITE_SITE_URL || "https://meibatalent.com.ar").replace(/\/$/, "");
const blogDir = join(root, "src", "content", "blog");

function frontmatterDate(raw) {
  const m = /^---\s*\n([\s\S]*?)\n---/.exec(raw);
  if (!m) return null;
  const line = m[1].split("\n").find((l) => l.trim().startsWith("date:"));
  if (!line) return null;
  return line.split(":").slice(1).join(":").trim().replace(/^["']|["']$/g, "");
}

function readPosts(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      date: frontmatterDate(readFileSync(join(dir, f), "utf8")),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const posts = readPosts(blogDir);
const postsEn = readPosts(join(blogDir, "en"));

const buildDate = new Date().toISOString().slice(0, 10);

/** URLs de un idioma: home, índice del blog y cada post. `prefix` es "" o "/en". */
function urlsFor(prefix, langPosts) {
  return [
    { loc: `${BASE}${prefix || "/"}`, changefreq: "weekly", priority: "1.0", lastmod: buildDate },
    {
      loc: `${BASE}${prefix}/blog`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: langPosts[0]?.date || buildDate,
    },
    ...langPosts.map((p) => ({
      loc: `${BASE}${prefix}/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: p.date || undefined,
    })),
  ];
}

const urls = [...urlsFor("", posts), ...urlsFor("/en", postsEn)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml generado con ${posts.length} posts (es) y ${postsEn.length} posts (en)`);
