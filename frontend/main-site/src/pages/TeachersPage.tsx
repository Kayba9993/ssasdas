import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUsers } from "@/services/api";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const TeachersPage = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  useEffect(() => {
    document.title = `${t("professors.title")} - أكاديمية اللغات`;
  }, [t]);

  const {
    data: teachersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachers", { role: "teacher" }],
    queryFn: () => fetchUsers({ role: "teacher", is_active: true }),
  });

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="container mx-auto px-4 py-12" dir={dir}>
          <h1 className="text-3xl font-bold text-center mb-12">
            {t("loading.teachers")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="animate-pulse aspect-square bg-gray-300"></div>
                <CardContent className="p-5">
                  <div className="animate-pulse h-6 w-32 mx-auto bg-gray-300 rounded mb-2"></div>
                  <div className="animate-pulse h-4 w-24 mx-auto bg-gray-300 rounded mb-4"></div>
                  <div className="animate-pulse h-10 w-full bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="container mx-auto px-4 py-12 text-center" dir={dir}>
          <h1 className="text-3xl font-bold mb-6">{t("professors.title")}</h1>
          <p className="text-red-500 mb-4">{t("error.general")}</p>
          <Button onClick={() => window.location.reload()}>{t("error.retry")}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const teachers = teachersData?.data || [];

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-12" dir={dir}>
        <h1 className="text-3xl font-bold text-center mb-12">
          {t("professors.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={"https://api.learnaccademy.com/api/v1" + teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-bold text-center mb-2">
                  {teacher.name}
                </h3>
                <p className="text-academy-green text-center mb-2">
                  {teacher.teacher?.department || "مدرس لغات"}
                </p>
                <p className="text-gray-600 text-center mb-4 text-sm">
                  {teacher.teacher?.specializations?.join(", ") ||
                    "متخصص في تدريس اللغات"}
                </p>
                <p className="text-gray-500 text-center text-xs mb-4">
                  {teacher.teacher?.years_experience
                    ? `${teacher.teacher.years_experience} سنوات خبرة`
                    : "خبرة واسعة في التدريس"}
                </p>
                <Button
                  onClick={() => navigate(`/professors/${teacher.id}`)}
                  className="w-full bg-academy-green hover:bg-opacity-90"
                >
                  {t("professors.meetButton")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeachersPage;