import { Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLang } from "@/i18n";

type Variant = "light" | "dark";

type Props = {
  variant?: Variant;
  className?: string;
};

const ICONS = [
  { key: "linkedin" as const, href: siteConfig.social.linkedin, Icon: Linkedin },
  { key: "instagram" as const, href: siteConfig.social.instagram, Icon: Instagram },
];

/**
 * LinkedIn e Instagram, con las URLs que ya están en src/config/site.ts.
 * Solo renderiza un enlace si la URL está definida.
 */
const SocialLinks = ({ variant = "light", className = "" }: Props) => {
  const { t } = useLang();
  const links = ICONS.filter((item) => Boolean(item.href));
  if (links.length === 0) return null;

  const color =
    variant === "dark"
      ? "text-background/70 hover:text-background"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.social[key]}
          className={`inline-flex items-center justify-center transition-colors ${color}`}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
