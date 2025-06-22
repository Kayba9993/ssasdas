
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LanguagesList from "@/components/home/LanguagesList";
import Testimonials from "@/components/home/Testimonials";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const Index = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <LanguagesList />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
