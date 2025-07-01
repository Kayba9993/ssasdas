import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const ContactPage = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  console.log(dir)

  useEffect(() => {
    document.title = `${t('contact.title')} - أكاديمية اللغات`;
  }, [t]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-12" dir={dir}>
        <h1
          className={`text-3xl font-bold text-center mb-6 ${dir}`}
          dir={"ltr"}
        >
          {t("contact.title")}
        </h1>
        <p
          className={`text-center text-gray-600 mb-12 rtl max-w-2xl mx-auto ${dir}`}
        >
          {t("contact.description")}
        </p>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 gap-12 items-center" + ` ${dir}`
          }
        >
          <div className="rtl">
            <h2
              className={
                "text-2xl font-bold mb-6 text-academy-green" + ` ${dir}`
              }
            >
              {t("contact.methods")}
            </h2>

            <div className="space-y-6">
              <div
                className={
                  "flex items-start space-x-4 space-x-reverse" + ` ${dir}`
                }
              >
                <div
                  className={"bg-academy-green/10 p-3 rounded-full" + ` ${dir}`}
                >
                  <Phone className="h-6 w-6 text-academy-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{t("contact.phone")}</h3>
                  <p className="text-gray-600 mb-4">
                    {t("contact.phone")}: <span dir="ltr">+212 664-685824</span>
                  </p>
                </div>
              </div>

              <div
                className={
                  "flex items-start space-x-4 space-x-reverse" + ` ${dir}`
                }
              >
                <div className="bg-academy-green/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-academy-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{t("contact.email")}</h3>
                  <p className="text-gray-600">info@learnacademy.com</p>
                </div>
              </div>

              <div
                className={
                  "flex items-start space-x-4 space-x-reverse" + ` ${dir}`
                }
              >
                <div className="bg-academy-green/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-academy-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{t("contact.address")}</h3>
                  <p className="text-gray-600">
                    N° 12, BD Hassan 2, 2éme étage, entre café Ristingua et
                    Snack chez le Maitre. , Settat, Morocco
                  </p>
                </div>
              </div>

              <div
                className={
                  "flex items-start space-x-4 space-x-reverse" + ` ${dir}`
                }
              >
                <div className="bg-academy-green/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-academy-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{t("contact.whatsapp")}</h3>
                  <p className="text-gray-600 mb-3">
                    {t("contact.whatsapp.desc")}
                  </p>
                  <Button
                    onClick={() => navigate("/whatsapp")}
                    className="bg-academy-green hover:bg-opacity-90"
                  >
                    {t("button.whatsapp")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.3029481664335!2d-7.617798199999999!3d32.9974468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda6056410dbf41b%3A0x48cc4bd3824c9d29!2sBd%20Hassan%20II%2C%20Settat!5e1!3m2!1sen!2sma!4v1751113383768!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;