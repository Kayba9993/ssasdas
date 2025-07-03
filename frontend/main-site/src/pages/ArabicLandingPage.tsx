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

const ArabicLandingPage = () => {
  const navigate = useNavigate();
  const { dir } = useLanguage();

  useEffect(() => {
    document.title = "تعلم اللغات - أكاديمية اللغات";
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8 text-academy-green" />,
      title: "أساتذة ذوو كفاءة عالية",
      description: "دروس مباشرة (Live) بتواصل حي مع مدرّسين محترفين."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-academy-green" />,
      title: "منهج تفاعلي حديث",
      description: "لا نعتمد على فيديوهات مسجلة، بل على دروس تفاعلية حقيقية تجعلك جزءًا من الحوار."
    },
    {
      icon: <Clock className="h-8 w-8 text-academy-green" />,
      title: "مرونة في الوقت",
      description: "اختر الأوقات التي تناسبك، وتعلّم من أي جهاز وفي أي مكان."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-academy-green" />,
      title: "حصة تجريبية مجانية",
      description: "ابدأ اليوم بدون التزام، وجرّب الطريقة بنفسك."
    }
  ];

  const targetAudience = [
    {
      icon: <GraduationCap className="h-6 w-6 text-academy-green" />,
      text: "الطلبة والباحثين عن فرص أفضل"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-academy-green" />,
      text: "الموظفين الراغبين في تحسين مهاراتهم"
    },
    {
      icon: <Plane className="h-6 w-6 text-academy-green" />,
      text: "المسافرين ومحبي التواصل"
    },
    {
      icon: <Globe className="h-6 w-6 text-academy-green" />,
      text: "كل من يسعى لتعلّم لغة جديدة بثقة"
    }
  ];

  return (
    <div dir="rtl">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-academy-green to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-8xl">🇸🇦</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-arabic">
            مرحباً بكم في Learn Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-arabic">
            خطوتكم الأولى نحو إتقان اللغات الأجنبية تبدأ من هنا.
          </p>
          <div className="space-y-4 mb-8 font-arabic">
            <p className="text-lg">هل تطمح لتعلم اللغة الإنجليزية أو الإسبانية؟</p>
            <p className="text-lg">هل ترغب في تطوير مهاراتك اللغوية لأغراض مهنية، دراسية أو شخصية؟</p>
            <p className="text-lg">في Learn Academy، نقدم لكم تجربة تعليمية مباشرة، فعالة ومصممة خصيصًا لتناسب احتياجاتكم.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4 font-arabic"
              onClick={() => navigate("/register")}
            >
              ابدأ حصتك التجريبية المجانية
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4 font-arabic"
              onClick={() => navigate("/whatsapp")}
            >
              تواصل مع الدعم
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-academy-green font-arabic">
            لماذا تختار Learn Academy؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-arabic">{feature.title}</h3>
                  <p className="text-gray-600 font-arabic">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-academy-green font-arabic">
            لمن نقدم خدماتنا؟
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetAudience.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  {item.icon}
                  <span className="text-lg font-arabic">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-academy-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-arabic">
            مستعدون لمرافقتكم في رحلتكم التعليمية.
          </h2>
          <p className="text-xl mb-8 font-arabic">
            سجّل الآن وابدأ رحلتك اللغوية باحتراف.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4 font-arabic"
              onClick={() => navigate("/register")}
            >
              سجّل الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4 font-arabic"
              onClick={() => navigate("/whatsapp")}
            >
              <Phone className="h-5 w-5 ml-2" />
              تواصل مع الدعم
            </Button>
          </div>
          <p className="text-lg flex items-center justify-center gap-2 font-arabic">
            <Phone className="h-5 w-5" />
            فريق الدعم متوفر للإجابة عن جميع استفساراتكم.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArabicLandingPage;