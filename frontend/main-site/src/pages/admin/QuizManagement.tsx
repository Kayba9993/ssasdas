import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  Users,
  CheckCircle,
  XCircle
} from "lucide-react";
import { fetchQuizzes, deleteQuiz } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const QuizManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: quizzesData, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => fetchQuizzes(),
  });

  const deleteQuizMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast({
        title: "تم حذف الاختبار",
        description: "تم حذف الاختبار بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء حذف الاختبار",
        variant: "destructive",
      });
    },
  });

  const quizzes = quizzesData?.data || [];
  const filteredQuizzes = quizzes.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.program?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteQuiz = (quizId: string) => {
    deleteQuizMutation.mutate(quizId);
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
          <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
          <Button 
            onClick={() => navigate('/admin/quizzes/create')}
            className="bg-academy-green hover:bg-academy-green/90"
          >
            <Plus className="h-4 w-4 ml-2" />
            إنشاء اختبار جديد
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الاختبارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الاختبارات ({filteredQuizzes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">عنوان الاختبار</TableHead>
                    <TableHead className="text-right">البرنامج</TableHead>
                    <TableHead className="text-right">عدد الأسئلة</TableHead>
                    <TableHead className="text-right">المدة</TableHead>
                    <TableHead className="text-right">درجة النجاح</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuizzes.map((quiz: any) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">
                        {quiz.title}
                      </TableCell>
                      <TableCell>
                        {quiz.program?.title || 'غير محدد'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          {quiz.total_questions}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          {quiz.time_limit_minutes ? `${quiz.time_limit_minutes} دقيقة` : 'غير محدود'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {quiz.passing_score}%
                      </TableCell>
                      <TableCell>
                        <Badge variant={quiz.is_active ? "default" : "secondary"}>
                          {quiz.is_active ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              نشط
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              غير نشط
                            </div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/quizzes/${quiz.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/quizzes/${quiz.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا الاختبار؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteQuiz(quiz.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  حذف
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

            {filteredQuizzes.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">لا توجد اختبارات</p>
                <Button 
                  onClick={() => navigate('/admin/quizzes/create')}
                  className="mt-4"
                >
                  إنشاء أول اختبار
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default QuizManagement;