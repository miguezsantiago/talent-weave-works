import { useEffect } from "react";
import { siteConfig } from "@/config/site";

interface SeoProps {
  title: string;
  description?: string;
  /** Path relativo, ej "/blog/mi-post". Se usa para canonical y og:url. */
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
 * SEO por página: title, description, canonical, Open Graph/Twitter y, para el
 * blog, JSON-LD de tipo Article. Maneja el <head> de forma imperativa (sin
 * dependencias externas), actualizándose en cada cambio de ruta.
 */
const Seo = ({ title, description, path = "/", image, type = "website", article, noindex }: SeoProps) => {
  const url = `${siteConfig.url}${path}`;
  const desc = description ?? siteConfig.description;
  const img = image ?? `${siteConfig.url}/og-image.jpg`;
  const fullTitle = title.includes("Meiba") ? title : `${title} | Meiba Talent`;

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertCanonical(url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);

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
  }, [fullTitle, desc, url, img, type, noindex, title, article]);

  return null;
};

export default Seo;
