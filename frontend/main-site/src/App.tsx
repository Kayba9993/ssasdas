import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { HeroSection } from './components/home/HeroSection';
import { LanguageCards } from './components/home/LanguageCards';
import { LiveSessions } from './components/home/LiveSessions';
import { StatsSection } from './components/home/StatsSection';
import { Testimonials } from './components/home/Testimonials';
import { FAQSection } from './components/home/FAQSection';
import { PaymentOptions } from './components/payment/PaymentOptions';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { StudentDashboard } from './components/dashboard/student/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/teacher/TeacherDashboard';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { queryClient } from './lib/react-query';

type ViewType = 'home' | 'about' | 'contact' | 'payment' | 'login' | 'register' | 'dashboard';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Show dashboard if user is authenticated
  if (isAuthenticated && user) {
    if (user.role === 'student') {
      return <StudentDashboard />;
    } else if (user.role === 'teacher') {
      return <TeacherDashboard />;
    } else if (user.role === 'admin') {
      return <AdminDashboard />;
    }
  }

  // Show login page
  if (currentView === 'login') {
    return (
      <LoginPage 
        onBack={() => setCurrentView('home')}
      />
    );
  }

  // Show register page
  if (currentView === 'register') {
    return (
      <RegisterPage 
        onBack={() => setCurrentView('home')}
        onLogin={() => setCurrentView('login')}
      />
    );
  }

  // Show about page
  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <AboutPage />
        <Footer />
        <WhatsAppButton fixed />
      </div>
    );
  }

  // Show contact page
  if (currentView === 'contact') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <ContactPage />
        <Footer />
        <WhatsAppButton fixed />
      </div>
    );
  }

  // Show payment page
  if (currentView === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <PaymentOptions />
        <Footer />
        <WhatsAppButton fixed />
      </div>
    );
  }

  // Default homepage
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <HeroSection />
      <LanguageCards />
      <LiveSessions />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <Footer />
      <WhatsAppButton fixed />
      
      {/* Demo Navigation Panel */}
      <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Quick Navigation</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCurrentView('about')}
            className="block w-full text-left px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded"
          >
            About Page
          </button>
          <button
            onClick={() => setCurrentView('contact')}
            className="block w-full text-left px-3 py-1 text-xs bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded"
          >
            Contact Page
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className="block w-full text-left px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded"
          >
            Login Page
          </button>
          <button
            onClick={() => setCurrentView('register')}
            className="block w-full text-left px-3 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-800 dark:text-green-300 rounded"
          >
            Register Page
          </button>
          <button
            onClick={() => setCurrentView('payment')}
            className="block w-full text-left px-3 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded"
          >
            Payment Page
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;