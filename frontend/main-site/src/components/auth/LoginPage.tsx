import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LoginPageProps {
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const { login, loading, error } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      // Navigation will be handled by the auth context and App component
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Demo login function
  const handleDemoLogin = async (email: string, password: string = 'password') => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('auth.backToHome')}
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-10 h-10 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
              LinguaLive
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('auth.welcomeBack')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">
                {error.message}
              </p>
              {error.errors && (
                <ul className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {Object.entries(error.errors).map(([field, messages]) => (
                    <li key={field}>
                      {Array.isArray(messages) ? messages.join(', ') : messages}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={t('auth.passwordPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {t('auth.rememberMe')}
                </span>
              </label>
              
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.signIn')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('auth.noAccount')}{' '}
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                {t('auth.signUp')}
              </button>
            </p>
          </div>
        </Card>

        {/* Demo Login Options */}
        <Card className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white text-center">
            {t('auth.demoLogin')}
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handleDemoLogin('student@demo.com')}
              disabled={loading}
              className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-lg transition-colors disabled:opacity-50"
            >
              {t('auth.loginAsStudent')}
            </button>
            <button
              onClick={() => handleDemoLogin('teacher@demo.com')}
              disabled={loading}
              className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-800 dark:text-green-300 rounded-lg transition-colors disabled:opacity-50"
            >
              {t('auth.loginAsTeacher')}
            </button>
            <button
              onClick={() => handleDemoLogin('admin@demo.com')}
              disabled={loading}
              className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-lg transition-colors disabled:opacity-50"
            >
              {t('auth.loginAsAdmin')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};