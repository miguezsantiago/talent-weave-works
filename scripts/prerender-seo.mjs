/**
 * Post-build: genera un index.html por ruta real (home, /blog, /blog/:slug y sus
 * versiones en inglés bajo /en) dentro de dist/, con el <head> (title, description,
 * canonical, hreflang, Open Graph, Twitter Card, JSON-LD) ya resuelto en el HTML
 * estático.
 *
 * Por qué: el sitio es una SPA (React) y esos tags normalmente los escribe Seo.tsx
 * en el navegador después de montar. Eso funciona bien para Google (ejecuta JS),
 * pero los crawlers que leen HTML sin ejecutar JS (Twitterbot, facebookexternalhit,
 * LinkedInBot) solo ven el <head> que llega en la respuesta HTTP. Sin este paso,
 * cualquier post de blog compartido en redes mostraba el título/imagen de la home.
 *
 * Cloudflare Pages sirve un archivo estático por sobre el fallback de SPA, así que
 * un visitante real que entra directo a /blog/mi-post recibe este HTML (con el
 * <head> correcto) y React se monta encima con normalidad; la navegación interna
 * (Link de react-router) no se ve afectada porque no vuelve a pedir el HTML.
 *
 * Corre como script "postbuild" (después de "vite build").
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const blogDir = join(root, "src", "content", "blog");

const SITE_URL = (process.env.VITE_SITE_URL || "https://meibatalent.com.ar").replace(/\/$/, "");
const SITE_NAME = "Meiba Talent";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// Textos por idioma de las páginas fijas. Mantener alineado con src/i18n/translations.ts.
const LOCALES = {
  es: {
    prefix: "",
    ogLocale: "es_AR",
    home: "Inicio",
    homeTitle: "Meiba Talent | Headhunting en Argentina: tech, comercial, marketing y logística",
    description:
      "Meiba Talent arma equipos de tecnología, comercial, marketing y logística en Argentina. Headhunting ágil, humano y estratégico. Primera terna en 72hs.",
    blogDescription:
      "Ideas, datos y guías sobre headhunting tecnológico, contratación y talento tech en Argentina y LATAM.",
    blogDir,
  },
  en: {
    prefix: "/en",
    ogLocale: "en_US",
    home: "Home",
    homeTitle: "Meiba Talent | Headhunting in Argentina: tech, sales, marketing and logistics",
    description:
      "Meiba Talent builds technology, sales, marketing and logistics teams in Argentina. Agile, human and strategic headhunting. First shortlist in 72 hours.",
    blogDescription:
      "Ideas, data and guides on tech headhunting, hiring and tech talent in Argentina and LATAM.",
    blogDir: join(blogDir, "en"),
  },
};

function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return {};
  const [, fm] = match;
  const data = {};
  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return data;
}

function fullTitle(title) {
  return title.includes("Meiba") ? title : `${title} | ${SITE_NAME}`;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(str) {
  return escapeAttr(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Reescribe el <head> del template con los valores de esta ruta. */
