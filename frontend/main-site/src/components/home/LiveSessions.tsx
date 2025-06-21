import React from 'react';
import { Calendar, Clock, Video, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockLiveSessions } from '../../data/mockData';

export const LiveSessions: React.FC = () => {
  const { t } = useLanguage();

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const getPlatformIcon = (platform: 'meet' | 'teams') => {
    return platform === 'meet' ? '🎥' : '👥';
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('liveSessions.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('liveSessions.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {mockLiveSessions.map((session) => {
            const { date, time } = formatDateTime(session.dateTime);
            
            return (
              <Card key={session.id} className="group hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {session.description}
                    </p>
                  </div>
                  <div className="text-2xl ml-4">
                    {getPlatformIcon(session.platform)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="text-sm">{date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="text-sm">{time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="text-sm">{session.teacher}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Video className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="text-sm capitalize">{session.platform}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1">
                    {t('liveSessions.joinNow')}
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            {t('liveSessions.seeAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};