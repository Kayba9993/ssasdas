import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin, isAdminLoginLoading } = useAuth();
  const { t, dir } = useLanguage();

  useEffect(() => {
    document.title = `${t('admin.login.title')} - أكاديمية اللغات`;
  }, [t]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    adminLogin({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4" dir={dir}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo isAdmin />
          </div>
          <CardTitle className="text-2xl">{t('admin.login.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('admin.login.email')}</Label>
              <div className="relative">
                <User className={`absolute top-2.5 h-4 w-4 text-muted-foreground ${dir === 'rtl' ? 'right-2' : 'left-2'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('admin.login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={dir === 'rtl' ? 'pr-8' : 'pl-8'}
                  disabled={isAdminLoginLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('admin.login.password')}</Label>
              <div className="relative">
                <Lock className={`absolute top-2.5 h-4 w-4 text-muted-foreground ${dir === 'rtl' ? 'right-2' : 'left-2'}`} />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('admin.login.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={dir === 'rtl' ? 'pr-8' : 'pl-8'}
                  disabled={isAdminLoginLoading}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isAdminLoginLoading}>
              {isAdminLoginLoading ? t('admin.login.loading') : t('admin.login.button')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">{t('admin.login.demo')}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;