import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  return (
    <div
      className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content - properly ordered for RTL */}
          <div
            className={`order-2 md:order-1 ${
              dir === "rtl" ? "md:order-2 text-right" : "md:order-1 text-left"
            }`}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 text-academy-green leading-tight ${
                dir === "rtl" ? "font-arabic" : ""
              }`}
            >
              {t("hero.title")}
            </h1>
            <p
              className={`text-lg md:text-xl mb-6 text-gray-700 leading-relaxed ${
                dir === "rtl" ? "font-arabic" : ""
              }`}
            >
              {t("hero.description1")}
            </p>
            <p
              className={`text-lg md:text-xl mb-8 text-gray-700 leading-relaxed ${
                dir === "rtl" ? "font-arabic" : ""
              }`}
            >
              {t("hero.description2")}
            </p>

            {/* Fixed button alignment and spacing */}
            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                dir === "rtl" ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Button
                className={`bg-academy-green hover:bg-opacity-90 px-8 py-6 text-lg font-medium transition-all duration-200 ${
                  dir === "rtl" ? "font-arabic" : ""
                }`}
                onClick={() => navigate("/register")}
              >
                {t("button.register")}
              </Button>
              <Button
                variant="outline"
                className={`border-2 border-academy-green text-academy-green hover:bg-academy-green hover:text-white px-8 py-6 text-lg font-medium transition-all duration-200 ${
                  dir === "rtl" ? "font-arabic" : ""
                }`}
                onClick={() => navigate("/professors")}
              >
                {t("button.meetProfessors")}
              </Button>
            </div>
          </div>

          {/* Image - properly ordered for RTL */}
          <div
            className={`order-1 md:order-2 ${
              dir === "rtl" ? "md:order-1" : "md:order-2"
            }`}
          >
            <img
              src="/lovable-uploads/8f1fccaa-5cce-4888-a54d-fe66266e441a.png"
              alt={t("hero.imageAlt") || "Language Course"}
              className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;