import { motion } from "framer-motion";
import { DollarSign, ShieldCheck, BriefcaseBusiness, Zap } from "lucide-react";

const services = [
  {
    icon: DollarSign,
    title: "Success Fee",
    description: "Sin costos iniciales ni retainers. Honorarios altamente competitivos que se adaptan a tus necesidades optimizando tus costos.",
    accent: "border-l-primary",
  },
  {
    icon: ShieldCheck,
    title: "Garantía y seguimiento",
    description: "Acompañamiento posterior a la contratación y reposición sin costo si no se cumplen las expectativas dentro del plazo acordado.",
    accent: "border-l-celeste",
  },
  {
    icon: BriefcaseBusiness,
    title: "Expertise en reclutamiento",
    description: "Más de 10 años de experiencia encontrando a los profesionales que empujarán tu proyecto hacia el éxito.",
    accent: "border-l-rosado",
  },
  {
    icon: Zap,
    title: "Proceso ágil y transparente",
    description: "Status en tiempo real, informes de disponibilidad, benchmarks salariales y herramientas de selección potenciadas con IA.",
    accent: "border-l-amarillo",
  },
];

const ServicesSection = () => {
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
            ¿Por qué elegirnos?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Tu partner estratégico.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-xl bg-card border border-border/50 shadow-[var(--shadow-soft)] border-l-4 ${service.accent} hover:shadow-[var(--shadow-card)] transition-shadow`}
            >
              <service.icon size={28} className="text-foreground mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
