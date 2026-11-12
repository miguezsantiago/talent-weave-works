import { Link, useLocation } from "react-router-dom";
import { LANGS, storeLang, switchLangPath, useLang } from "@/i18n";

/**
 * Selector ES | EN. Lleva a la misma página en el otro idioma y recuerda la
 * elección para las próximas visitas.
 */
const LanguageToggle = () => {
  const { lang, t } = useLang();
  const location = useLocation();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-full border border-border p-0.5 text-xs font-medium"
    >
      {LANGS.map((code) =>
        code === lang ? (
          <span
            key={code}
            aria-current="true"
            className="px-2.5 py-1 rounded-full bg-foreground text-background uppercase"
          >
            {code}
          </span>
        ) : (
          <Link
            key={code}
            to={switchLangPath(location.pathname, code) + location.search + location.hash}
            onClick={() => storeLang(code)}
            hrefLang={code}
            aria-label={t.nav.switchTo[code]}
            className="px-2.5 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors uppercase"
          >
            {code}
          </Link>
        ),
      )}
    </div>
  );
};

export default LanguageToggle;
