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
import { Plus, Pencil, Trash, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface StudentFormValues {
  name: string;
  email: string;
  password?: string;
  student_id: string;
  phone: string;
  level: string;
  bio: string;
  skills: string;
  learning_goals: string;
}

const AdminStudents = () => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['students', { role: 'student', search: searchTerm }],
    queryFn: () => fetchUsers({ role: 'student', search: searchTerm })
  });

  const form = useForm<StudentFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      student_id: "",
      phone: "",
      level: "beginner",
      bio: "",
      skills: "",
      learning_goals: ""
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createUser({ ...data, role: 'student' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "تم إنشاء الطالب بنجاح",
        description: "تم إضافة الطالب الجديد إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الطالب",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "تم تحديث الطالب بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingStudent(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث الطالب",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "تم حذف الطالب بنجاح",
        description: "تم إزالة الطالب من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف الطالب",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: StudentFormValues) => {
    const studentData = {
      ...data,
      student: {
        student_id: data.student_id,
        phone: data.phone,
        level: data.level,
        bio: data.bio,
        skills: data.skills.split(',').map(s => s.trim()),
        learning_goals: data.learning_goals
      }
    };

    if (editingStudent) {
      updateMutation.mutate({ id: editingStudent.id, data: studentData });
    } else {
      createMutation.mutate(studentData);
    }
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    form.reset({
      name: student.name,
      email: student.email,
      student_id: student.student?.student_id || "",
      phone: student.student?.phone || "",
      level: student.student?.level || "beginner",
      bio: student.student?.bio || "",
      skills: student.student?.skills?.join(', ') || "",
      learning_goals: student.student?.learning_goals || ""
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطالب؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة الطلاب</h1>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="بحث عن طالب..." 
              className="pl-8 rtl:pr-8 rtl:pl-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
            setIsAddSheetOpen(open);
            if (!open) {
              setEditingStudent(null);
              form.reset();
            }
          }}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                إضافة طالب جديد
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-right">
                  {editingStudent ? "تعديل الطالب" : "إضافة طالب جديد"}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input placeholder="اسم الطالب" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="البريد الإلكتروني" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {!editingStudent && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="كلمة المرور" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="student_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الطالب</FormLabel>
                          <FormControl>
                            <Input placeholder="رقم الطالب" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="رقم الهاتف" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المستوى</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المستوى" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">مبتدئ</SelectItem>
                              <SelectItem value="intermediate">متوسط</SelectItem>
                              <SelectItem value="advanced">متقدم</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المهارات (مفصولة بفاصلة)</FormLabel>
                          <FormControl>
                            <Input placeholder="القراءة, الكتابة, المحادثة" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="learning_goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>أهداف التعلم</FormLabel>
                          <FormControl>
                            <Textarea placeholder="أهداف الطالب في التعلم..." className="min-h-[80px]" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نبذة عن الطالب</FormLabel>
                          <FormControl>
                            <Textarea placeholder="نبذة عن الطالب..." className="min-h-[80px]" {...field} />
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
                        {editingStudent ? "تحديث" : "حفظ"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلاب</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>رقم الطالب</TableHead>
                <TableHead>المستوى</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData?.data?.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.student?.student_id || '-'}</TableCell>
                  <TableCell>{student.student?.level || '-'}</TableCell>
                  <TableCell>{student.student?.phone || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      student.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(student)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(student.id)}
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

export default AdminStudents;