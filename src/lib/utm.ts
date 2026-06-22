/**
 * Captura parámetros UTM de la URL (los que agregan Meta/Google Ads) y los
 * guarda en sessionStorage para no perderlos si el usuario navega antes de
 * completar el formulario. Así cada lead queda atribuido a su campaña.
 */
const KEY = "meiba_utm";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};
  let found = false;
  (["utm_source", "utm_medium", "utm_campaign"] as const).forEach((k) => {
    const v = params.get(k);
    if (v) {
      data[k] = v;
      found = true;
    }
  });
  if (found) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* sessionStorage no disponible: ignorar */
    }
  }
}

export function getUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as UtmData;
  } catch {
    return {};
  }
}
