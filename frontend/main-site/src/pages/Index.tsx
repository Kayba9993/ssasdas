import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LanguagesList from "@/components/home/LanguagesList";
import Testimonials from "@/components/home/Testimonials";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Teachers from "@/components/home/Teachers";

const Index = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('nav.home')} - أكاديمية اللغات`;
  }, [t]);

  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <LanguagesList />
      <Teachers />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;