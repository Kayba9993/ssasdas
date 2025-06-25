import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  useEffect(() => {
    document.title = `${t('404.title')} - ${t('404.message')} - أكاديمية اللغات`;
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, t]);

  return (
    <div>
      <NavBar />
      <div
        className={
          "min-h-[60vh] flex items-center justify-center bg-gray-50" + ` ${dir}`
        }
      >
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-academy-green mb-4">
            {t("404.title")}
          </h1>
          <p className="text-2xl text-gray-600 mb-8 rtl">{t("404.message")}</p>
          <Button
            onClick={() => navigate("/")}
            className="bg-academy-green hover:bg-opacity-90 px-8"
          >
            {t("404.button")}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;