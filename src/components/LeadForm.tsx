import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/analytics";
import { getUtm } from "@/lib/utm";

const schema = z.object({
  name: z.string().trim().min(2, "Contanos tu nombre"),
  email: z.string().trim().email("Email inválido"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role_searched: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot anti-spam: debe quedar vacío
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

const LeadForm = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // honeypot completado => bot

    const utm = getUtm();
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      email: values.email,
      company: values.company || null,
      phone: values.phone || null,
      role_searched: values.role_searched || null,
      message: values.message || null,
      source: "form",
      page_path: window.location.pathname,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
    });

    if (error) {
      toast.error("No pudimos enviar el mensaje. Probá de nuevo o escribinos por mail.");
      return;
    }

    trackLead({ method: "form" });
    setSent(true);
    toast.success("¡Recibido! Te respondemos en menos de 24 hs.");
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-background text-foreground p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto mb-4 text-primary" size={48} />
        <h3 className="font-display text-2xl font-bold mb-2">¡Gracias por escribirnos!</h3>
        <p className="text-muted-foreground">
          Recibimos tu mensaje. Un especialista de Meiba te contacta en menos de 24 horas hábiles.
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
          <label className="block text-sm font-medium mb-1.5">Nombre *</label>
          <input className={fieldClass} placeholder="Tu nombre" {...register("name")} />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email *</label>
          <input className={fieldClass} type="email" placeholder="tu@empresa.com" {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Empresa</label>
          <input className={fieldClass} placeholder="Nombre de tu empresa" {...register("company")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Teléfono / WhatsApp</label>
          <input className={fieldClass} placeholder="+54 9 11 ..." {...register("phone")} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">¿Qué perfil necesitás cubrir?</label>
        <input
          className={fieldClass}
          placeholder="Ej: Backend Senior, Head of Growth, Data Analyst..."
          {...register("role_searched")}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">Contanos más</label>
        <textarea
          className={fieldClass + " min-h-[110px] resize-y"}
          placeholder="¿Qué necesita tu equipo hoy?"
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
        {isSubmitting ? "Enviando..." : "Quiero que me contacten"}
      </button>
      <p className="text-muted-foreground text-xs mt-3 text-center">
        Te respondemos en menos de 24 hs hábiles. Sin spam.
      </p>
    </form>
  );
};

export default LeadForm;
