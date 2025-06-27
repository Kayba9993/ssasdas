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
      <div>
        <NavBar />
        <div className="container mx-auto px-4 py-12" dir={dir}>
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
      <div>
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center" dir={dir}>
          <h2 className="text-2xl font-bold mb-4">{t("professors.notFound")}</h2>
          <Button onClick={() => navigate("/professors")}>
            {t("professors.backToList")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const teacher = teacherData.data;

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-12" dir={dir}>
        <Button
          variant="ghost"
          onClick={() => navigate("/professors")}
          className="mb-6 flex gap-2"
        >
          <ArrowRight size={16} />
          {t("professors.backToList")}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={"https://api.learnaccademy.com/api/v1" + teacher.avatar}
              alt={teacher.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <Card>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-2 text-center">{teacher.name}</h1>
              <p className="text-xl text-academy-green mb-4 text-center">
                {teacher.teacher?.department || "مدرس لغات"}
              </p>

              {/* Teacher Info Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {teacher.teacher?.specializations && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-academy-green" />
                    <div>
                      <p className="font-semibold text-sm text-gray-600">التخصصات</p>
                      <p className="text-gray-800">{teacher.teacher.specializations.join(", ")}</p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.qualification && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="h-5 w-5 text-academy-green" />
                    <div>
                      <p className="font-semibold text-sm text-gray-600">المؤهل العلمي</p>
                      <p className="text-gray-800">{teacher.teacher.qualification}</p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.years_experience && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-academy-green" />
                    <div>
                      <p className="font-semibold text-sm text-gray-600">سنوات الخبرة</p>
                      <p className="text-gray-800">{teacher.teacher.years_experience} سنة</p>
                    </div>
                  </div>
                )}

                {teacher.teacher?.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-academy-green" />
                    <div>
                      <p className="font-semibold text-sm text-gray-600">الهاتف</p>
                      <p className="text-gray-800">{teacher.teacher.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-academy-green" />
                  <div>
                    <p className="font-semibold text-sm text-gray-600">البريد الإلكتروني</p>
                    <p className="text-gray-800">{teacher.email}</p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {teacher.teacher?.bio && (
                <div className="border-t border-b py-4 my-4">
                  <h3 className="font-semibold mb-2">نبذة عن المدرس</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {teacher.teacher.bio}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 mt-6">
                <Button
                  onClick={() => navigate("/register")}
                  className="w-full bg-academy-green hover:bg-opacity-90"
                >
                  {t("button.register")}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/whatsapp")}
                  className="w-full border-academy-green text-academy-green hover:bg-academy-green hover:text-white flex gap-2 items-center justify-center"
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