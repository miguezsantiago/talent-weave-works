import { motion } from "framer-motion";
import heroImage from "@/assets/hero-team.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Decorative squares */}
      <div className="absolute top-20 right-10 w-20 h-20 border-2 border-primary/20 hidden lg:block" />
      <div className="absolute top-28 right-4 w-16 h-16 bg-foreground hidden lg:block" />

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
              Tu partner estratégico
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground mb-6">
              El talento correcto, en el momento justo.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Sabemos encontrar a las personas que tu negocio necesita. 
              Lo demás, lo conversamos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Conversemos
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
              <img
                src={heroImage}
                alt="Equipo de profesionales colaborando en una oficina moderna"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient squares */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/80" />
              <div className="absolute bottom-6 right-6 w-20 h-20 border-2 border-rosado/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
