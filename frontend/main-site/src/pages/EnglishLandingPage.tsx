import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  MessageCircle, 
  GraduationCap,
  CheckCircle,
  Globe,
  Briefcase,
  Plane,
  Phone
} from "lucide-react";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const EnglishLandingPage = () => {
  const navigate = useNavigate();
  const { dir } = useLanguage();

  useEffect(() => {
    document.title = "Learn English - Learn Academy";
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8 text-academy-green" />,
      title: "Qualified Teachers",
      description: "Live classes with experienced, professional instructors."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-academy-green" />,
      title: "Interactive Method",
      description: "No boring recordings. Just real-time learning and real conversations."
    },
    {
      icon: <Clock className="h-8 w-8 text-academy-green" />,
      title: "Flexible Schedules",
      description: "Learn anytime, from anywhere — phone, tablet, or laptop."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-academy-green" />,
      title: "Free Trial Class",
      description: "Try it out with no commitment and see how it works."
    }
  ];

  const targetAudience = [
    {
      icon: <GraduationCap className="h-6 w-6 text-academy-green" />,
      text: "Students and job seekers"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-academy-green" />,
      text: "Professionals aiming to upskill"
    },
    {
      icon: <Plane className="h-6 w-6 text-academy-green" />,
      text: "Travelers and global citizens"
    },
    {
      icon: <Globe className="h-6 w-6 text-academy-green" />,
      text: "Anyone eager to speak with confidence"
    }
  ];

  return (
    <div>
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-academy-green to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-8xl">🇺🇸</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Learn Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your first step toward mastering English starts here.
          </p>
          <div className="space-y-4 mb-8">
            <p className="text-lg">Are you looking to learn English?</p>
            <p className="text-lg">Do you want to improve your communication for work, travel, or personal goals?</p>
            <p className="text-lg">At Learn Academy, we offer a live, interactive, and personalized learning experience.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => navigate("/register")}
            >
              Start Your Free Trial Class
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4"
              onClick={() => navigate("/whatsapp")}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-academy-green">
            Why Choose Learn Academy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-academy-green">
            Who Do We Help?
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetAudience.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  {item.icon}
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-academy-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            We're here to guide you on your language journey.
          </h2>
          <p className="text-xl mb-8">
            Register now and start your free trial class.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => navigate("/register")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4"
              onClick={() => navigate("/whatsapp")}
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
          </div>
          <p className="text-lg flex items-center justify-center gap-2">
            <Phone className="h-5 w-5" />
            Our support team is ready to assist you anytime.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnglishLandingPage;