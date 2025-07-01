import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Search, 
  UserCheck, 
  UserX, 
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { fetchPendingStudents, approveStudent, rejectStudent } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const StudentsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['pendingStudents'],
    queryFn: fetchPendingStudents,
  });

  const approveStudentMutation = useMutation({
    mutationFn: approveStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] });
      toast({
        title: "تم قبول الطالب",
        description: "تم قبول الطالب بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء قبول الطالب",
        variant: "destructive",
      });
    },
  });

  const rejectStudentMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) => 
      rejectStudent(userId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] });
      toast({
        title: "تم رفض الطالب",
        description: "تم رفض طلب التسجيل",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء رفض الطالب",
        variant: "destructive",
      });
    },
  });

  const students = studentsData?.data || [];
  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (studentId: string) => {
    approveStudentMutation.mutate(studentId);
  };

  const handleReject = (studentId: string) => {
    rejectStudentMutation.mutate({ 
      userId: studentId, 
      reason: "لم يتم استيفاء المتطلبات" 
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">إدارة الطلاب</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {filteredStudents.length} طالب في الانتظار
          </Badge>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في الطلاب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>الطلاب المعلقين ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right">الهاتف</TableHead>
                    <TableHead className="text-right">المستوى</TableHead>
                    <TableHead className="text-right">اللغة المطلوبة</TableHead>
                    <TableHead className="text-right">تاريخ التسجيل</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        {student.student?.phone || 'غير محدد'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {student.student?.level === 'beginner' && 'مبتدئ'}
                          {student.student?.level === 'intermediate' && 'متوسط'}
                          {student.student?.level === 'advanced' && 'متقدم'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.student?.skills?.join(', ') || 'غير محدد'}
                      </TableCell>
                      <TableCell>
                        {new Date(student.created_at).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          في الانتظار
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(student.id)}
                            disabled={approveStudentMutation.isPending}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:bg-red-50"
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>رفض طلب التسجيل</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من رفض طلب تسجيل {student.name}؟ 
                                  سيتم حذف الطلب نهائياً.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleReject(student.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  رفض الطلب
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد طلبات تسجيل معلقة</p>
                <p className="text-gray-400">جميع الطلبات تم مراجعتها</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {filteredStudents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  onClick={() => {
                    filteredStudents.forEach((student: any) => {
                      handleApprove(student.id);
                    });
                  }}
                  disabled={approveStudentMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  قبول جميع الطلبات
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default StudentsManagement;