
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem("adminAuthenticated");
    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <Logo isAdmin />
        <h1 className="text-xl font-bold">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">الإشعارات</span>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">العودة للموقع</Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">تسجيل الخروج</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
