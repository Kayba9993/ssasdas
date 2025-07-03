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

const SpanishLandingPage = () => {
  const navigate = useNavigate();
  const { dir } = useLanguage();

  useEffect(() => {
    document.title = "Aprende Español - Learn Academy";
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8 text-academy-green" />,
      title: "Profesores Calificados",
      description: "Clases en vivo con docentes experimentados y profesionales."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-academy-green" />,
      title: "Método Interactivo",
      description: "Nada de grabaciones aburridas. Aquí participas, hablas y aprendes en tiempo real."
    },
    {
      icon: <Clock className="h-8 w-8 text-academy-green" />,
      title: "Horarios Flexibles",
      description: "Aprende cuando quieras, desde tu móvil o computadora."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-academy-green" />,
      title: "Clase de Prueba Gratuita",
      description: "Comienza sin compromiso y evalúa por ti mismo."
    }
  ];

  const targetAudience = [
    {
      icon: <GraduationCap className="h-6 w-6 text-academy-green" />,
      text: "Estudiantes y profesionales"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-academy-green" />,
      text: "Personas que trabajan en ambientes internacionales"
    },
    {
      icon: <Plane className="h-6 w-6 text-academy-green" />,
      text: "Personas que viajan"
    },
    {
      icon: <Globe className="h-6 w-6 text-academy-green" />,
      text: "Todos los que desean hablar con confianza"
    }
  ];

  return (
    <div>
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-academy-green to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-8xl">🇪🇸</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a Learn Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Tu primer paso hacia dominar el español comienza aquí.
          </p>
          <div className="space-y-4 mb-8">
            <p className="text-lg">¿Te gustaría aprender español?</p>
            <p className="text-lg">¿Deseas mejorar tu comunicación para estudios, trabajo o viajes?</p>
            <p className="text-lg">En Learn Academy, te ofrecemos una experiencia de aprendizaje interactiva y personalizada en clases en vivo.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => navigate("/register")}
            >
              Comienza tu Clase Gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4"
              onClick={() => navigate("/whatsapp")}
            >
              Contactar Soporte
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-academy-green">
            ¿Por qué elegir Learn Academy?
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
            ¿A quiénes ayudamos?
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

      {/* Special CTA Section for Spanish */}
      <div className="py-16 bg-gradient-to-r from-red-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🇪🇸 Aprende español con clases en vivo 💬
          </h2>
          <p className="text-xl mb-8">
            Empieza a hablar desde el primer día
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">📚</span>
              <span>Clases 100% en vivo</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🧠</span>
              <span>Método conversacional</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⏰</span>
              <span>Horarios flexibles</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🎁</span>
              <span>¡Primera clase GRATIS!</span>
            </div>
          </div>
          <p className="text-lg mb-6">
            Miles de estudiantes ya están aprendiendo con nosotros.
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 mb-4"
            onClick={() => navigate("/register")}
          >
            ¡Inscríbete ahora y da el primer paso!
          </Button>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 bg-academy-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Estamos aquí para ayudarte en tu camino.
          </h2>
          <p className="text-xl mb-8">
            Inscríbete hoy y empieza tu clase gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-academy-green hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => navigate("/register")}
            >
              Inscríbete Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-academy-green text-lg px-8 py-4"
              onClick={() => navigate("/whatsapp")}
            >
              <Phone className="h-5 w-5 mr-2" />
              Contactar Soporte
            </Button>
          </div>
          <p className="text-lg flex items-center justify-center gap-2">
            <Phone className="h-5 w-5" />
            Nuestro equipo de soporte está disponible para cualquier consulta.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpanishLandingPage;