import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { professors } from "@/data/professors";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfessorDetail from "@/components/professors/ProfessorDetail";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const ProfessorDetailPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const professor = professors.find(prof => prof.id === id);

  useEffect(() => {
    const title = professor 
      ? `${professor.name} - ${t('professors.title')} - أكاديمية اللغات`
      : `${t('professors.title')} - أكاديمية اللغات`;
    document.title = title;
  }, [professor, t]);

  return (
    <div>
      <NavBar />
      <ProfessorDetail />
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;