<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 32f1840136bf3fb369be22127ba2257b207e92b8
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin, isAdminLoginLoading } = useAuth();

  useEffect(() => {
    document.title = "تسجيل الدخول للوحة التحكم - أكاديمية اللغات";
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
<<<<<<< HEAD
    adminLogin({ email, password });
=======
    try {
      const response = await adminLogin({ email, password });
      
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });
      
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "بريد إلكتروني أو كلمة مرور غير صحيحة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
>>>>>>> 32f1840136bf3fb369be22127ba2257b207e92b8
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo isAdmin />
          </div>
          <CardTitle className="text-2xl">تسجيل الدخول للوحة التحكم</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <User className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-8"
                  disabled={isAdminLoginLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-8"
                  disabled={isAdminLoginLoading}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isAdminLoginLoading}>
              {isAdminLoginLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">لتسجيل الدخول التجريبي: admin@example.com / admin123</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;