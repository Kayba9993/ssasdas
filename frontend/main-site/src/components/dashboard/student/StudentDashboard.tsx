import React from 'react';
import { BookOpen, Calendar, FileText, CreditCard, User, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: 'Enrolled Courses', value: '3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Completed Sessions', value: '12', icon: Calendar, color: 'text-green-600' },
    { label: 'Quiz Results', value: '8', icon: FileText, color: 'text-purple-600' },
    { label: 'Progress', value: '75%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'English Grammar Review',
      time: '2:00 PM Today',
      teacher: 'Sarah Johnson',
      platform: 'Google Meet',
    },
    {
      id: '2',
      title: 'Arabic Conversation Practice',
      time: '4:00 PM Tomorrow',
      teacher: 'Ahmed Hassan',
      platform: 'Microsoft Teams',
    },
  ];

  const recentQuizzes = [
    { id: '1', title: 'English Vocabulary Test', score: 85, status: 'completed' },
    { id: '2', title: 'Arabic Grammar Quiz', score: 92, status: 'completed' },
    { id: '3', title: 'Spanish Pronunciation', score: null, status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('dashboard.student.welcome')}, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your learning progress and upcoming sessions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.student.upcomingSessions')}
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {session.time} • {session.teacher}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.platform}
                    </p>
                  </div>
                  <Button size="sm">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Quizzes */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.student.quizzes')}
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {quiz.status === 'completed' ? `Score: ${quiz.score}%` : 'Not taken yet'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {quiz.status === 'completed' ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quiz.score! >= 80 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {quiz.score! >= 80 ? 'Passed' : 'Review'}
                      </span>
                    ) : (
                      <Button size="sm">
                        Take Quiz
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="flex items-center justify-center" icon={BookOpen}>
                {t('dashboard.student.enrolledPrograms')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={Calendar}>
                {t('dashboard.student.upcomingSessions')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={FileText}>
                {t('dashboard.student.quizzes')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={CreditCard}>
                {t('dashboard.student.paymentStatus')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};