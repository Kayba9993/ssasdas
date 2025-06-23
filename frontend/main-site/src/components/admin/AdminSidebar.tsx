import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Languages, 
  UserPlus, 
  Settings,
  BookOpen,
  ClipboardList,
  UserCheck,
  GraduationCap,
  Video
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      name: "الرئيسية", 
      path: "/admin", 
      icon: Home 
    },
    { 
      name: "المستخدمين", 
      path: "/admin/users", 
      icon: Users 
    },
    { 
      name: "الطلاب", 
      path: "/admin/students", 
      icon: GraduationCap 
    },
    { 
      name: "المدرسين", 
      path: "/admin/teachers", 
      icon: UserPlus 
    },
    { 
      name: "اللغات", 
      path: "/admin/languages", 
      icon: Languages 
    },
    { 
      name: "البرامج", 
      path: "/admin/programs", 
      icon: BookOpen 
    },
    { 
      name: "الاختبارات", 
      path: "/admin/quizzes", 
      icon: ClipboardList 
    },
    { 
      name: "الجلسات المباشرة", 
      path: "/admin/live-sessions", 
      icon: Video 
    },
    { 
      name: "طلبات التسجيل", 
      path: "/admin/student-approval", 
      icon: UserCheck 
    },
    { 
      name: "الإعدادات", 
      path: "/admin/settings", 
      icon: Settings 
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted ${
                active ? "bg-muted font-medium" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;