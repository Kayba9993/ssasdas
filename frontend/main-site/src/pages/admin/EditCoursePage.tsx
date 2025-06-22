
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

// Dummy data for professors (in a real app, this would come from an API)
const professors = [
  { id: 1, name: "د. محمد أحمد" },
  { id: 2, name: "د. سارة علي" },
  { id: 3, name: "د. أحمد محمود" },
  { id: 4, name: "د. ليلى خالد" },
];

// Dummy data for languages
const languages = [
  { id: 1, name: "الإنجليزية" },
  { id: 2, name: "الفرنسية" },
  { id: 3, name: "الألمانية" },
  { id: 4, name: "الإسبانية" },
  { id: 5, name: "الصينية" },
];

// Dummy course data - in a real app, you'd fetch this based on the ID
const courses = [
  { id: 1, name: "اللغة الإنجليزية للمبتدئين", language: "الإنجليزية", professor: "د. محمد أحمد", students: 15, startDate: "2023-06-10" },
  { id: 2, name: "اللغة الفرنسية - المستوى المتوسط", language: "الفرنسية", professor: "د. سارة علي", students: 12, startDate: "2023-07-15" },
  { id: 3, name: "اللغة الألمانية للمسافرين", language: "الألمانية", professor: "د. أحمد محمود", students: 8, startDate: "2023-08-20" },
  { id: 4, name: "اللغة الإسبانية - مستوى متقدم", language: "الإسبانية", professor: "د. ليلى خالد", students: 10, startDate: "2023-09-05" },
  { id: 5, name: "اللغة الصينية للمبتدئين", language: "الصينية", professor: "د. فاطمة حسن", students: 6, startDate: "2023-10-12" },
];

interface CourseFormValues {
  name: string;
  language: string;
  professor: string;
  students: number;
  startDate: string;
}

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the course based on ID
  const courseId = Number(id);
  const course = courses.find(course => course.id === courseId);
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      name: course?.name || "",
      language: course?.language || "",
      professor: course?.professor || "",
      students: course?.students || 0,
      startDate: course?.startDate || "",
    }
  });
  
  const onSubmit = (data: CourseFormValues) => {
    console.log("Updated course data:", data);
    
    // Here you would call your API to update the course
    
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات الدورة بنجاح",
    });
    
    // Navigate back to courses page after successful update
    setTimeout(() => {
      navigate("/admin/courses");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate("/admin/courses")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">تعديل الدورة</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>بيانات الدورة</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الدورة</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم الدورة" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اللغة</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.id} value={language.name}>
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
                name="professor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدرس</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدرس" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professors.map((professor) => (
                          <SelectItem key={professor.id} value={professor.name}>
                            {professor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الطلاب</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="عدد الطلاب" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ البداية</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/courses")}
                  className="ml-2"
                >
                  إلغاء
                </Button>
                <Button type="submit">حفظ التغييرات</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCoursePage;
