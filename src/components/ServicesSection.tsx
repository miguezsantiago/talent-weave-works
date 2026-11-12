import { motion } from "framer-motion";
import { useLang } from "@/i18n";

// Color del cuadrado de marca de cada servicio, en el mismo orden que
// `services.items` en src/i18n/translations.ts.
const accents = ["bg-brand-gradient", "bg-celeste", "bg-rosado", "bg-amarillo"];

const ServicesSection = () => {
  const { t } = useLang();
  const services = t.services.items.map((item, i) => ({ ...item, accent: accents[i] }));

  return (
    <section id="servicios" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
            {t.services.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {t.services.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-t border-foreground/15 pt-6"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-5xl font-bold tracking-tight text-foreground/15 group-hover:text-foreground transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`w-5 h-5 ${service.accent} transition-transform duration-500 group-hover:rotate-90 group-hover:scale-125`} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
