/**
 * Idiomas del sitio. El español vive en la raíz ("/", "/blog/...") y el inglés
 * bajo el prefijo "/en" ("/en", "/en/blog/..."). El idioma activo siempre sale
 * de la URL, así cada versión tiene su propio link para compartir e indexar.
 *
 * Para sumar o cambiar textos: src/i18n/translations.ts
 */
import { useLocation } from "react-router-dom";
import { translations, type Translations } from "./translations";

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

const STORAGE_KEY = "meiba-lang";

/** Idioma que corresponde a una ruta ("/en/blog" -> "en", "/blog" -> "es"). */
export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "es";
}

/** Quita el prefijo de idioma: "/en/blog/x" -> "/blog/x", "/en" -> "/". */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Convierte una ruta "neutral" (la del sitio en español) a la del idioma pedido.
 * Ej: localePath("en", "/blog") -> "/en/blog"; localePath("en", "/#contacto") -> "/en/#contacto".
 */
export function localePath(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

/** La misma página, en otro idioma. */
export function switchLangPath(pathname: string, lang: Lang): string {
  return localePath(lang, stripLang(pathname));
}

export function getStoredLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

/** Guarda la elección explícita del visitante (click en el selector de idioma). */
export function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Sin localStorage (modo privado estricto): la elección dura lo que dure la URL.
  }
}

// Zonas horarias de países hispanohablantes: es la señal de ubicación que da el
// navegador sin tener que consultar la IP contra un servicio externo.
const SPANISH_TIMEZONES =
  /^(America\/(Argentina\/|Buenos_Aires|Montevideo|Santiago|Asuncion|La_Paz|Lima|Bogota|Guayaquil|Caracas|Mexico_City)|Europe\/Madrid)/;

const BOT_USER_AGENT = /bot|crawl|spider|slurp|facebookexternalhit|lighthouse|headless/i;

/**
 * Idioma sugerido según la configuración local del visitante: español si el
 * navegador lista español entre sus idiomas o si está en una zona horaria
 * hispanohablante; inglés en cualquier otro caso.
 */
export function detectPreferredLang(): Lang {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (languages.some((l) => l?.toLowerCase().startsWith("es"))) return "es";
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone && SPANISH_TIMEZONES.test(timeZone)) return "es";
  } catch {
    // Sin Intl: nos quedamos con lo que dijo el navegador.
  }
  return "en";
}

/**
 * Corre una sola vez, antes de montar React: si el visitante debería ver el
 * sitio en otro idioma, cambia la URL sin recargar.
 *  - Si ya eligió un idioma con el selector, esa elección manda siempre.
 *  - Si no, y entró a una URL en español, se detecta por configuración local.
 *    Una URL "/en" explícita se respeta.
 *  - A los buscadores no se los redirige: cada idioma se indexa en su URL.
 */
export function applyInitialLanguage() {
  if (typeof window === "undefined") return;
  const { pathname, search, hash } = window.location;
  const current = langFromPath(pathname);
  const stored = getStoredLang();

  let preferred = current;
  if (stored) preferred = stored;
  else if (current === DEFAULT_LANG && !BOT_USER_AGENT.test(navigator.userAgent)) {
    preferred = detectPreferredLang();
  }

  if (preferred !== current) {
    window.history.replaceState(null, "", switchLangPath(pathname, preferred) + search + hash);
  }
}

/** Idioma activo, sus textos y un helper para armar links en ese idioma. */
export function useLang(): { lang: Lang; t: Translations; path: (p: string) => string } {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return { lang, t: translations[lang], path: (p: string) => localePath(lang, p) };
}
