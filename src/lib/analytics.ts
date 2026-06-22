/**
 * Capa de medición: Google Analytics 4 + Google Ads (gtag) y Meta Pixel (fbq).
 * Cada plataforma se inicializa SOLO si tiene su ID cargado en el .env.
 * Sin IDs configurados, todo esto no hace nada (no rompe, no carga scripts).
 */
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

const { ga4Id, metaPixelId, googleAdsId, googleAdsLeadLabel } = siteConfig.analytics;
const hasGtag = Boolean(ga4Id || googleAdsId);
let initialized = false;

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Carga e inicializa los tags. Idempotente: corre una sola vez. */
export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  if (hasGtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    const primaryId = ga4Id || googleAdsId;
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${primaryId}`);
    if (ga4Id) window.gtag("config", ga4Id, { send_page_view: false });
    if (googleAdsId) window.gtag("config", googleAdsId);
  }

  if (metaPixelId) {
    /* eslint-disable */
    (function (f: any, b, e, v) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      injectScript("https://connect.facebook.net/en_US/fbevents.js");
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", metaPixelId);
    window.fbq?.("track", "PageView");
  }
}

/** Registra un pageview en cada cambio de ruta (SPA). */
export function trackPageview(path: string) {
  if (ga4Id && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (metaPixelId && window.fbq) {
    window.fbq("track", "PageView");
  }
}

/**
 * Conversión de lead: lo que dispara cuando alguien completa el formulario o
 * arranca un contacto. Manda el evento a GA4, Meta (Lead) y Google Ads.
 */
export function trackLead(detail?: { method?: string; value?: number }) {
  const method = detail?.method ?? "form";
  if (ga4Id && window.gtag) {
    window.gtag("event", "generate_lead", {
      method,
      currency: "USD",
      value: detail?.value ?? 0,
    });
  }
  if (googleAdsId && googleAdsLeadLabel && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsLeadLabel}`,
      value: detail?.value ?? 0,
      currency: "USD",
    });
  }
  if (metaPixelId && window.fbq) {
    window.fbq("track", "Lead", { content_name: method });
  }
}
