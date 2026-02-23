import { motion } from "framer-motion";
import { Rocket, Globe, TrendingUp } from "lucide-react";

const segments = [
  {
    icon: Rocket,
    title: "Startups tecnológicas",
    hint: "Equipos fundacionales que necesitan crecer rápido sin perder identidad.",
  },
  {
    icon: Globe,
    title: "Multinacionales con nearshoring",
    hint: "Operaciones regionales que buscan talento local con mentalidad global.",
  },
  {
    icon: TrendingUp,
    title: "PyMEs expandiendo equipos tech",
    hint: "Empresas en crecimiento que apuestan por la tecnología como motor.",
  },
];

const TargetSegmentSection = () => {
  return (
    <section id="segmento" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
            ¿Con quién trabajamos?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Entendemos tu momento.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {segments.map((seg, index) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <seg.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {seg.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {seg.hint}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14 text-muted-foreground text-sm"
        >
          ¿No te ves reflejado?{" "}
          <a href="#contacto" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
            Hablemos igual.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default TargetSegmentSection;
