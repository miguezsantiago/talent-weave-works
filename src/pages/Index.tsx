import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import TargetSegmentSection from "@/components/TargetSegmentSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
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
      <ValuesSection />
      <MethodologySection />
      <ServicesSection />
      <TargetSegmentSection />
      <SpecializationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
