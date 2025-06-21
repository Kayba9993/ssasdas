import React, { useState } from 'react';
import { CheckCircle, Upload, Copy, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { bankInfo } from '../../data/mockData';

export const PaymentOptions: React.FC = () => {
  const { t } = useLanguage();
  const [selectedBank, setSelectedBank] = useState<'cih' | 'barid' | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('payment.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('payment.subtitle')}
          </p>
        </div>

        {/* Bank Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* CIH Bank */}
          <Card 
            className={`cursor-pointer transition-all ${
              selectedBank === 'cih' 
                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedBank('cih')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                {t('payment.cihBank')}
              </h3>
              {selectedBank === 'cih' && (
                <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                  {t('payment.bankSelected')}
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{t('payment.accountNumber')}:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{bankInfo.cih.accountNumber}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(bankInfo.cih.accountNumber);
                    }}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{t('payment.rib')}:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{bankInfo.cih.rib}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(bankInfo.cih.rib);
                    }}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Barid Bank */}
          <Card 
            className={`cursor-pointer transition-all ${
              selectedBank === 'barid' 
                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedBank('barid')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                {t('payment.baridBank')}
              </h3>
              {selectedBank === 'barid' && (
                <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                  {t('payment.bankSelected')}
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{t('payment.accountNumber')}:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{bankInfo.barid.accountNumber}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(bankInfo.barid.accountNumber);
                    }}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{t('payment.rib')}:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{bankInfo.barid.rib}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(bankInfo.barid.rib);
                    }}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Proof Upload */}
        {selectedBank && (
          <Card className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('payment.uploadProof')}
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Drop your payment proof here or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="payment-proof"
              />
              <label
                htmlFor="payment-proof"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
              >
                Choose File
              </label>
              
              {paymentProof && (
                <div className="mt-4 text-green-600">
                  ✓ File uploaded: {paymentProof.name}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* WhatsApp Confirmation */}
        {selectedBank && (
          <Card className="text-center">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                ⚠️ {t('payment.paymentNotice')}
              </p>
            </div>
            
            <WhatsAppButton
              message={`Hello, I have transferred the payment for the course. Bank: ${selectedBank === 'cih' ? 'CIH Bank' : 'Barid Bank'}`}
              variant="success"
              className="text-lg px-8 py-4"
            >
              {t('payment.confirmPayment')}
            </WhatsAppButton>
          </Card>
        )}
      </div>
    </section>
  );
};