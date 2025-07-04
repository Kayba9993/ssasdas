import { Link } from "react-router-dom";
import logo from "@/assets/images/Asset 11@2x (1).png";
import { useLanguage } from "@/contexts/LanguageContext";

const Logo = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { t, dir } = useLanguage();
  return (
    <Link
      to={isAdmin ? "/admin" : "/"}
      className="flex items-center gap-2"
      dir={dir}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 bg-academy-green rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-6 h-6" />
        </div>
        <div className="flex flex-col ms-2">
          <span className="text-xl font-bold text-academy-green">
            {t("logo.name")}
          </span>
          <span className="text-gray-600 text-sm">{t("logo.tagline")}</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
