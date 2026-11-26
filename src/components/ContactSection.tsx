import { motion } from "framer-motion";
import { Mail, Calendar, MessageCircle, Linkedin, Instagram } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { siteConfig, whatsappHref } from "@/config/site";
import { trackLead } from "@/lib/analytics";
import { useLang } from "@/i18n";

const ContactSection = () => {
  const { t } = useLang();
  const whatsapp = whatsappHref(t.contact.whatsappMessage);

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
            {t.contact.title}
          </h2>
          <p className="text-lg opacity-70">
            {t.contact.body}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <LeadForm />

          {/* Canales directos. WhatsApp y agenda solo se activan con valores reales
              en el .env; si están vacíos se muestra un placeholder visible, nunca un dato inventado. */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mt-8">
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead({ method: "whatsapp" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-[#062a13] font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            ) : (
              // TODO(Santi): completar VITE_WHATSAPP_NUMBER en el .env (formato internacional, solo dígitos).
              <span
                aria-disabled="true"
                title={t.contact.channelsPending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-dashed border-background/40 text-background/60 font-medium text-sm cursor-not-allowed"
              >
                <MessageCircle size={18} />
                {t.contact.whatsappPlaceholder}
              </span>
            )}
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            )}
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
              >
                <Instagram size={18} />
                Instagram
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
            {siteConfig.calendarUrl ? (
              <a
                href={siteConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead({ method: "calendar" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
              >
                <Calendar size={18} />
                {t.contact.calendar}
              </a>
            ) : (
              // TODO(Santi): completar VITE_CALENDAR_URL en el .env (Calendly, Cal.com o Google Calendar).
              <span
                aria-disabled="true"
                title={t.contact.channelsPending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-dashed border-background/40 text-background/60 font-medium text-sm cursor-not-allowed"
              >
                <Calendar size={18} />
                {t.contact.calendarPlaceholder}
              </span>
            )}
          </div>
          {(!whatsapp || !siteConfig.calendarUrl) && (
            <p className="mt-4 text-center text-xs text-background/45 max-w-lg mx-auto">
              {t.contact.channelsPending}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
