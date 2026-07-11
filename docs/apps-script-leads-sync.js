/**
 * Sincroniza los leads de Supabase a este Google Sheet.
 * Corre con un trigger de tiempo (cada 15 min) y trae solo los leads nuevos
 * desde la última sincronización (idempotente: nunca duplica filas).
 *
 * SETUP (una sola vez):
 * 1. En el Sheet: Extensiones → Apps Script → pegar este código.
 * 2. En Apps Script: Configuración del proyecto (⚙️) → Propiedades del script → agregar:
 *      SUPABASE_URL              = https://rmayqnqyyrnawmaqnebf.supabase.co
 *      SUPABASE_SERVICE_ROLE_KEY = (Supabase → Settings → API keys → service_role)
 *    ⚠️ La service_role key es SECRETA: solo va acá. Nunca al repo, al .env del
 *    sitio ni a un chat. Es la única key que puede LEER los leads (bypasea RLS).
 * 3. Ejecutar la función syncLeads una vez a mano (Run) → autorizar permisos.
 * 4. Triggers (⏰ en el menú izquierdo) → Agregar trigger →
 *    función: syncLeads | evento: según tiempo | cada 15 minutos.
 */

const HEADERS = [
  "created_at", "name", "email", "company", "phone", "role_searched",
  "message", "source", "utm_source", "utm_medium", "utm_campaign",
  "page_path", "id",
];

function syncLeads() {
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty("SUPABASE_URL");
  const key = props.getProperty("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en Propiedades del script.");

  const sheet = getOrCreateSheet_();

  // Watermark: fecha del último lead ya sincronizado (guardada en propiedades).
  const since = props.getProperty("LAST_SYNC_AT") || "1970-01-01T00:00:00Z";

  const endpoint =
    url + "/rest/v1/leads?select=*" +
    "&created_at=gt." + encodeURIComponent(since) +
    "&order=created_at.asc&limit=500";

  const resp = UrlFetchApp.fetch(endpoint, {
    headers: { apikey: key, Authorization: "Bearer " + key },
    muteHttpExceptions: true,
  });
  if (resp.getResponseCode() !== 200) {
    throw new Error("Supabase respondió " + resp.getResponseCode() + ": " + resp.getContentText());
  }

  const leads = JSON.parse(resp.getContentText());
  if (!leads.length) return; // nada nuevo

  const values = leads.map(function (l) {
    return HEADERS.map(function (h) { return l[h] == null ? "" : String(l[h]); });
  });
  sheet.getRange(sheet.getLastRow() + 1, 1, values.length, HEADERS.length).setValues(values);

  // Actualizar watermark con el último lead traído.
  props.setProperty("LAST_SYNC_AT", leads[leads.length - 1].created_at);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName("Leads");
  if (!sheet) sheet = ss.insertSheet("Leads");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    // created_at como texto plano para que Sheets no reformatee el ISO.
    sheet.getRange("A:A").setNumberFormat("@");
  }
  return sheet;
}

/** Opcional: correr una vez para re-sincronizar TODO desde cero. */
function resetAndFullSync() {
  PropertiesService.getScriptProperties().deleteProperty("LAST_SYNC_AT");
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Leads");
  if (sheet) ss.deleteSheet(sheet);
  syncLeads();
}
