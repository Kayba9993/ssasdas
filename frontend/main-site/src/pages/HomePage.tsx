import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LanguageCards } from '../components/home/LanguageCards';
import { StatsSection } from '../components/home/StatsSection';
import { Testimonials } from '../components/home/Testimonials';
import { FAQSection } from '../components/home/FAQSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <LanguageCards />
      <StatsSection />
      <Testimonials />
      <FAQSection />
    </>
  );
};