function renderHead(template, meta) {
  const { title, description, path, image, type, article, lang, alternates } = meta;
  const locale = LOCALES[lang];
  const url = `${SITE_URL}${path}`;
  const desc = description || locale.description;
  const img = image || DEFAULT_IMAGE;
  const ft = fullTitle(title);

  let html = template;

  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(
    /(<meta property="og:locale" content=")[^"]*(")/,
    `$1${locale.ogLocale}$2`,
  );
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(ft)}</title>`);
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeAttr(desc)}$2`,
  );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escapeAttr(url)}$2`,
  );
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${escapeAttr(type)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeAttr(url)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(ft)}$2`);
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeAttr(desc)}$2`,
  );
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${escapeAttr(img)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(ft)}$2`);
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeAttr(desc)}$2`,
  );
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${escapeAttr(img)}$2`);
  html = html.replace(
    /(<meta name="twitter:image:alt" content=")[^"]*(")/,
    `$1${escapeAttr(ft)}$2`,
  );

  const jsonLdBlocks = [];
  if (type === "article" && article) {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: desc,
      image: img,
      url,
      datePublished: article.publishedTime,
      author: { "@type": "Organization", name: article.author || SITE_NAME },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` },
      },
      keywords: article.tags?.join(", "),
    });
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale.home, item: `${SITE_URL}${locale.prefix}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${locale.prefix}/blog` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    });
  }

  const extraScripts = jsonLdBlocks
    .map((data) => `    <script type="application/ld+json">\n${JSON.stringify(data)}\n    </script>`)
    .join("\n");

  // hreflang: le dice a Google que cada URL tiene su versión en el otro idioma.
  const alternateLinks = (alternates || [])
    .map(({ hreflang, path: altPath }) => `    <link rel="alternate" hreflang="${hreflang}" href="${escapeAttr(`${SITE_URL}${altPath}`)}" />`)
    .join("\n");

  html = html.replace("</head>", `${[alternateLinks, extraScripts].filter(Boolean).join("\n")}\n  </head>`);

  return html;
}

function writeRoute(template, relPath, meta) {
  const outDir = relPath === "/" ? distDir : join(distDir, relPath.replace(/^\//, ""));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), renderHead(template, meta));
}

const templatePath = join(distDir, "index.html");
if (!existsSync(templatePath)) {
  console.error("prerender-seo: no existe dist/index.html, ¿corriste `vite build` antes?");
  process.exit(1);
}
const template = readFileSync(templatePath, "utf8");

function readPosts(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = readFileSync(join(dir, f), "utf8");
      const data = parseFrontmatter(raw);
      return { slug: f.replace(/\.md$/, ""), data };
    });
}

/** Links hreflang de una página que existe en los dos idiomas (path sin prefijo). */
function alternatesFor(path) {
  const suffix = path === "/" ? "" : path;
  return [
    { hreflang: "es", path },
    { hreflang: "en", path: `/en${suffix}` },
    { hreflang: "x-default", path },
  ];
}

const postsByLang = { es: readPosts(LOCALES.es.blogDir), en: readPosts(LOCALES.en.blogDir) };
const slugsIn = (lang) => new Set(postsByLang[lang].map((p) => p.slug));
const translatedSlugs = new Set([...slugsIn("es")].filter((slug) => slugsIn("en").has(slug)));

for (const [lang, locale] of Object.entries(LOCALES)) {
  // Home
  writeRoute(template, locale.prefix || "/", {
    title: locale.homeTitle,
    description: locale.description,
    path: locale.prefix || "/",
    type: "website",
    lang,
    alternates: alternatesFor("/"),
  });

  // Blog index
  writeRoute(template, `${locale.prefix}/blog`, {
    title: "Blog | Meiba Talent",
    description: locale.blogDescription,
    path: `${locale.prefix}/blog`,
    type: "website",
    lang,
    alternates: alternatesFor("/blog"),
  });

  // Cada post
  for (const { slug, data } of postsByLang[lang]) {
    const path = `${locale.prefix}/blog/${slug}`;
    writeRoute(template, path, {
      title: data.seoTitle || data.title || slug,
      description: data.seoDescription || data.description || "",
      path,
      image: data.image ? `${SITE_URL}${data.image}` : undefined,
      type: "article",
      lang,
      alternates: translatedSlugs.has(slug) ? alternatesFor(`/blog/${slug}`) : [],
      article: {
        publishedTime: data.date,
        author: data.author || SITE_NAME,
        tags: data.tags
          ? data.tags
              .replace(/^\[|\]$/g, "")
              .split(",")
              .map((t) => t.trim().replace(/^["']|["']$/g, ""))
              .filter(Boolean)
          : [],
      },
    });
  }
}

console.log(
  `prerender-seo: generado head estático para home y /blog en 2 idiomas, ${postsByLang.es.length} posts (es) y ${postsByLang.en.length} posts (en)`,
);
