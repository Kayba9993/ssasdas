import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStats } from '../../hooks/useStats';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface StatItem {
  icon: React.ComponentType<any>;
  value: number;
  label: string;
  suffix?: string;
}

export const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  const { data: statsData, isLoading } = useStats();
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const stats: StatItem[] = [
    { icon: Users, value: statsData?.total_students || 2456, label: t('stats.students'), suffix: '+' },
    { icon: BookOpen, value: statsData?.active_programs || 45, label: t('stats.courses') },
    { icon: Award, value: statsData?.certificates_issued || 1890, label: t('stats.certificates'), suffix: '+' },
    { icon: Globe, value: statsData?.total_languages || 12, label: t('stats.languages') },
  ];

  useEffect(() => {
    if (!statsData && !isLoading) return;

    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });
        }, 30);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [statsData, isLoading]);

  return (
    <section id="stats-section" className="py-16 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner size="lg" className="border-white border-t-primary-300" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  {animatedValues[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-primary-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};