import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface WhatsAppButtonProps {
  message?: string;
  fixed?: boolean;
  variant?: 'primary' | 'success';
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Hello, I need help with the language learning platform',
  fixed = false,
  variant = 'success',
  className = '',
}) => {
  const { t } = useLanguage();
  const phoneNumber = '212600000000'; // Replace with actual WhatsApp number

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg hover:shadow-xl';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
  };

  const fixedClasses = fixed 
    ? 'fixed bottom-6 right-6 z-50 w-14 h-14 animate-pulse-slow' 
    : 'px-4 py-2';

  return (
    <button
      onClick={openWhatsApp}
      className={`${baseClasses} ${variantClasses[variant]} ${fixedClasses} ${className}`}
      title={t('common.support')}
    >
      <MessageCircle className={fixed ? 'w-6 h-6' : 'w-5 h-5 mr-2'} />
      {!fixed && t('common.support')}
    </button>
  );
};