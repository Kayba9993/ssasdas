import React from 'react';
import { 
  Users, 
  Award, 
  Globe, 
  BookOpen, 
  Target, 
  Heart,
  CheckCircle,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStats } from '../hooks/useStats';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const { data: stats, isLoading: statsLoading } = useStats();

  const values = [
    {
      icon: Target,
      title: 'Excellence in Education',
      description: 'We strive to provide the highest quality language education with certified native speakers and proven methodologies.',
    },
    {
      icon: Heart,
      title: 'Student-Centered Approach',
      description: 'Every student is unique. We tailor our teaching methods to match individual learning styles and goals.',
    },
    {
      icon: Globe,
      title: 'Cultural Understanding',
      description: 'Language learning goes beyond words. We help students understand and appreciate different cultures.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our platform and teaching methods to incorporate the latest educational technologies.',
    },
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Native Teachers',
      description: 'Learn from certified native speakers with years of teaching experience.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose from morning, afternoon, or evening sessions that fit your lifestyle.',
    },
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Engage in live conversations, interactive exercises, and real-world scenarios.',
    },
    {
      icon: Award,
      title: 'Recognized Certificates',
      description: 'Earn certificates that are recognized by employers and educational institutions.',
    },
  ];

  const achievements = [
    { number: stats?.total_students || 2456, label: 'Happy Students', suffix: '+' },
    { number: stats?.total_teachers || 45, label: 'Expert Teachers' },
    { number: stats?.active_programs || 120, label: 'Active Programs' },
    { number: stats?.success_rate || 95, label: 'Success Rate', suffix: '%' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About LinguaLive
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Empowering global communication through innovative language learning experiences. 
              We connect passionate learners with expert teachers in live, interactive sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At LinguaLive, we believe that language learning should be engaging, accessible, and effective. 
                Our mission is to break down language barriers and connect people from different cultures 
                through the power of live, interactive education.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We combine cutting-edge technology with proven teaching methodologies to create an 
                immersive learning environment where students can practice real conversations with 
                native speakers and build confidence in their target language.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning together"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Student Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at LinguaLive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose LinguaLive?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what makes our language learning platform unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          {statsLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" className="border-white border-t-primary-300" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {achievement.number.toLocaleString()}{achievement.suffix}
                  </div>
                  <div className="text-primary-100 font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate educators and technology experts working together to revolutionize language learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Head of Education',
                image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
                bio: 'PhD in Applied Linguistics with 15+ years of teaching experience',
              },
              {
                name: 'Ahmed Hassan',
                role: 'Lead Arabic Instructor',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
                bio: 'Native Arabic speaker and certified language instructor',
              },
              {
                name: 'Maria Rodriguez',
                role: 'Spanish Program Director',
                image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
                bio: 'Specialized in conversational Spanish and cultural immersion',
              },
            ].map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their lives through language learning with LinguaLive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Learning Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};