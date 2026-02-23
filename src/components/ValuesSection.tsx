import { motion } from "framer-motion";
import { Users, Heart, Sparkles, Shield } from "lucide-react";

const values = [
  {
    title: "Equipo.",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Conexión genuina.",
    icon: Heart,
    color: "bg-rosado/30 text-foreground",
  },
  {
    title: "Innovación constante.",
    icon: Sparkles,
    color: "bg-amarillo/40 text-foreground",
  },
  {
    title: "Ética con impacto.",
    icon: Shield,
    color: "bg-celeste/10 text-primary",
  },
];

const ValuesSection = () => {
  return (
    <section id="valores" className="py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
              Lo que nos mueve
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-12">
              Creemos en otra forma de hacer las cosas.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${value.color}`}>
                  <value.icon size={24} />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {value.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
