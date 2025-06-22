import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Copy,
  CheckCircle,
  CreditCard,
  Building,
  User,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@lingualive.com',
      description: 'Send us an email anytime',
      action: () => window.open('mailto:info@lingualive.com'),
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+212 600 000 000',
      description: 'Mon-Fri from 8am to 6pm',
      action: () => window.open('tel:+212600000000'),
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Casablanca, Morocco',
      description: 'Twin Center, Boulevard Zerktouni',
      action: () => window.open('https://maps.google.com/?q=Casablanca,Morocco'),
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon - Fri: 8AM - 6PM',
      description: 'Saturday: 9AM - 2PM',
      action: null,
    },
  ];

  const bankAccounts = [
    {
      bank: 'CIH Bank',
      icon: Building,
      accountNumber: '230 1056410001 74',
      rib: '230 105 64100017459',
      accountHolder: 'LinguaLive Academy',
      swift: 'CIHMMAMC',
      color: 'bg-blue-500',
    },
    {
      bank: 'Barid Bank',
      icon: CreditCard,
      accountNumber: '021 7890123456 78',
      rib: '021 789 01234567845',
      accountHolder: 'LinguaLive Academy',
      swift: 'BMCEMAMC',
      color: 'bg-green-500',
    },
  ];

  const faqItems = [
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll by selecting a course, making a payment to one of our bank accounts, and confirming via WhatsApp.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers to CIH Bank and Barid Bank. After transfer, upload your receipt and confirm via WhatsApp.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Refunds are available within 7 days of enrollment if you haven\'t attended any live sessions.',
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes! We offer special rates for groups of 3 or more students. Contact us for details.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help! Reach out to us through any of the channels below 
              or visit our office in Casablanca.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the most convenient way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="text-center group hover:shadow-lg transition-all cursor-pointer"
                onClick={info.action || undefined}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-primary-600 font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {info.description}
                </p>
              </Card>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center">
            <Card className="inline-block">
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-8 h-8 text-green-500" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Support via WhatsApp
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get instant answers to your questions
                  </p>
                </div>
                <WhatsAppButton 
                  message="Hello! I have a question about LinguaLive courses."
                  variant="success"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bank Account Information */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Information
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Make your course payments to any of our verified bank accounts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {bankAccounts.map((account, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${account.color}`}></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${account.color} text-white`}>
                      <account.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {account.bank}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {account.accountHolder}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Account Number</p>
                      <p className="font-mono text-lg text-gray-900 dark:text-white">
                        {account.accountNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.accountNumber, `account-${index}`)}
                      className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      {copiedField === `account-${index}` ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">RIB</p>
                      <p className="font-mono text-lg text-gray-900 dark:text-white">
                        {account.rib}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.rib, `rib-${index}`)}
                      className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      {copiedField === `rib-${index}` ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">SWIFT Code</p>
                      <p className="font-mono text-lg text-gray-900 dark:text-white">
                        {account.swift}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.swift, `swift-${index}`)}
                      className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      {copiedField === `swift-${index}` ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Instructions */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Payment Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>Transfer the course fee to one of the bank accounts above</li>
                  <li>Take a screenshot or photo of your transfer receipt</li>
                  <li>Send the receipt via WhatsApp with your name and course details</li>
                  <li>Our team will verify your payment within 24 hours</li>
                  <li>You'll receive access to your course dashboard once verified</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="enrollment">Course Enrollment</option>
                  <option value="payment">Payment Issue</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" className="w-full" icon={Send}>
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Located in the heart of Casablanca
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8944445!2d-7.6261!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjIiTiA3wrAzNycyOC4wIlc!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LinguaLive Office Location"
              />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};