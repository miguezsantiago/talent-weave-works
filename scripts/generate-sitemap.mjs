/**
 * Genera public/sitemap.xml automáticamente a partir de los posts del blog.
 * Corre en cada build (npm script "prebuild"), así el sitemap siempre queda
 * al día sin tocarlo a mano cuando se publica un post nuevo.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BASE = (process.env.VITE_SITE_URL || "https://meiba.com.ar").replace(/\/$/, "");
const blogDir = join(root, "src", "content", "blog");

function frontmatterDate(raw) {
  const m = /^---\s*\n([\s\S]*?)\n---/.exec(raw);
  if (!m) return null;
  const line = m[1].split("\n").find((l) => l.trim().startsWith("date:"));
  if (!line) return null;
  return line.split(":").slice(1).join(":").trim().replace(/^["']|["']$/g, "");
}

const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({
    slug: f.replace(/\.md$/, ""),
    date: frontmatterDate(readFileSync(join(blogDir, f), "utf8")),
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const urls = [
  { loc: `${BASE}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${BASE}/blog`, changefreq: "weekly", priority: "0.8" },
  ...posts.map((p) => ({
    loc: `${BASE}/blog/${p.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: p.date || undefined,
  })),
];

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
console.log(`sitemap.xml generado con ${posts.length} posts`);
