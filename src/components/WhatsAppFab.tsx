import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";
import { trackLead } from "@/lib/analytics";

/**
 * Botón flotante de WhatsApp (esquina inferior derecha).
 * Solo se renderiza si hay un número configurado en el .env.
 */
const WhatsAppFab = () => {
  if (!whatsappHref) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead({ method: "whatsapp_fab" })}
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppFab;
