import { motion } from "framer-motion";

const MethodologySection = () => {
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
              Cómo trabajamos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              Rápido. Preciso. Humano.
            </h2>
            <p className="text-lg opacity-60 mb-10 max-w-xl mx-auto leading-relaxed">
              Combinamos headhunting con análisis profundo del mercado. 
              No esperamos que el talento llegue — vamos a buscarlo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 mb-12"
          >
            <div>
              <span className="font-display text-4xl md:text-5xl font-bold text-primary">72h</span>
              <p className="text-sm opacity-50 mt-2">Primera terna de candidatos</p>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl font-bold text-primary">90d</span>
              <p className="text-sm opacity-50 mt-2">Garantía de reemplazo</p>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl font-bold text-primary">10+</span>
              <p className="text-sm opacity-50 mt-2">Años de experiencia</p>
            </div>
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
              Conocé el proceso completo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
