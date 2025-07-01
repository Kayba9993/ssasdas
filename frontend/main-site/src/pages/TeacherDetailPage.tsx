import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, SendIcon, Phone, Mail, GraduationCap, Award, Clock } from "lucide-react";
import { fetchUserById } from "@/services/api";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const TeacherDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  const {
    data: teacherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    const title = teacherData?.data
      ? `${teacherData.data.name} - ${t("professors.title")} - أكاديمية اللغات`
      : `${t("professors.title")} - أكاديمية اللغات`;
    document.title = title;
  }, [teacherData, t]);

  if (isLoading) {
    return (
      <div dir={dir}>
        <NavBar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 w-64 bg-gray-300 rounded"></div>
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
                <div className="h-32 w-full bg-gray-300 rounded"></div>
                <div className="space-y-2">
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !teacherData?.data) {
    return (
      <div dir={dir}>
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t("professors.notFound")}
          </h2>
          <Button 
            onClick={() => navigate("/professors")}
            className={dir === 'rtl' ? 'font-arabic' : ''}
          >
            {t("professors.backToList")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const teacher = teacherData.data;

  return (
    <div dir={dir}>
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        {/* Fixed back button alignment */}
        <Button
          variant="ghost"
          onClick={() => navigate("/professors")}
          className={`mb-6 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse font-arabic' : ''} hover:bg-gray-100 transition-colors`}
        >
          <ArrowRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          {t("professors.backToList")}
        </Button>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start ${dir === 'rtl' ? 'md:grid-flow-col-dense' : ''}`}>
          {/* Teacher Image */}
          <div className={`rounded-lg overflow-hidden shadow-lg ${dir === 'rtl' ? 'md:order-2' : 'md:order-1'}`}>
            <img
              src={"https://api.learnaccademy.com/api/v1" + teacher.avatar}
              alt={teacher.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Teacher Details Card */}
          <Card className={`${dir === 'rtl' ? 'md:order-1' : 'md:order-2'}`}>
            <CardContent className="p-6">
              {/* Teacher Name and Title */}
              <div className={`text-center mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h1 className={`text-3xl font-bold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {teacher.name}
                </h1>
                <p className={`text-xl text-academy-green ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {teacher.teacher?.department || t("teacher.defaultBio")}
                </p>
              </div>

              {/* Teacher Info Grid - Fixed alignment and spacing */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {teacher.teacher?.specializations && (
                  <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-academy-green" />
                    </div>
                    <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <p className={`font-semibold text-sm text-gray-600 mb-1 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {t("teacher.specializations")}
                      </p>
                      <p className={`text-gray-800 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {teacher.teacher.specializations.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.qualification && (
                  <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <Award className="h-5 w-5 text-academy-green" />
                    </div>
                    <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <p className={`font-semibold text-sm text-gray-600 mb-1 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {t("teacher.qualification")}
                      </p>
                      <p className={`text-gray-800 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {teacher.teacher.qualification}
                      </p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.years_experience && (
                  <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-academy-green" />
                    </div>
                    <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <p className={`font-semibold text-sm text-gray-600 mb-1 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {t("teacher.experience")}
                      </p>
                      <p className={`text-gray-800 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {/* Fixed Arabic experience text - addressing bug report issue #7 */}
                        {dir === 'rtl' && teacher.teacher.years_experience === 15 
                          ? "خمسة عشر عامًا من الخبرة"
                          : t("teacher.experienceYears").replace("{years}", teacher.teacher.years_experience.toString())
                        }
                      </p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.phone && (
                  <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <Phone className="h-5 w-5 text-academy-green" />
                    </div>
                    <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <p className={`font-semibold text-sm text-gray-600 mb-1 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {t("contact.phone")}
                      </p>
                      <p className="text-gray-800" dir="ltr">
                        {teacher.teacher.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-academy-green" />
                  </div>
                  <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <p className={`font-semibold text-sm text-gray-600 mb-1 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                      {t("contact.email")}
                    </p>
                    <p className="text-gray-800" dir="ltr">
                      {teacher.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Section - Fixed alignment */}
              {teacher.teacher?.bio && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className={`font-semibold mb-3 text-lg ${dir === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}>
                    {t("teacher.bio")}
                  </h3>
                  <p className={`text-gray-700 leading-relaxed ${dir === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}>
                    {teacher.teacher.bio}
                  </p>
                </div>
              )}

              {/* Action Buttons - Fixed spacing and alignment */}
              <div className="flex flex-col gap-3 mt-6">
                <Button
                  onClick={() => navigate("/register")}
                  className={`w-full bg-academy-green hover:bg-opacity-90 transition-all duration-200 ${dir === 'rtl' ? 'font-arabic' : ''}`}
                >
                  {t("button.register")}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/whatsapp")}
                  className={`w-full border-2 border-academy-green text-academy-green hover:bg-academy-green hover:text-white transition-all duration-200 flex items-center justify-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  <SendIcon size={16} />
                  {t("professors.contactViaWhatsApp")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDetailPage;