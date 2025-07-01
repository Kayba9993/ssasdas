import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  ClipboardList,
  TrendingUp,
  UserCheck,
  UserX,
  Calendar
} from "lucide-react";
import { fetchAdminDashboard } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchAdminDashboard,
  });

  useEffect(() => {
    document.title = `لوحة التحكم - أكاديمية اللغات`;
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = dashboardData?.stats || {};

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.total_users || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/users"
    },
    {
      title: "الطلاب",
      value: stats.total_students || 0,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/students"
    },
    {
      title: "المدرسين",
      value: stats.total_teachers || 0,
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/teachers"
    },
    {
      title: "البرامج النشطة",
      value: stats.active_programs || 0,
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/programs"
    },
    {
      title: "إجمالي التسجيلات",
      value: stats.total_enrollments || 0,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "/admin/enrollments"
    },
    {
      title: "الاختبارات",
      value: stats.total_quizzes || 0,
      icon: ClipboardList,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/admin/quizzes"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6" dir={dir}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/admin/quizzes/create')}
              className="bg-academy-green hover:bg-academy-green/90"
            >
              إنشاء اختبار جديد
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/admin/programs/create')}
            >
              إضافة برنامج
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(stat.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                المستخدمون الجدد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recent_users?.slice(0, 5).map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'student' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'student' ? 'طالب' : 'مدرس'}
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">لا توجد بيانات</p>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/admin/users')}
              >
                عرض جميع المستخدمين
              </Button>
            </CardContent>
          </Card>

          {/* Recent Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                التسجيلات الحديثة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recent_enrollments?.slice(0, 5).map((enrollment: any) => (
                  <div key={enrollment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{enrollment.student?.name}</p>
                      <p className="text-sm text-gray-500">{enrollment.program?.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      enrollment.status === 'enrolled' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {enrollment.status === 'enrolled' ? 'مسجل' : 'في الانتظار'}
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">لا توجد بيانات</p>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/admin/enrollments')}
              >
                عرض جميع التسجيلات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/admin/students/pending')}
              >
                <UserX className="h-6 w-6" />
                <span>الطلاب المعلقين</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/admin/quizzes')}
              >
                <ClipboardList className="h-6 w-6" />
                <span>إدارة الاختبارات</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/admin/programs')}
              >
                <BookOpen className="h-6 w-6" />
                <span>إدارة البرامج</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/admin/live-sessions')}
              >
                <Calendar className="h-6 w-6" />
                <span>الجلسات المباشرة</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;