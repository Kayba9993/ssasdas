import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { languages } from "@/data/languages";
import { professors } from "@/data/professors";

interface ProfessorFormValues {
  name: string;
  title: string;
  language: string;
  image: string;
  description: string;
}

const EditProfessorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the professor based on ID - fixed the type comparison issue
  const professor = professors.find(prof => prof.id === id);
  
  const form = useForm<ProfessorFormValues>({
    defaultValues: {
      name: professor?.name || "",
      title: professor?.title || "",
      language: professor?.language || "",
      image: professor?.image || "",
      description: professor?.description || ""
    }
  });
  
  const onSubmit = (data: ProfessorFormValues) => {
    console.log("Updated professor data:", data);
    
    // Here you would call your API to update the professor
    
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات المدرس بنجاح",
    });
    
    // Navigate back to professors page after successful update
    setTimeout(() => {
      navigate("/admin/professors");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate("/admin/professors")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">تعديل المدرس</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>بيانات المدرس</CardTitle>
        </CardHeader>
        <CardContent>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان الوظيفي</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: أستاذ اللغة الإنجليزية" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة</FormLabel>
                    <FormControl>
                      <Input placeholder="رابط صورة المدرس" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف المدرس</FormLabel>
                    <FormControl>
                      <Textarea placeholder="نبذة عن المدرس وخبراته..." className="min-h-[100px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/professors")}
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

export default EditProfessorPage;
