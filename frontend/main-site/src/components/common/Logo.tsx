import { Link } from "react-router-dom";

const Logo = ({ isAdmin }: { isAdmin?: boolean }) => {
  return (
    <Link to={isAdmin ? "/admin" : "/"} className="flex items-center space-x-2">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-academy-green rounded-lg flex items-center justify-center mr-2">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <div className="flex flex-col">
          <span className="rtl text-xl font-bold text-academy-green">أكاديمية اللغات</span>
          <span className="rtl text-gray-600 text-sm">Language Academy</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;