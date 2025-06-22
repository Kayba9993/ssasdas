import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher',
    language: 'english',
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/payment');
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('auth.firstName')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('auth.lastName')}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

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
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('auth.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="+212 6XX XXX XXX"
        />
      </div>

      <Button onClick={handleNextStep} className="w-full">
        {t('auth.continue')}
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('auth.selectRole')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`cursor-pointer p-4 border-2 rounded-lg transition-colors ${
            formData.role === 'student' 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
          }`}>
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === 'student'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-medium text-gray-900 dark:text-white">{t('auth.student')}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('auth.studentDesc')}</div>
            </div>
          </label>
          
          <label className={`cursor-pointer p-4 border-2 rounded-lg transition-colors ${
            formData.role === 'teacher' 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
          }`}>
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={formData.role === 'teacher'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-2xl mb-2">👩‍🏫</div>
              <div className="font-medium text-gray-900 dark:text-white">{t('auth.teacher')}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('auth.teacherDesc')}</div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('auth.preferredLanguage')}
        </label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="english">English</option>
          <option value="arabic">العربية</option>
          <option value="spanish">Español</option>
          <option value="french">Français</option>
        </select>
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('auth.confirmPassword')}
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={handlePrevStep} className="flex-1">
          {t('auth.back')}
        </Button>
        <Button onClick={handleNextStep} className="flex-1">
          {t('auth.continue')}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('auth.almostDone')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t('auth.reviewAndConfirm')}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">{t('auth.name')}:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formData.firstName} {formData.lastName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">{t('auth.email')}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">{t('auth.role')}:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formData.role === 'student' ? t('auth.student') : t('auth.teacher')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            required
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
            {t('auth.agreeTerms')}{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              {t('auth.termsOfService')}
            </a>{' '}
            {t('auth.and')}{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              {t('auth.privacyPolicy')}
            </a>
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeMarketing"
            checked={formData.agreeMarketing}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
            {t('auth.agreeMarketing')}
          </span>
        </label>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={handlePrevStep} className="flex-1">
          {t('auth.back')}
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1"
          disabled={!formData.agreeTerms || isLoading}
        >
          {isLoading ? t('common.loading') : t('auth.createAccount')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('auth.backToHome')}
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-10 h-10 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
              LinguaLive
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('auth.createAccount')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('auth.haveAccount')}{' '}
              <Link 
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};