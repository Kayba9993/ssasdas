import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { availableLanguages } from '../../data/mockData';

export const LanguageCards: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="courses" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('languages.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('languages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableLanguages.map((language) => (
            <Card key={language.id} hover className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={language.image}
                  alt={language.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                  <span className="text-2xl">{language.flag}</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {language.level}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language.name}
                </h3>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{language.students} students</span>
                </div>
                
                <Button 
                  className="w-full group-hover:bg-primary-700 transition-colors"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {t('languages.startLearning')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};