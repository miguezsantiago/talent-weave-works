import { motion } from "framer-motion";
import { Users, Heart, Sparkles, Shield } from "lucide-react";

const values = [
  {
    number: "#1",
    title: "Jugamos en equipo.",
    description: "Nos comprometemos con los resultados del otro, colaboramos y crecemos juntos.",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    number: "#2",
    title: "Conectamos más allá del currículum.",
    description: "Ponemos el foco en las personas y las relaciones reales y duraderas.",
    icon: Heart,
    color: "bg-rosado/30 text-foreground",
  },
  {
    number: "#3",
    title: "Innovamos y entregamos excelencia.",
    description: "Nos movemos rápido, cuestionamos lo establecido y probamos nuevas formas de hacer las cosas, manteniéndonos rigurosos en la calidad.",
    icon: Sparkles,
    color: "bg-amarillo/40 text-foreground",
  },
  {
    number: "#4",
    title: "Promovemos la ética con impacto.",
    description: "Como profesionales, buscamos equilibrar éxito, respeto y propósito a través de hacer las cosas de la manera correcta.",
    icon: Shield,
    color: "bg-celeste/10 text-primary",
  },
];

const ValuesSection = () => {
  return (
    <section id="valores" className="py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
              Nuestros valores
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              4 acciones clave →
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              que nos definen como verdaderos partners estratégicos
            </p>
          </motion.div>

          {/* Right - Cards */}
          <div className="lg:col-span-3 space-y-4">
            {values.map((value, index) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] border border-border/50 flex gap-5 items-start"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${value.color}`}>
                  <value.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
