import React, { useEffect } from 'react';
import { BookOpen, Calendar, FileText, CreditCard, User, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useApi } from '../../../hooks/useApi';
import { dashboardService } from '../../../services/dashboardService';

export const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { data: dashboardData, loading, error, refetch } = useApi(
    () => dashboardService.getStudentDashboard(),
    { immediate: true }
  );

  // Fallback data for when API is not available
  const fallbackData = {
    stats: {
      enrolled_courses: 3,
      completed_sessions: 12,
      quiz_results: 8,
      average_progress: 75,
    },
    enrollments: [],
    upcoming_sessions: [],
    recent_quizzes: [],
  };

  const data = dashboardData || fallbackData;

  const stats = [
    { label: 'Enrolled Courses', value: data.stats.enrolled_courses.toString(), icon: BookOpen, color: 'text-blue-600' },
    { label: 'Completed Sessions', value: data.stats.completed_sessions.toString(), icon: Calendar, color: 'text-green-600' },
    { label: 'Quiz Results', value: data.stats.quiz_results.toString(), icon: FileText, color: 'text-purple-600' },
    { label: 'Progress', value: `${data.stats.average_progress}%`, icon: TrendingUp, color: 'text-orange-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              {error && (
                <button
                  onClick={refetch}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Retry
                </button>
              )}
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={user?.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              Unable to load dashboard data. Showing sample data.
            </p>
          </div>
        )}

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
              {data.upcoming_sessions.length > 0 ? (
                data.upcoming_sessions.map((session: any) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {session.scheduled_at} • {session.teacher?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session.meeting_platform || 'Online'}
                      </p>
                    </div>
                    <Button size="sm">
                      Join
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    No upcoming sessions scheduled
                  </p>
                </div>
              )}
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
              {data.recent_quizzes.length > 0 ? (
                data.recent_quizzes.map((quiz: any) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {quiz.quiz?.title || 'Quiz'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {quiz.submitted_at ? `Score: ${quiz.percentage}%` : 'Not taken yet'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quiz.submitted_at ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quiz.is_passed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {quiz.is_passed ? 'Passed' : 'Review'}
                        </span>
                      ) : (
                        <Button size="sm">
                          Take Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    No quizzes available
                  </p>
                </div>
              )}
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