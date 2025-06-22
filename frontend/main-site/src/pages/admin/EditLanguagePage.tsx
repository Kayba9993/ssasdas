import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { languages } from "@/data/languages";

interface LanguageFormValues {
  name: string;
  nativeName: string;
  flag: string;
}

const EditLanguagePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the language based on ID - fixed the type comparison issue
  const language = languages.find(lang => lang.id === id);
  
  const form = useForm<LanguageFormValues>({
    defaultValues: {
      name: language?.name || "",
      nativeName: language?.nativeName || "",
      flag: language?.flag || ""
    }
  });
  
  const onSubmit = (data: LanguageFormValues) => {
    console.log("Updated language data:", data);
    
    // Here you would call your API to update the language
    
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات اللغة بنجاح",
    });
    
    // Navigate back to languages page after successful update
    setTimeout(() => {
      navigate("/admin/languages");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate("/admin/languages")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">تعديل اللغة</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>بيانات اللغة</CardTitle>
        </CardHeader>
        <CardContent>
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
                name="nativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم اللغة الأصلي</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: English" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز العلم</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: 🇬🇧" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/languages")}
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

export default EditLanguagePage;
