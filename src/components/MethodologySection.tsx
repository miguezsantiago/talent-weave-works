import { motion } from "framer-motion";
import { useLang } from "@/i18n";

// Mismo orden que `methodology.stats` en src/i18n/translations.ts.
const statValues = ["72h", "90d", "10+"];

const MethodologySection = () => {
  const { t } = useLang();

  return (
    <section id="metodologia" className="py-24 lg:py-32 bg-azul-profundo text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
              {t.methodology.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t.methodology.title}
            </h2>
            <p className="text-lg opacity-60 mb-10 max-w-xl mx-auto leading-relaxed">
              {t.methodology.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 mb-12"
          >
            {statValues.map((value, i) => (
              <div key={value}>
                <span className="font-display text-4xl md:text-5xl font-bold text-primary">{value}</span>
                <p className="text-sm opacity-50 mt-2">{t.methodology.stats[i]}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="#contacto"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {t.methodology.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
