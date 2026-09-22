import { motion } from "framer-motion";

// Logos en public/logos/. `size` ajusta la altura para que todos pesen parecido
// (los logos cuadrados necesitan más alto que los horizontales).
// Sin logo, se muestra el nombre como wordmark.
const clients: { name: string; logo?: string; size?: string }[] = [
  { name: "Fiat", logo: "/logos/fiat.svg", size: "h-10 md:h-12" },
  { name: "Marriott", logo: "/logos/marriott.svg", size: "h-12 md:h-14" },
  { name: "OSDE", logo: "/logos/osde.png", size: "h-9 md:h-11" },
  { name: "Citroën", logo: "/logos/citroen.png", size: "h-12 md:h-14" },
  { name: "Omoda & Jaecoo", logo: "/logos/omoda-jaecoo.png", size: "h-5 md:h-6" },
];

// Con pocas marcas, se repite la lista para que la cinta cubra todo el ancho.
const track = Array.from({ length: 2 }, () => clients).flat();

const ClientLogo = ({ name, logo, size = "h-10" }: { name: string; logo?: string; size?: string }) => (
  <div className="flex items-center justify-center h-20 px-10 md:px-14 shrink-0">
    {logo ? (
      <img
        src={logo}
        alt={name}
        className={`${size} w-auto object-contain`}
        loading="lazy"
      />
    ) : (
      <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground/50 hover:text-primary transition-colors whitespace-nowrap">
        {name}
      </span>
    )}
  </div>
);

const ClientsSection = () => {
  return (
    <section id="clientes" className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium text-primary tracking-widest uppercase text-center mb-10"
        >
          Marcas que confían en nosotros
        </motion.p>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {track.map((client, i) => (
                <ClientLogo key={`${copy}-${i}`} {...client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
