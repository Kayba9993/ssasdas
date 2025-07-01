import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  Languages,
  GraduationCap,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/common/Logo";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "لوحة التحكم",
      icon: LayoutDashboard,
      href: "/admin",
      active: location.pathname === "/admin"
    },
    {
      title: "المستخدمين",
      icon: Users,
      href: "/admin/users",
      active: location.pathname.startsWith("/admin/users")
    },
    {
      title: "الطلاب",
      icon: GraduationCap,
      href: "/admin/students",
      active: location.pathname.startsWith("/admin/students")
    },
    {
      title: "البرامج",
      icon: BookOpen,
      href: "/admin/programs",
      active: location.pathname.startsWith("/admin/programs")
    },
    {
      title: "الاختبارات",
      icon: ClipboardList,
      href: "/admin/quizzes",
      active: location.pathname.startsWith("/admin/quizzes")
    },
    {
      title: "اللغات",
      icon: Languages,
      href: "/admin/languages",
      active: location.pathname.startsWith("/admin/languages")
    },
    {
      title: "الجلسات المباشرة",
      icon: Calendar,
      href: "/admin/live-sessions",
      active: location.pathname.startsWith("/admin/live-sessions")
    },
    {
      title: "الإعدادات",
      icon: Settings,
      href: "/admin/settings",
      active: location.pathname.startsWith("/admin/settings")
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <Logo isAdmin />
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  item.active 
                    ? "bg-academy-green text-white hover:bg-academy-green/90" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                مرحباً، المدير
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;