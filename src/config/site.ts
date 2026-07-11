/**
 * Configuración central del sitio.
 * Todo lo que depende de cuentas externas se controla por variables de entorno
 * (archivo .env). Cambiás el valor ahí y no hace falta tocar el código.
 *
 * Variables disponibles (todas opcionales, con fallback sensato):
 *   VITE_SITE_URL            -> URL canónica del sitio (ej: https://meiba.com.ar)
 *   VITE_CONTACT_EMAIL       -> mail donde querés recibir contactos
 *   VITE_WHATSAPP_NUMBER     -> WhatsApp en formato internacional sin "+" ni espacios
 *                               (ej: 5491122334455). Vacío = se ocultan los botones de WhatsApp.
 *   VITE_CALENDAR_URL        -> link de agenda (Calendly, Cal.com, Google). Vacío = se oculta el botón.
 *   VITE_GA4_ID              -> Google Analytics 4 (ej: G-XXXXXXX)
 *   VITE_META_PIXEL_ID       -> Meta/Facebook Pixel (ej: 1234567890)
 *   VITE_GOOGLE_ADS_ID       -> Google Ads (ej: AW-XXXXXXXXX)
 *   VITE_GOOGLE_ADS_LEAD_LABEL -> label de conversión de Google Ads para "lead"
 */

const env = import.meta.env;

export const siteConfig = {
  name: "Meiba Talent",
  url: (env.VITE_SITE_URL ?? "https://meiba.com.ar").replace(/\/$/, ""),
  description:
    "Meiba Talent conecta empresas tecnológicas con los mejores profesionales de Argentina. Headhunting ágil, humano y estratégico. Primera terna en 72hs.",

  contactEmail: env.VITE_CONTACT_EMAIL ?? "contacto@meiba.com.ar",
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? "",
  calendarUrl: env.VITE_CALENDAR_URL ?? "",

  social: {
    linkedin: "https://www.linkedin.com/company/meibatalent",
    instagram: "https://instagram.com/meibatalent",
  },

  analytics: {
    ga4Id: env.VITE_GA4_ID ?? "",
    metaPixelId: env.VITE_META_PIXEL_ID ?? "",
    googleAdsId: env.VITE_GOOGLE_ADS_ID ?? "",
    googleAdsLeadLabel: env.VITE_GOOGLE_ADS_LEAD_LABEL ?? "",
  },
};

/**
 * Hosts donde el sitio es "producción real". Cualquier otro host (las preview
 * URLs de Cloudflare para ramas, ej: content-blog-x.talent-weave-works.pages.dev)
 * se considera un entorno de revisión y se marca noindex, así Google no indexa
 * los borradores ni te generan contenido duplicado.
 */
export const productionHosts = [
  "meiba.com.ar",
  "www.meiba.com.ar",
  "talent-weave-works.pages.dev",
];

export function isPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  return !productionHosts.includes(window.location.hostname);
}

/** Mensaje pre-armado para el botón de WhatsApp. */
export const whatsappMessage =
  "Hola Meiba 👋 Quiero contar qué necesita mi equipo y conocer cómo trabajan.";

/** Link de WhatsApp listo para usar (o null si no hay número configurado). */
export const whatsappHref = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : null;
