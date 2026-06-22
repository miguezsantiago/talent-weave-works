import { motion } from "framer-motion";
import { Mail, Calendar, MessageCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { siteConfig, whatsappHref } from "@/config/site";
import { trackLead } from "@/lib/analytics";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-azul-profundo text-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            La mejor contratación empieza con una conversación.
          </h2>
          <p className="text-lg opacity-70">
            Dejanos tus datos y un especialista te contacta. O escribinos directo por el canal que prefieras.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <LeadForm />

          {/* Canales directos */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead({ method: "whatsapp" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-[#062a13] font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              onClick={() => trackLead({ method: "email" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
            >
              <Mail size={18} />
              {siteConfig.contactEmail}
            </a>
            {siteConfig.calendarUrl && (
              <a
                href={siteConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead({ method: "calendar" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
              >
                <Calendar size={18} />
                Agendar una charla
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
