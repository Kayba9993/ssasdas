import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLanguages, createLanguage, updateLanguage, deleteLanguage } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface LanguageFormValues {
  name: string;
  description: string;
  icon: string;
  difficulty_level: string;
}

const AdminLanguages = () => {
  const navigate = useNavigate();
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: languages, isLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages
  });
  console.log('languages data:',languages)

  const form = useForm<LanguageFormValues>({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      difficulty_level: "beginner"
    }
  });

  const createMutation = useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      toast({
        title: "تم إنشاء اللغة بنجاح",
        description: "تم إضافة اللغة الجديدة إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء اللغة",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateLanguage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      toast({
        title: "تم تحديث اللغة بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingLanguage(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث اللغة",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      toast({
        title: "تم حذف اللغة بنجاح",
        description: "تم إزالة اللغة من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف اللغة",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: LanguageFormValues) => {
    if (editingLanguage) {
      updateMutation.mutate({ id: editingLanguage.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (language: any) => {
    setEditingLanguage(language);
    form.reset({
      name: language.name,
      description: language.description || "",
      icon: language.icon || "",
      difficulty_level: language.difficulty_level || "beginner"
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه اللغة؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة اللغات</h1>
        <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
          setIsAddSheetOpen(open);
          if (!open) {
            setEditingLanguage(null);
            form.reset();
          }
        }}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة لغة جديدة
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-right">
                {editingLanguage ? "تعديل اللغة" : "إضافة لغة جديدة"}
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
                        <FormLabel>اسم اللغة بالعربية</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: الإنجليزية" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف اللغة</FormLabel>
                        <FormControl>
                          <Input placeholder="وصف مختصر للغة" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رمز العلم</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: 🇬🇧" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مستوى الصعوبة</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full p-2 border rounded">
                            <option value="beginner">مبتدئ</option>
                            <option value="intermediate">متوسط</option>
                            <option value="advanced">متقدم</option>
                          </select>
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
                      {editingLanguage ? "تحديث" : "حفظ"}
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
          <CardTitle>قائمة اللغات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العلم</TableHead>
                <TableHead>اسم اللغة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>مستوى الصعوبة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages?.map((language: any) => (
                <TableRow key={language.id}>
                  <TableCell>{language.icon}</TableCell>
                  <TableCell>{language.name}</TableCell>
                  <TableCell>{language.description}</TableCell>
                  <TableCell>{language.difficulty_level}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(language)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(language.id)}
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

export default AdminLanguages;