import React from 'react';
import { BookOpen, Users, FileText, Calendar, Plus, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const TeacherDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: 'Active Courses', value: '5', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Students', value: '124', icon: Users, color: 'text-green-600' },
    { label: 'Scheduled Sessions', value: '8', icon: Calendar, color: 'text-purple-600' },
    { label: 'Quizzes Created', value: '15', icon: FileText, color: 'text-orange-600' },
  ];

  const recentSessions = [
    {
      id: '1',
      title: 'English Grammar Fundamentals',
      students: 12,
      time: '2:00 PM Today',
      platform: 'Google Meet',
    },
    {
      id: '2',
      title: 'Advanced Conversation Practice',
      students: 8,
      time: '4:00 PM Tomorrow',
      platform: 'Microsoft Teams',
    },
  ];

  const courses = [
    { id: '1', title: 'English for Beginners', students: 45, completion: 78 },
    { id: '2', title: 'Business English', students: 32, completion: 65 },
    { id: '3', title: 'IELTS Preparation', students: 28, completion: 82 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('dashboard.teacher.welcome')}, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your courses and track student progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button icon={Plus}>
                Create Session
              </Button>
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
          {/* Recent Sessions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upcoming Sessions
              </h2>
              <Button variant="outline" size="sm" icon={Plus}>
                Schedule New
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {session.time} • {session.students} students
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.platform}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm">
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Course Performance */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.teacher.myCourses')}
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {course.students} students
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {course.completion}% average completion
                  </p>
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
              <Button className="flex items-center justify-center" icon={Plus}>
                {t('dashboard.teacher.createQuiz')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={Calendar}>
                {t('dashboard.teacher.scheduleSessions')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={Users}>
                {t('dashboard.teacher.studentTracking')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={TrendingUp}>
                View Analytics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};