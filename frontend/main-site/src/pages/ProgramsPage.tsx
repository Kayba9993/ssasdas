import React, { useState } from 'react';
import { Search, Filter, Users, Clock, Star, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrograms } from '../hooks/usePrograms';
import { useLanguages } from '../hooks/useLanguages';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';

export const ProgramsPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: languages } = useLanguages();
  const { data: programs, isLoading, error, refetch } = usePrograms({
    search: searchTerm,
    language_id: selectedLanguage,
    difficulty_level: selectedLevel,
  });

  // Fallback data for when API is not available
  const fallbackPrograms = [
    {
      id: '1',
      title: 'English for Beginners',
      description: 'Learn English from scratch with interactive lessons and live practice sessions.',
      difficulty_level: 'beginner',
      duration_weeks: 12,
      price: 299,
      max_students: 25,
      enrolled_students_count: 18,
      language: { name: 'English', slug: 'english' },
      teacher: { name: 'Sarah Johnson' },
      start_date: '2025-02-01',
      end_date: '2025-04-26',
    },
    {
      id: '2',
      title: 'Arabic Conversation',
      description: 'Improve your Arabic speaking skills through conversation practice.',
      difficulty_level: 'intermediate',
      duration_weeks: 8,
      price: 399,
      max_students: 20,
      enrolled_students_count: 15,
      language: { name: 'Arabic', slug: 'arabic' },
      teacher: { name: 'Ahmed Hassan' },
      start_date: '2025-02-15',
      end_date: '2025-04-12',
    },
    {
      id: '3',
      title: 'Spanish Basics',
      description: 'Start your Spanish journey with fundamental grammar and vocabulary.',
      difficulty_level: 'beginner',
      duration_weeks: 10,
      price: 349,
      max_students: 30,
      enrolled_students_count: 22,
      language: { name: 'Spanish', slug: 'spanish' },
      teacher: { name: 'Maria Rodriguez' },
      start_date: '2025-02-08',
      end_date: '2025-04-19',
    },
    {
      id: '4',
      title: 'French Advanced',
      description: 'Perfect your French with advanced grammar and literature studies.',
      difficulty_level: 'advanced',
      duration_weeks: 16,
      price: 499,
      max_students: 15,
      enrolled_students_count: 12,
      language: { name: 'French', slug: 'french' },
      teacher: { name: 'Pierre Dubois' },
      start_date: '2025-02-01',
      end_date: '2025-05-24',
    },
  ];

  const displayPrograms = programs || fallbackPrograms;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLanguageImage = (slug: string) => {
    const images: Record<string, string> = {
      english: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
      arabic: 'https://images.pexels.com/photos/8927654/pexels-photo-8927654.jpeg?auto=compress&cs=tinysrgb&w=400',
      spanish: 'https://images.pexels.com/photos/804954/pexels-photo-804954.jpeg?auto=compress&cs=tinysrgb&w=400',
      french: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=400',
    };
    return images[slug] || 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('');
    setSelectedLevel('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 dark:text-gray-300 mt-4">Loading programs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Language Programs
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover our comprehensive language learning programs designed by expert teachers
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={Filter}
            >
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <Card className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Languages</option>
                    {languages?.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <ErrorMessage 
              message="Failed to load programs. Showing sample data."
              onRetry={refetch}
            />
          </div>
        )}

        {/* Programs Grid */}
        {displayPrograms.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No programs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPrograms.map((program) => (
              <Card key={program.id} hover className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={getLanguageImage(program.language?.slug || 'english')}
                    alt={program.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty_level)}`}>
                      {program.difficulty_level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-primary-600">
                      ${program.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {program.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{program.enrolled_students_count || 0}/{program.max_students}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Teacher: {program.teacher?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Language: {program.language?.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Starts: {new Date(program.start_date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Ends: {new Date(program.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full group-hover:bg-primary-700 transition-colors"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {displayPrograms.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Programs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};