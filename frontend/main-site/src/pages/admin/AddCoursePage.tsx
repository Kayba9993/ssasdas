import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(3, { message: "عنوان الدورة يجب أن يكون أكثر من 3 أحرف" }),
  language: z.string().min(1, { message: "يرجى اختيار اللغة" }),
  level: z.string().min(1, { message: "يرجى اختيار المستوى" }),
  professor: z.string().min(1, { message: "يرجى اختيار المدرس" }),
  description: z.string().min(10, { message: "يجب أن يكون الوصف أكثر من 10 أحرف" }),
  price: z.string().min(1, { message: "يرجى إدخال سعر الدورة" }),
  startDate: z.string().min(1, { message: "يرجى إدخال تاريخ بدء الدورة" }),
});

const AddCoursePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "إضافة دورة جديدة - لوحة التحكم - أكاديمية اللغات";
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      language: "",
      level: "",
      professor: "",
      description: "",
      price: "",
      startDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: "تم إضافة الدورة بنجاح",
      description: `تم إضافة دورة ${values.title} إلى قائمة الدورات`,
    });

    navigate("/admin/courses");
  }

  const languages = [
    { id: "english", name: "الإنجليزية" },
    { id: "french", name: "الفرنسية" },
    { id: "german", name: "الألمانية" },
    { id: "spanish", name: "الإسبانية" },
    { id: "chinese", name: "الصينية" },
  ];

  const levels = [
    { id: "beginner", name: "مبتدئ" },
    { id: "intermediate", name: "متوسط" },
    { id: "advanced", name: "متقدم" },
  ];

  const professors = [
    { id: "prof1", name: "د. محمد أحمد" },
    { id: "prof2", name: "د. سارة علي" },
    { id: "prof3", name: "د. أحمد محمود" },
    { id: "prof4", name: "د. ليلى خالد" },
    { id: "prof5", name: "د. فاطمة حسن" },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">إضافة دورة جديدة</h2>
        <Button variant="outline" onClick={() => navigate("/admin/courses")}>
          العودة للقائمة
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات الدورة</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الدورة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الدورة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="language"
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
                          {languages.map((language) => (
                            <SelectItem key={language.id} value={language.id}>
                              {language.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                          {levels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="professor"
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
                        {professors.map((professor) => (
                          <SelectItem key={professor.id} value={professor.id}>
                            {professor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الدورة</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل وصفًا تفصيليًا للدورة..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سعر الدورة (ريال)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ بدء الدورة</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">إضافة الدورة</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCoursePage;