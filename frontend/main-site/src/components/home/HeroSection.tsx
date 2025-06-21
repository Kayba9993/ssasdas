import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-gray-50 font-semibold"
                icon={ArrowRight}
                iconPosition="right"
              >
                {t('hero.cta')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
                icon={Play}
              >
                {t('hero.watchDemo')}
              </Button>
            </div>
          </div>
          
          <div className="lg:block animate-fade-in">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Online language learning"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Live Session Active
                  </span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary-500 text-white p-3 rounded-lg shadow-lg">
                <span className="text-sm font-semibold">1200+ Students Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
    </section>
  );
};