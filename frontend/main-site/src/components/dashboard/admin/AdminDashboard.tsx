import React from 'react';
import { Users, BookOpen, CreditCard, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '2,456', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Courses', value: '45', icon: BookOpen, color: 'text-green-600', change: '+5%' },
    { label: 'Pending Payments', value: '23', icon: CreditCard, color: 'text-orange-600', change: '-8%' },
    { label: 'System Health', value: '99.9%', icon: TrendingUp, color: 'text-purple-600', change: '+0.1%' },
  ];

  const pendingPayments = [
    { id: '1', student: 'John Doe', course: 'English Basics', amount: '$299', date: '2025-01-15' },
    { id: '2', student: 'Maria Garcia', course: 'Spanish Advanced', amount: '$399', date: '2025-01-14' },
    { id: '3', student: 'Ahmed Ali', course: 'Arabic Conversation', amount: '$349', date: '2025-01-13' },
  ];

  const recentActivities = [
    { id: '1', type: 'user', message: 'New teacher Sarah Johnson registered', time: '2 hours ago' },
    { id: '2', type: 'course', message: 'Course "French Basics" was updated', time: '4 hours ago' },
    { id: '3', type: 'payment', message: 'Payment verified for John Smith', time: '6 hours ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('dashboard.admin.welcome')}, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor platform performance and manage system settings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button icon={Settings}>
                System Settings
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {stat.label}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Payments */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.admin.paymentVerification')}
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {payment.student}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {payment.course} • {payment.amount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Submitted: {payment.date}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                    <Button size="sm">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
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
              <Button className="flex items-center justify-center" icon={Users}>
                {t('dashboard.admin.userManagement')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={BookOpen}>
                {t('dashboard.admin.programManagement')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={CreditCard}>
                {t('dashboard.admin.paymentVerification')}
              </Button>
              <Button variant="outline" className="flex items-center justify-center" icon={Settings}>
                {t('dashboard.admin.settings')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};