import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchQuizzes, createQuiz, updateQuiz, deleteQuiz } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface QuizFormValues {
  title: string;
  description: string;
  program_id: string;
  time_limit_minutes: number;
  passing_score: number;
  max_attempts: number;
}

const AdminQuizzes = () => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['admin-quizzes'],
    queryFn: fetchQuizzes
  });

  const form = useForm<QuizFormValues>({
    defaultValues: {
      title: "",
      description: "",
      program_id: "",
      time_limit_minutes: 60,
      passing_score: 70,
      max_attempts: 3
    }
  });

  const createMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast({
        title: "تم إنشاء الاختبار بنجاح",
        description: "تم إضافة الاختبار الجديد إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الاختبار",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateQuiz(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast({
        title: "تم تحديث الاختبار بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingQuiz(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث الاختبار",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast({
        title: "تم حذف الاختبار بنجاح",
        description: "تم إزالة الاختبار من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف الاختبار",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: QuizFormValues) => {
    const quizData = {
      ...data,
      total_questions: 0, // Will be updated when questions are added
    };

    if (editingQuiz) {
      updateMutation.mutate({ id: editingQuiz.id, data: quizData });
    } else {
      createMutation.mutate(quizData);
    }
  };

  const handleEdit = (quiz: any) => {
    setEditingQuiz(quiz);
    form.reset({
      title: quiz.title,
      description: quiz.description || "",
      program_id: quiz.program_id || "",
      time_limit_minutes: quiz.time_limit_minutes || 60,
      passing_score: quiz.passing_score || 70,
      max_attempts: quiz.max_attempts || 3
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الاختبار؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة الاختبارات</h1>
        <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
          setIsAddSheetOpen(open);
          if (!open) {
            setEditingQuiz(null);
            form.reset();
          }
        }}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة اختبار جديد
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-right">
                {editingQuiz ? "تعديل الاختبار" : "إضافة اختبار جديد"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الاختبار</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: اختبار اللغة الإنجليزية" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف الاختبار</FormLabel>
                        <FormControl>
                          <Textarea placeholder="وصف مختصر للاختبار" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time_limit_minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مدة الاختبار (بالدقائق)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="60" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passing_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>درجة النجاح (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="70" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_attempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد المحاولات المسموحة</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddSheetOpen(false)}
                      className="ml-2"
                    >
                      إلغاء
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                      {editingQuiz ? "تحديث" : "حفظ"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>قائمة الاختبارات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان الاختبار</TableHead>
                <TableHead>عدد الأسئلة</TableHead>
                <TableHead>مدة الاختبار</TableHead>
                <TableHead>درجة النجاح</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes?.data?.map((quiz: any) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.total_questions}</TableCell>
                  <TableCell>{quiz.time_limit_minutes} دقيقة</TableCell>
                  <TableCell>{quiz.passing_score}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      quiz.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {quiz.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(quiz)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(quiz.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">حذف</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuizzes;