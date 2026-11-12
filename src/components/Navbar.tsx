import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/i18n";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, path } = useLang();

  const navItems = [
    { label: t.nav.about, href: path("/#valores") },
    { label: t.nav.methodology, href: path("/#metodologia") },
    { label: t.nav.services, href: path("/#servicios") },
    { label: t.nav.specializations, href: path("/#especialidades") },
    { label: t.nav.blog, href: path("/blog") },
  ];
  const contactHref = path("/#contacto");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={path("/")} className="font-display text-2xl font-bold tracking-tight text-foreground">
          meiba<span className="text-xs align-super">®</span>{" "}
          <span className="font-body font-normal text-lg">Talent</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contactHref}
              className="text-sm font-medium px-5 py-2.5 rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all"
            >
              {t.nav.contact}
            </a>
          </div>

          <LanguageToggle />

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label={t.nav.toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={contactHref}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium px-5 py-2.5 rounded-full border border-foreground text-foreground text-center hover:bg-foreground hover:text-background transition-all"
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
