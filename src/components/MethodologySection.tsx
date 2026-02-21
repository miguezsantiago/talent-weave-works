import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kick Off",
    subtitle: "Todo arranca acá.",
    description: "Definimos los requerimientos y expectativas del rol. Relevamos tu etapa organizacional para asegurar que los perfiles se alineen con tus necesidades actuales y futuras.",
  },
  {
    number: "02",
    title: "Búsqueda y evaluación",
    subtitle: "Encontramos al talento.",
    description: "Iniciamos la búsqueda e identificamos competencias clave. Todos los candidatos son entrevistados y evaluados por expertos en la industria.",
  },
  {
    number: "03",
    title: "Presentación de perfiles",
    subtitle: "Los mejores, rápido.",
    description: "Te entregamos una terna de perfiles calificados dentro de las 72 horas posteriores al Kickoff.",
  },
  {
    number: "04",
    title: "Acompañamiento 360°",
    subtitle: "De principio a fin.",
    description: "Nos mantenemos en contacto con tu equipo y candidatos durante todo el proceso de entrevistas para que todo ocurra de la forma más ágil posible.",
  },
  {
    number: "05",
    title: "Seguimiento y garantía",
    subtitle: "Seguimos ahí. Tenés respaldo.",
    description: "Acompañamos durante 30 días post-contratación. Garantía de reemplazo sin costo dentro de los 90 días.",
  },
];

const MethodologySection = () => {
  return (
    <section id="metodologia" className="py-24 lg:py-32 bg-azul-profundo text-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
            Nuestra metodología
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            ¿Cómo trabajamos?
          </h2>
          <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
            Combinamos el headhunting con un análisis profundo del mercado. No esperamos que el talento llegue, vamos a buscarlo donde realmente está.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-primary/30 z-0" />
              )}
              
              <div className="relative z-10 p-5 rounded-xl border border-primary/20 bg-background/5 backdrop-blur-sm h-full">
                <span className="font-display text-3xl font-bold text-primary/60">{step.number}</span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-1">{step.title}</h3>
                <p className="text-sm text-primary/80 font-medium mb-2">{step.subtitle}</p>
                <p className="text-sm opacity-60 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
