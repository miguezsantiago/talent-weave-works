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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Meiba Talent | Headhunting en Argentina: tech, comercial, marketing y logística"
        description="Meiba Talent arma equipos de tecnología, comercial, marketing y logística en Argentina. Headhunting ágil, humano y estratégico. Primera terna en 72hs."
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
