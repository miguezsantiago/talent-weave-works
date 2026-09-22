import { motion } from "framer-motion";

// Áreas de práctica. Cada una agrupa los perfiles que buscamos dentro de ella.
const areas = [
  {
    area: "Tecnología",
    roles: ["Desarrollo", "Data", "Inteligencia Artificial", "Cloud", "DevOps", "Product", "UX/UI", "Cybersecurity"],
  },
  {
    area: "Comercial y ventas",
    roles: ["Ventas B2B", "Key Account", "Inside Sales", "Customer Success", "Jefaturas comerciales"],
  },
  {
    area: "Marketing",
    roles: ["Performance", "Brand", "Contenidos", "CRM", "Growth"],
  },
  {
    area: "Logística y operaciones",
    roles: ["Supply Chain", "Planeamiento", "Comercio exterior", "Distribución", "Jefaturas de operaciones"],
  },
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-azul-profundo leading-tight mb-4">
            Hablamos tu idioma.
          </h2>
          <p className="text-azul-profundo/70 max-w-xl mx-auto leading-relaxed">
            Buscamos perfiles en cuatro áreas, con el mismo método y el mismo nivel de exigencia en cada una.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-6xl mx-auto">
          {areas.map((group, index) => (
            <motion.div
              key={group.area}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold tracking-tight text-azul-profundo mb-4 pb-3 border-b border-azul-profundo/20">
                {group.area}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.roles.map((role) => (
                  <li
                    key={role}
                    className="px-4 py-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground font-medium text-sm border border-border/30 shadow-[var(--shadow-soft)] hover:bg-background transition-colors"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
