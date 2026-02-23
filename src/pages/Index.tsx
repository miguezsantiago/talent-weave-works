import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";
import MethodologySection from "@/components/MethodologySection";
import TargetSegmentSection from "@/components/TargetSegmentSection";
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
      <TargetSegmentSection />
      <SpecializationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
