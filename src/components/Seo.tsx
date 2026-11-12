import { useEffect } from "react";
import { siteConfig, isPreviewHost } from "@/config/site";
import { LANGS, localePath, useLang } from "@/i18n";

interface SeoProps {
  title: string;
  description?: string;
  /**
   * Path relativo sin prefijo de idioma, ej "/blog/mi-post". Se usa para
   * canonical, og:url y los links hreflang entre versiones.
   */
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** Datos opcionales para JSON-LD de artículo (blog). */
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
  noindex?: boolean;
  /** true si la página no existe en el otro idioma: no se emiten hreflang. */
  noAlternates?: boolean;
}

/** Crea o actualiza un <meta> identificado por name o property. */
function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Crea o actualiza el <link rel="canonical">. */
function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Reemplaza los <link rel="alternate" hreflang> que apuntan a cada versión de idioma. */
function setAlternates(alternates: { hreflang: string; href: string }[]) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  alternates.forEach(({ hreflang, href }) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

/** Maneja el bloque JSON-LD de artículo (id propio para no tocar el de Organization). */
function upsertJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  let el = existing as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * SEO por página: title, description, canonical, hreflang, Open Graph/Twitter y,
 * para el blog, JSON-LD de tipo Article. Maneja el <head> de forma imperativa (sin
 * dependencias externas), actualizándose en cada cambio de ruta.
 */
const Seo = ({
  title,
  description,
  path = "/",
  image,
  type = "website",
  article,
  noindex,
  noAlternates,
}: SeoProps) => {
  const { lang, t } = useLang();
  const url = `${siteConfig.url}${localePath(lang, path)}`;
  const desc = description ?? t.seo.description;
  const img = image ?? `${siteConfig.url}/og-image.jpg`;
  const fullTitle = title.includes("Meiba") ? title : `${title} | Meiba Talent`;

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = lang;
    upsertMeta("name", "description", desc);
    // En previews (revisión) forzamos noindex para que Google no indexe borradores.
    const shouldNoindex = noindex || isPreviewHost();
    upsertMeta("name", "robots", shouldNoindex ? "noindex, nofollow" : "index, follow");
    upsertCanonical(url);
    setAlternates(
      noindex || noAlternates
        ? []
        : [
            ...LANGS.map((l) => ({ hreflang: l, href: `${siteConfig.url}${localePath(l, path)}` })),
            { hreflang: "x-default", href: `${siteConfig.url}${path}` },
          ],
    );

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:locale", t.ogLocale);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);
    upsertMeta("name", "twitter:image:alt", fullTitle);

    upsertJsonLd(
      "ld-article",
      type === "article" && article
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description: desc,
            image: img,
            url,
            datePublished: article.publishedTime,
            author: { "@type": "Organization", name: article.author ?? siteConfig.name },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
            },
            keywords: article.tags?.join(", "),
          }
        : null,
    );

    upsertJsonLd(
      "ld-breadcrumb",
      type === "article"
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t.seo.breadcrumbHome, item: `${siteConfig.url}${localePath(lang, "/")}` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}${localePath(lang, "/blog")}` },
              { "@type": "ListItem", position: 3, name: title, item: url },
            ],
          }
        : null,
    );
  }, [fullTitle, desc, url, img, type, noindex, noAlternates, title, article, path, lang, t]);

  return null;
};

export default Seo;
