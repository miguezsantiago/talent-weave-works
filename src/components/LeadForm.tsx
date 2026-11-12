import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/analytics";
import { getUtm } from "@/lib/utm";
import { siteConfig } from "@/config/site";
import { useLang } from "@/i18n";
import type { Translations } from "@/i18n/translations";

const buildSchema = (t: Translations["form"]) =>
  z.object({
    name: z.string().trim().min(2, t.nameError),
    email: z.string().trim().email(t.emailError),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    role_searched: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    // honeypot anti-spam: debe quedar vacío
    website: z.string().max(0).optional().or(z.literal("")),
  });

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

const LeadForm = () => {
  const { lang, t } = useLang();
  const schema = useMemo(() => buildSchema(t.form), [t]);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // honeypot completado => bot

    const utm = getUtm();
    const pagePath = window.location.pathname;

    // Log en Supabase: best-effort, no bloquea el envío si falla o si el
    // proyecto no está accesible. La notificación real va por Web3Forms abajo.
    void supabase.from("leads").insert({
      name: values.name,
      email: values.email,
      company: values.company || null,
      phone: values.phone || null,
      role_searched: values.role_searched || null,
      message: values.message || null,
      source: "form",
      page_path: pagePath,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
    });

    if (!siteConfig.web3formsAccessKey) {
      toast.error(t.form.notConfigured);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.web3formsAccessKey,
          subject: `Nuevo lead: ${values.name}${values.company ? ` (${values.company})` : ""}`,
          from_name: "Meiba Web",
          name: values.name,
          email: values.email,
          company: values.company || undefined,
          phone: values.phone || undefined,
          role_searched: values.role_searched || undefined,
          message: values.message || undefined,
          utm_source: utm.utm_source ?? undefined,
          utm_medium: utm.utm_medium ?? undefined,
          utm_campaign: utm.utm_campaign ?? undefined,
          page_path: pagePath,
          language: lang,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "web3forms error");
    } catch {
      toast.error(t.form.sendError);
      return;
    }

    trackLead({ method: "form" });
    setSent(true);
    toast.success(t.form.successToast);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-background text-foreground p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto mb-4 text-primary" size={48} />
        <h3 className="font-display text-2xl font-bold mb-2">{t.form.successTitle}</h3>
        <p className="text-muted-foreground">
          {t.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-background text-foreground p-6 md:p-8 shadow-card text-left"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t.form.name}</label>
          <input className={fieldClass} placeholder={t.form.namePlaceholder} {...register("name")} />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t.form.email}</label>
          <input className={fieldClass} type="email" placeholder={t.form.emailPlaceholder} {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t.form.company}</label>
          <input className={fieldClass} placeholder={t.form.companyPlaceholder} {...register("company")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t.form.phone}</label>
          <input className={fieldClass} placeholder="+54 9 11 ..." {...register("phone")} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">{t.form.role}</label>
        <input
          className={fieldClass}
          placeholder={t.form.rolePlaceholder}
          {...register("role_searched")}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">{t.form.message}</label>
        <textarea
          className={fieldClass + " min-h-[110px] resize-y"}
          placeholder={t.form.messagePlaceholder}
          {...register("message")}
        />
      </div>

      {/* honeypot oculto para bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
        {...register("website")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium text-sm px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {isSubmitting ? t.form.submitting : t.form.submit}
      </button>
      <p className="text-muted-foreground text-xs mt-3 text-center">
        {t.form.footnote}
      </p>
    </form>
  );
};

export default LeadForm;
