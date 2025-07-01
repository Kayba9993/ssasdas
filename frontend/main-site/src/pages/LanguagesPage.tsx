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
    <div dir={dir}>
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        {/* Fixed page title alignment and typography */}
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            dir === "rtl" ? "font-arabic" : ""
          }`}
        >
          {t("languages.pageTitle")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {languages.map((language) => (
            <Card
              key={language.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-sm"
            >
              {/* Flag section with better spacing */}
              <div className="h-40 bg-academy-green/10 flex items-center justify-center p-4">
                <span className="text-6xl md:text-7xl text-center leading-none">
                  {language.flag}
                </span>
              </div>

              <CardContent className="p-6">
                {/* Fixed text alignment and typography consistency */}
                <div
                  className={`${dir === "rtl" ? "text-right" : "text-left"}`}
                >
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      dir === "rtl" ? "font-arabic" : ""
                    }`}
                  >
                    {dir === "rtl" ? language.name : language.nativeName}
                  </h2>
                  <p
                    className={`text-gray-600 mb-4 text-lg ${
                      dir === "rtl" ? "font-arabic" : ""
                    }`}
                  >
                    {dir === "rtl" ? language.nativeName : language.name}
                  </p>
                  <p
                    className={`text-gray-700 mb-6 leading-relaxed ${
                      dir === "rtl" ? "font-arabic" : ""
                    }`}
                  >
                    {t("languages.learnWith").replace(
                      "{language}",
                      dir === "rtl" ? language.name : language.nativeName
                    )}
                  </p>
                </div>

                {/* Fixed button alignment and spacing */}
                <div
                  className={`flex gap-3 ${
                    dir === "rtl" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Button
                    onClick={() => navigate("/register")}
                    className={`bg-academy-green hover:bg-opacity-90 flex-1 transition-all duration-200 ${
                      dir === "rtl" ? "font-arabic" : ""
                    }`}
                  >
                    {t("button.register")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/whatsapp")}
                    className={`border-2 border-academy-green text-academy-green hover:bg-academy-green hover:text-white flex-1 transition-all duration-200 ${
                      dir === "rtl" ? "font-arabic" : ""
                    }`}
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
