import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUsers } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

const Teachers = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

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
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse h-8 w-64 mx-auto bg-gray-300 rounded mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-sm w-full max-w-sm">
                <div className="animate-pulse aspect-square bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-6 text-center">
                  <div className="animate-pulse h-6 w-32 mx-auto bg-gray-300 rounded mb-2"></div>
                  <div className="animate-pulse h-4 w-24 mx-auto bg-gray-300 rounded mb-4"></div>
                  <div className="animate-pulse h-10 w-full bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 mb-4">Failed to load teachers</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const teachers = teachersData?.data || [];
  console.log(teachers)

  return (
    <div className="py-16 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-12 text-academy-green `}
        >
          {t("professors.title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {teachers.slice(0, 3).map((teacher) => (
            <Card
              key={teacher.id}
              className="transition-all hover:shadow-lg w-80 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={"https://api.learnaccademy.com/api/v1" + teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className={`text-xl font-bold mb-2 text-center `}>
                  {teacher.name}
                </h3>
                <p className="text-academy-green mb-2">
                  {teacher.teacher?.department || "مدرس لغات"}
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                  {teacher.teacher?.specializations?.join(", ") ||
                    "متخصص في تدريس اللغات"}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  {teacher.teacher?.years_experience
                    ? `${teacher.teacher.years_experience} سنوات خبرة`
                    : "خبرة واسعة في التدريس"}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-academy-green text-academy-green hover:bg-academy-green hover:text-white"
                  onClick={() => navigate(`/professors/${teacher.id}`)}
                >
                  {t("professors.meetButton")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-academy-green hover:bg-opacity-90 px-8"
            onClick={() => navigate("/professors")}
          >
            {t("professors.viewAll")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
