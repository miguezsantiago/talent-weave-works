import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValuesSection />
      <MethodologySection />
      <ServicesSection />
      <SpecializationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
