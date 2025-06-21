import React, { useEffect, useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { languageService, Language } from '../../services/languageService';
import { useApi } from '../../hooks/useApi';

export const LanguageCards: React.FC = () => {
  const { t } = useLanguage();
  const { data: languages, loading, error } = useApi(() => languageService.getLanguages());

  // Fallback data for when API is not available
  const fallbackLanguages = [
    {
      id: '1',
      name: 'English',
      slug: 'english',
      description: 'Learn English from beginner to advanced level',
      icon: '🇬🇧',
      difficulty_level: 'beginner' as const,
      programs_count: 12,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '2',
      name: 'Arabic',
      slug: 'arabic',
      description: 'Master Arabic with comprehensive courses',
      icon: '🇸🇦',
      difficulty_level: 'intermediate' as const,
      programs_count: 8,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '3',
      name: 'Spanish',
      slug: 'spanish',
      description: 'Learn Spanish systematically',
      icon: '🇪🇸',
      difficulty_level: 'beginner' as const,
      programs_count: 10,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '4',
      name: 'French',
      slug: 'french',
      description: 'Master French language skills',
      icon: '🇫🇷',
      difficulty_level: 'intermediate' as const,
      programs_count: 7,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
  ];

  const displayLanguages = languages || fallbackLanguages;

  const getLanguageImage = (slug: string) => {
    const images: Record<string, string> = {
      english: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
      arabic: 'https://images.pexels.com/photos/8927654/pexels-photo-8927654.jpeg?auto=compress&cs=tinysrgb&w=400',
      spanish: 'https://images.pexels.com/photos/804954/pexels-photo-804954.jpeg?auto=compress&cs=tinysrgb&w=400',
      french: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=400',
    };
    return images[slug] || 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  if (loading) {
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
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-600 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 dark:text-red-400">
              Failed to load languages. Showing sample data.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayLanguages.map((language) => (
            <Card key={language.id} hover className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={getLanguageImage(language.slug)}
                  alt={language.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                  <span className="text-2xl">{language.icon || '🌍'}</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {language.difficulty_level}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language.name}
                </h3>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{language.programs_count || 0} programs</span>
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