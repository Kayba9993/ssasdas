
import { Professor } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfessorCardProps {
  professor: Professor;
}

const ProfessorCard = ({ professor }: ProfessorCardProps) => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg" dir={dir}>
      <div className="aspect-square overflow-hidden">
        <img 
          src={professor.image} 
          alt={professor.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-5 rtl">
        <h3 className="text-xl font-bold text-center mb-2">{professor.name}</h3>
        <p className="text-academy-green text-center mb-4">{professor.title}</p>
        <Button 
          onClick={() => navigate(`/professors/${professor.id}`)} 
          className="w-full bg-academy-green hover:bg-opacity-90"
        >
          {t('professors.meetButton')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfessorCard;
