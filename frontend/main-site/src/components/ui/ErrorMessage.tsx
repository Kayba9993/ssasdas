import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          icon={RefreshCw}
          size="sm"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};