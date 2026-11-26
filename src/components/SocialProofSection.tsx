import { motion } from "framer-motion";
import { useLang } from "@/i18n";

/**
 * Franja de prueba social con PLACEHOLDERS a la vista.
 *
 * TODO(Santi): reemplazar logos y testimonios solo con autorización explícita
 * de cada cliente. No inventar nombres, citas ni métricas.
 *
 * Material ya disponible en el repo, todavía sin usar:
 * - Logos en public/logos/ (Fiat, Marriott, OSDE, Citroën, Omoda & Jaecoo),
 *   preparados en el commit "dejar listo (sin montar) el carrusel de marcas clientes".
 *   ClientsSection.tsx sigue sin montarse a propósito.
 * - La alianza con Deel ya está comunicada en el blog
 *   (/blog/partnership-deel-contratacion-global). Sirve como candidato, no como cita.
 */
const SocialProofSection = () => {
  const { t } = useLang();
  const { socialProof } = t;

  return (
    <section id="prueba-social" className="py-16 lg:py-20 bg-background border-y border-border/60">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
            {socialProof.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {socialProof.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{socialProof.body}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {socialProof.logos.map((label) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center min-h-[120px] px-4 py-6 rounded-2xl border border-dashed border-foreground/25 bg-secondary/40 text-center"
            >
              <span className="text-[10px] font-medium tracking-widest uppercase text-primary mb-2">
                {socialProof.placeholderLabel}
              </span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialProof.testimonials.map((item) => (
            <blockquote
              key={item.attribution}
              className="rounded-2xl border border-dashed border-foreground/25 bg-secondary/30 px-6 py-6"
            >
              <p className="text-[10px] font-medium tracking-widest uppercase text-primary mb-3">
                {socialProof.placeholderLabel}
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">“{item.quote}”</p>
              <footer className="text-sm text-muted-foreground">{item.attribution}</footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {socialProof.note}
        </p>
      </div>
    </section>
  );
};

export default SocialProofSection;
