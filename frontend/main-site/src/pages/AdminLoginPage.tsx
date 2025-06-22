
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import Logo from "@/components/common/Logo";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dummy login function - in a real app, you'd connect this to your backend
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simple validation
    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    // Dummy admin credentials for demo purposes
    if (email === "admin@example.com" && password === "admin123") {
      // In a real app, you would store authentication token in local storage or context
      localStorage.setItem("adminAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("بريد إلكتروني أو كلمة مرور غير صحيحة");
    }
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
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            
            <Button type="submit" className="w-full">
              تسجيل الدخول
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
