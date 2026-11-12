import { useLang } from "@/i18n";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-8 bg-azul-profundo border-t border-primary/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-bold text-background/80">
          meiba<span className="text-xs align-super">®</span>{" "}
          <span className="font-body font-normal text-sm">Talent</span>
        </div>
        <p className="text-sm text-background/40">
          © {new Date().getFullYear()} Meiba Talent. {t.footer.location}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
