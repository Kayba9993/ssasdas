import { useEffect } from "react";
import { languages } from "@/data/languages";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const LanguagesPage = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  useEffect(() => {
    document.title = `${t("languages.pageTitle")} - أكاديمية اللغات`;
  }, [t]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-12" dir={dir}>
        <h1 className="text-3xl font-bold text-center mb-12 rtl">
          {t("languages.pageTitle")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {languages.map((language) => (
            <Card
              key={language.id}
              className="overflow-hidden hover:shadow-lg transition-all w-full max-w-sm"
            >
              <div className="h-40 bg-academy-green/10 flex items-center justify-center">
                <span className="text-8xl text-center leading-none flex items-center justify-center">
                  {language.flag}
                </span>
              </div>
              <CardContent className="p-6 text-center">
                <h2 className={`text-2xl font-bold mb-2 ${dir}`}>
                  {language.nativeName}
                </h2>
                <p className="text-gray-600 mb-4">
                  {dir == "rtl" ? language.name : language.nativeName}
                </p>
                <p className="text-gray-700 mb-6 rtl">
                  {t("languages.learnWith").replace(
                    "{language}",
                    dir == "rtl" ? language.name : language.nativeName
                  )}
                </p>
                <div
                  className={
                    "flex space-x-4 " +
                    ` ${dir == "rtl" ? "space-x-reverse rtl" : "ltr"}`
                  }
                >
                  <Button
                    onClick={() => navigate("/register")}
                    className="bg-academy-green hover:bg-opacity-90 flex-1"
                  >
                    {t("button.register")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/whatsapp")}
                    className="border-academy-green text-academy-green hover:bg-academy-green hover:text-white flex-1"
                  >
                    {t("button.inquiry")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LanguagesPage;
