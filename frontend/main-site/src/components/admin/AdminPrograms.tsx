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
import { fetchPrograms, createProgram, updateProgram, deleteProgram, fetchLanguages, fetchUsers } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface ProgramFormValues {
  title: string;
  description: string;
  language_id: string;
  teacher_id: string;
  difficulty_level: string;
  duration_weeks: number;
  price: number;
  requirements: string;
  outcomes: string;
  max_students: number;
  start_date: string;
  end_date: string;
}

const AdminPrograms = () => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: programsData, isLoading } = useQuery({
    queryKey: ['programs', { search: searchTerm }],
    queryFn: () => fetchPrograms({ search: searchTerm })
  });

  const { data: languagesData } = useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages
  });

  const { data: teachersData } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchUsers({ role: 'teacher' })
  });

  const form = useForm<ProgramFormValues>({
    defaultValues: {
      title: "",
      description: "",
      language_id: "",
      teacher_id: "",
      difficulty_level: "beginner",
      duration_weeks: 12,
      price: 0,
      requirements: "",
      outcomes: "",
      max_students: 25,
      start_date: "",
      end_date: ""
    }
  });

  const createMutation = useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "تم إنشاء البرنامج بنجاح",
        description: "تم إضافة البرنامج الجديد إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء البرنامج",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProgram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "تم تحديث البرنامج بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingProgram(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث البرنامج",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "تم حذف البرنامج بنجاح",
        description: "تم إزالة البرنامج من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف البرنامج",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ProgramFormValues) => {
    const programData = {
      ...data,
      requirements: data.requirements.split('\n').filter(r => r.trim()),
      outcomes: data.outcomes.split('\n').filter(o => o.trim()),
    };

    if (editingProgram) {
      updateMutation.mutate({ id: editingProgram.id, data: programData });
    } else {
      createMutation.mutate(programData);
    }
  };

  const handleEdit = (program: any) => {
    setEditingProgram(program);
    form.reset({
      title: program.title,
      description: program.description || "",
      language_id: program.language_id || "",
      teacher_id: program.teacher_id || "",
      difficulty_level: program.difficulty_level || "beginner",
      duration_weeks: program.duration_weeks || 12,
      price: program.price || 0,
      requirements: program.requirements?.join('\n') || "",
      outcomes: program.outcomes?.join('\n') || "",
      max_students: program.max_students || 25,
      start_date: program.start_date || "",
      end_date: program.end_date || ""
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا البرنامج؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة البرامج</h1>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="بحث عن برنامج..." 
              className="pl-8 rtl:pr-8 rtl:pl-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
            setIsAddSheetOpen(open);
            if (!open) {
              setEditingProgram(null);
              form.reset();
            }
          }}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                إضافة برنامج جديد
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[500px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-right">
                  {editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد"}
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
                          <FormLabel>عنوان البرنامج</FormLabel>
                          <FormControl>
                            <Input placeholder="عنوان البرنامج" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف البرنامج</FormLabel>
                          <FormControl>
                            <Textarea placeholder="وصف البرنامج" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="language_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اللغة</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر اللغة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languagesData?.map((language: any) => (
                                <SelectItem key={language.id} value={language.id}>
                                  {language.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teacher_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المدرس</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المدرس" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {teachersData?.data?.map((teacher: any) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مستوى الصعوبة</FormLabel>
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

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="duration_weeks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>مدة البرنامج (أسابيع)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="12" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>السعر</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.01"
                                placeholder="299.99" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="max_students"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الحد الأقصى للطلاب</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="25" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>تاريخ البداية</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>تاريخ النهاية</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المتطلبات (سطر لكل متطلب)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="مهارات الحاسوب الأساسية&#10;اتصال بالإنترنت" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="outcomes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>النتائج المتوقعة (سطر لكل نتيجة)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="إتقان المحادثة&#10;فهم القراءة&#10;مهارات الكتابة" {...field} />
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
                        {editingProgram ? "تحديث" : "حفظ"}
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
          <CardTitle>قائمة البرامج</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان البرنامج</TableHead>
                <TableHead>اللغة</TableHead>
                <TableHead>المدرس</TableHead>
                <TableHead>المستوى</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programsData?.data?.map((program: any) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell>{program.language?.name || '-'}</TableCell>
                  <TableCell>{program.teacher?.name || '-'}</TableCell>
                  <TableCell>{program.difficulty_level}</TableCell>
                  <TableCell>{program.duration_weeks} أسبوع</TableCell>
                  <TableCell>{program.price} ريال</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      program.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {program.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(program)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(program.id)}
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

export default AdminPrograms;