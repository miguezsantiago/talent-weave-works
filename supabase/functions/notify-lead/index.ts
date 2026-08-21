// Edge Function: envía un mail cuando entra un lead nuevo (tabla public.leads).
// Se dispara desde un Database Webhook de Supabase (Database -> Webhooks,
// evento INSERT sobre "leads", tipo "Supabase Edge Functions" -> notify-lead).
//
// Secrets requeridos (Supabase Dashboard -> Edge Functions -> notify-lead -> Secrets,
// o CLI: supabase secrets set NOMBRE=valor):
//   RESEND_API_KEY  -> API key de https://resend.com
//   NOTIFY_EMAIL    -> mail que recibe el aviso (default: contacto@meiba.com.ar)
//   FROM_EMAIL      -> remitente verificado en Resend (default: onboarding@resend.dev,
//                      sandbox de Resend, sirve para arrancar sin verificar dominio)

interface LeadRecord {
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  role_searched: string | null;
  message: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  page_path: string | null;
  created_at: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: LeadRecord;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderEmail(lead: LeadRecord): { subject: string; html: string } {
  const rows: [string, string | null][] = [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Empresa", lead.company],
    ["Teléfono", lead.phone],
    ["Perfil buscado", lead.role_searched],
    ["Mensaje", lead.message],
    ["Fuente", lead.source],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
    ["Página", lead.page_path],
  ];

  const html = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${label}</td><td>${escapeHtml(String(value))}</td></tr>`)
    .join("\n");

  return {
    subject: `Nuevo lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: `<table cellspacing="0" cellpadding="0">${html}</table>`,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (payload.table !== "leads" || payload.type !== "INSERT" || !payload.record) {
    return new Response("Ignored", { status: 200 });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("Falta el secret RESEND_API_KEY");
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  const notifyEmail = Deno.env.get("NOTIFY_EMAIL") ?? "contacto@meiba.com.ar";
  const fromEmail = Deno.env.get("FROM_EMAIL") ?? "onboarding@resend.dev";
  const { subject, html } = renderEmail(payload.record);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Meiba Web <${fromEmail}>`,
      to: [notifyEmail],
      reply_to: payload.record.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error enviando mail via Resend:", res.status, errorText);
    return new Response("Error sending email", { status: 502 });
  }

  return new Response("OK", { status: 200 });
});
