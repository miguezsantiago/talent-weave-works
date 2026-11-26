import { motion } from "framer-motion";
import { Car, Cpu, Fuel, HardHat, ShoppingBag, Truck } from "lucide-react";
import { useLang } from "@/i18n";

// Mismo orden que `industries.items` en src/i18n/translations.ts.
const icons = [HardHat, ShoppingBag, Fuel, Cpu, Truck, Car];

const IndustriesSection = () => {
  const { t } = useLang();
  const items = t.industries.items.map((item, i) => ({ ...item, icon: icons[i] }));

  return (
    <section id="rubros" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
            {t.industries.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {t.industries.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.industries.body}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="w-14 h-14 mb-5 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <item.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
