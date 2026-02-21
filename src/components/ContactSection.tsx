import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-azul-profundo text-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            ¡Hagamos crecer tu equipo juntos!
          </h2>
          <p className="text-lg opacity-70 mb-10">
            Agendemos una charla breve y contanos qué necesita tu negocio hoy
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contacto@meiba.com.ar"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Mail size={18} />
              contacto@meiba.com.ar
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
            >
              <Calendar size={18} />
              Agendar en Calendly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
