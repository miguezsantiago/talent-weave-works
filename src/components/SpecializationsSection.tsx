import { motion } from "framer-motion";

const specs = [
  "Machine Learning",
  "Desarrollo",
  "Data",
  "Inteligencia Artificial",
  "Cloud",
  "Full Stack",
  "DevOps",
  "Product Management",
  "UX/UI Design",
  "Cybersecurity",
];

const SpecializationsSection = () => {
  return (
    <section id="especialidades" className="py-24 lg:py-32 bg-brand-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium text-azul-profundo/70 tracking-widest uppercase mb-3">
            Áreas de especialización
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-azul-profundo leading-tight">
            Somos especialistas
          </h2>
          <p className="mt-4 text-lg text-azul-profundo/60 max-w-xl mx-auto">
            Más de 10 años de experiencia en las siguientes tecnologías
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {specs.map((spec, index) => (
            <motion.span
              key={spec}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-6 py-3 rounded-full bg-background/70 backdrop-blur-sm text-foreground font-medium text-sm border border-border/30 shadow-[var(--shadow-soft)] hover:bg-background hover:shadow-[var(--shadow-card)] transition-all cursor-default"
            >
              {spec}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 text-azul-profundo/50 text-sm"
        >
          Y muchas más.
        </motion.p>
      </div>
    </section>
  );
};

export default SpecializationsSection;
