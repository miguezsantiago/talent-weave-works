import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { applyInitialLanguage, langFromPath, localePath, stripLang, switchLangPath } from "@/i18n";
import { translations } from "@/i18n/translations";

describe("rutas por idioma", () => {
  it("detecta el idioma según el prefijo de la ruta", () => {
    expect(langFromPath("/")).toBe("es");
    expect(langFromPath("/blog/mi-post")).toBe("es");
    expect(langFromPath("/en")).toBe("en");
    expect(langFromPath("/en/")).toBe("en");
    expect(langFromPath("/en/blog/mi-post")).toBe("en");
    // "/entrevistas" empieza con "en" pero no es la versión en inglés
    expect(langFromPath("/entrevistas")).toBe("es");
  });

  it("arma la ruta de cada idioma", () => {
    expect(localePath("es", "/blog")).toBe("/blog");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/blog")).toBe("/en/blog");
    expect(localePath("en", "/#contacto")).toBe("/en/#contacto");
  });

  it("cambia de idioma manteniendo la página", () => {
    expect(stripLang("/en")).toBe("/");
    expect(stripLang("/en/blog/x")).toBe("/blog/x");
    expect(switchLangPath("/blog/x", "en")).toBe("/en/blog/x");
    expect(switchLangPath("/en/blog/x", "es")).toBe("/blog/x");
    expect(switchLangPath("/en/", "es")).toBe("/");
    expect(switchLangPath("/", "en")).toBe("/en");
  });
});

describe("idioma inicial", () => {
  const setBrowser = (languages: string[], timeZone: string) => {
    vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone,
    } as Intl.ResolvedDateTimeFormatOptions);
  };

  beforeEach(() => {
    // localStorage en memoria: el de jsdom no está disponible en todas las versiones de Node.
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    });
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("pasa a inglés si el navegador no está en español ni en zona hispanohablante", () => {
    setBrowser(["en-US", "en"], "America/New_York");
    window.history.replaceState(null, "", "/blog?utm_source=x#top");
    applyInitialLanguage();
    expect(window.location.pathname + window.location.search + window.location.hash).toBe(
      "/en/blog?utm_source=x#top",
    );
  });

  it("deja el español si el navegador lista español", () => {
    setBrowser(["en-US", "es-AR"], "America/New_York");
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/");
  });

  it("deja el español si la zona horaria es de Argentina", () => {
    setBrowser(["en-US"], "America/Argentina/Buenos_Aires");
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/");
  });

  it("respeta una URL /en aunque el navegador esté en español", () => {
    setBrowser(["es-AR"], "America/Argentina/Buenos_Aires");
    window.history.replaceState(null, "", "/en/blog");
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/en/blog");
  });

  it("la elección guardada manda sobre la detección", () => {
    setBrowser(["en-US"], "America/New_York");
    window.localStorage.setItem("meiba-lang", "es");
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/");

    window.localStorage.setItem("meiba-lang", "en");
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/en");
  });

  it("no redirige a los buscadores", () => {
    setBrowser(["en-US"], "America/New_York");
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    );
    applyInitialLanguage();
    expect(window.location.pathname).toBe("/");
  });
});

describe("traducciones", () => {
  // Las listas se cruzan por posición con íconos y colores en los componentes.
  it("tienen la misma cantidad de ítems en los dos idiomas", () => {
    const { es, en } = translations;
    expect(en.values.items).toHaveLength(es.values.items.length);
    expect(en.methodology.stats).toHaveLength(es.methodology.stats.length);
    expect(en.services.items).toHaveLength(es.services.items.length);
    expect(en.segments.items).toHaveLength(es.segments.items.length);
    expect(en.specializations.areas.map((a) => a.roles.length)).toEqual(
      es.specializations.areas.map((a) => a.roles.length),
    );
  });
});
