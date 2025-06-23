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
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface TeacherFormValues {
  name: string;
  email: string;
  password?: string;
  employee_id: string;
  department: string;
  bio: string;
  specializations: string;
  years_experience: number;
  qualification: string;
  phone: string;
  hourly_rate: number;
}

const AdminTeachers = () => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: teachersData, isLoading } = useQuery({
    queryKey: ['teachers', { role: 'teacher', search: searchTerm }],
    queryFn: () => fetchUsers({ role: 'teacher', search: searchTerm })
  });

  const form = useForm<TeacherFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      employee_id: "",
      department: "",
      bio: "",
      specializations: "",
      years_experience: 0,
      qualification: "",
      phone: "",
      hourly_rate: 0
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createUser({ ...data, role: 'teacher' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast({
        title: "تم إنشاء المدرس بنجاح",
        description: "تم إضافة المدرس الجديد إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء المدرس",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast({
        title: "تم تحديث المدرس بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingTeacher(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث المدرس",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast({
        title: "تم حذف المدرس بنجاح",
        description: "تم إزالة المدرس من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف المدرس",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: TeacherFormValues) => {
    const teacherData = {
      ...data,
      specializations: data.specializations.split(',').map(s => s.trim()),
      teacher: {
        employee_id: data.employee_id,
        department: data.department,
        bio: data.bio,
        specializations: data.specializations.split(',').map(s => s.trim()),
        years_experience: data.years_experience,
        qualification: data.qualification,
        phone: data.phone,
        hourly_rate: data.hourly_rate
      }
    };

    if (editingTeacher) {
      updateMutation.mutate({ id: editingTeacher.id, data: teacherData });
    } else {
      createMutation.mutate(teacherData);
    }
  };

  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    form.reset({
      name: teacher.name,
      email: teacher.email,
      employee_id: teacher.teacher?.employee_id || "",
      department: teacher.teacher?.department || "",
      bio: teacher.teacher?.bio || "",
      specializations: teacher.teacher?.specializations?.join(', ') || "",
      years_experience: teacher.teacher?.years_experience || 0,
      qualification: teacher.teacher?.qualification || "",
      phone: teacher.teacher?.phone || "",
      hourly_rate: teacher.teacher?.hourly_rate || 0
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المدرس؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة المدرسين</h1>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="بحث عن مدرس..." 
              className="pl-8 rtl:pr-8 rtl:pl-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
            setIsAddSheetOpen(open);
            if (!open) {
              setEditingTeacher(null);
              form.reset();
            }
          }}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                إضافة مدرس جديد
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-right">
                  {editingTeacher ? "تعديل المدرس" : "إضافة مدرس جديد"}
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
                            <Input placeholder="اسم المدرس" {...field} />
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

                    {!editingTeacher && (
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
                      name="employee_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الموظف</FormLabel>
                          <FormControl>
                            <Input placeholder="رقم الموظف" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>القسم</FormLabel>
                          <FormControl>
                            <Input placeholder="القسم" {...field} />
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
                      name="specializations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التخصصات (مفصولة بفاصلة)</FormLabel>
                          <FormControl>
                            <Input placeholder="الإنجليزية, الفرنسية" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="years_experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>سنوات الخبرة</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="سنوات الخبرة" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المؤهل</FormLabel>
                          <FormControl>
                            <Input placeholder="المؤهل العلمي" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hourly_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الأجر بالساعة</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              placeholder="الأجر بالساعة" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نبذة عن المدرس</FormLabel>
                          <FormControl>
                            <Textarea placeholder="نبذة عن المدرس وخبراته..." className="min-h-[100px]" {...field} />
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
                        {editingTeacher ? "تحديث" : "حفظ"}
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
          <CardTitle>قائمة المدرسين</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>القسم</TableHead>
                <TableHead>سنوات الخبرة</TableHead>
                <TableHead>التخصصات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachersData?.data?.map((teacher: any) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.teacher?.department || '-'}</TableCell>
                  <TableCell>{teacher.teacher?.years_experience || 0}</TableCell>
                  <TableCell>{teacher.teacher?.specializations?.join(', ') || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      teacher.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {teacher.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(teacher)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(teacher.id)}
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

export default AdminTeachers;