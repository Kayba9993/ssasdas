import { Course, LiveSession, User, Quiz, Language } from '../types';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const availableLanguages = [
  {
    id: '1',
    name: 'English',
    flag: '🇬🇧',
    level: 'All Levels',
    students: 1200,
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Arabic',
    flag: '🇸🇦',
    level: 'All Levels',
    students: 800,
    image: 'https://images.pexels.com/photos/8927654/pexels-photo-8927654.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Spanish',
    flag: '🇪🇸',
    level: 'All Levels',
    students: 950,
    image: 'https://images.pexels.com/photos/804954/pexels-photo-804954.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'French',
    flag: '🇫🇷',
    level: 'All Levels',
    students: 700,
    image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'English for Beginners',
    language: 'English',
    level: 'beginner',
    teacher: 'Sarah Johnson',
    description: 'Learn English from scratch with interactive lessons and live practice sessions.',
    price: 299,
    duration: '3 months',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    students: 156,
  },
  {
    id: '2',
    title: 'Arabic Conversation',
    language: 'Arabic',
    level: 'intermediate',
    teacher: 'Ahmed Hassan',
    description: 'Improve your Arabic speaking skills through conversation practice.',
    price: 399,
    duration: '2 months',
    image: 'https://images.pexels.com/photos/8927654/pexels-photo-8927654.jpeg?auto=compress&cs=tinysrgb&w=400',
    students: 89,
  },
];

export const mockLiveSessions: LiveSession[] = [
  {
    id: '1',
    title: 'English Grammar Fundamentals',
    courseId: '1',
    teacher: 'Sarah Johnson',
    dateTime: '2025-01-20T15:00:00Z',
    platform: 'meet',
    joinUrl: 'https://meet.google.com/abc-defg-hij',
    description: 'Master the basics of English grammar in this interactive session.',
    language: 'English',
  },
  {
    id: '2',
    title: 'Arabic Pronunciation Workshop',
    courseId: '2',
    teacher: 'Ahmed Hassan',
    dateTime: '2025-01-21T16:00:00Z',
    platform: 'teams',
    joinUrl: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
    description: 'Learn proper Arabic pronunciation with native speaker guidance.',
    language: 'Arabic',
  },
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    role: 'Student',
    content: 'LanguagePro transformed my English learning journey. The live sessions are incredibly engaging!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Omar Al-Mansouri',
    role: 'Student',
    content: 'The Arabic courses are excellent. I can now speak confidently with native speakers.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    role: 'Student',
    content: 'Learning Spanish has never been this fun and interactive. Highly recommended!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const bankInfo = {
  cih: {
    name: 'CIH Bank',
    accountNumber: '230 1056410001 74',
    rib: '230 105 64100017459',
  },
  barid: {
    name: 'Barid Bank',
    accountNumber: '021 7890123456 78',
    rib: '021 789 01234567845',
  },
};