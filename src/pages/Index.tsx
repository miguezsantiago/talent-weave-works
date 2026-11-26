import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ValuesSection from "@/components/ValuesSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import TargetSegmentSection from "@/components/TargetSegmentSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import IndustriesSection from "@/components/IndustriesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { featureFlags } from "@/config/site";
import { useLang } from "@/i18n";

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      <Seo
        title={t.seo.homeTitle}
        description={t.seo.description}
        path="/"
      />
      <Navbar />
      <HeroSection />
      {/* Prueba social oculta hasta que comercial autorice logos y testimonios.
          Para prenderla: reemplazar placeholders en SocialProofSection y pasar
          featureFlags.socialProof a true en src/config/site.ts. */}
      {featureFlags.socialProof && <SocialProofSection />}
      <ValuesSection />
      <MethodologySection />
      <ServicesSection />
      <TargetSegmentSection />
      <SpecializationsSection />
      <IndustriesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
