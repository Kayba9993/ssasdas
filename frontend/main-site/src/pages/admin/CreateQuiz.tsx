import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { ArrowRight, Save } from "lucide-react";
import { fetchPrograms, createQuiz } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const quizSchema = z.object({
  title: z.string().min(1, "عنوان الاختبار مطلوب"),
  description: z.string().optional(),
  program_id: z.string().min(1, "البرنامج مطلوب"),
  time_limit_minutes: z.string().optional(),
  passing_score: z.string().min(1, "درجة النجاح مطلوبة"),
  shuffle_questions: z.boolean().default(false),
  show_results_immediately: z.boolean().default(true),
  max_attempts: z.string().min(1, "عدد المحاولات مطلوب"),
  available_from: z.string().optional(),
  available_until: z.string().optional(),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      program_id: "",
      time_limit_minutes: "",
      passing_score: "70",
      shuffle_questions: false,
      show_results_immediately: true,
      max_attempts: "1",
      available_from: "",
      available_until: "",
    },
  });

  const { data: programsData, isLoading: programsLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: () => fetchPrograms(),
  });

  const createQuizMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: (response) => {
      toast({
        title: "تم إنشاء الاختبار",
        description: "تم إنشاء الاختبار بنجاح",
      });
      navigate(`/admin/quizzes/${response.data.id}/questions`);
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء إنشاء الاختبار",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuizFormData) => {
    const quizData = {
      ...data,
      time_limit_minutes: data.time_limit_minutes ? parseInt(data.time_limit_minutes) : null,
      passing_score: parseInt(data.passing_score),
      max_attempts: parseInt(data.max_attempts),
      available_from: data.available_from || null,
      available_until: data.available_until || null,
    };

    createQuizMutation.mutate(quizData);
  };

  const programs = programsData?.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/quizzes')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الاختبارات
          </Button>
          <h1 className="text-3xl font-bold">إنشاء اختبار جديد</h1>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>معلومات الاختبار</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الاختبار *</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان الاختبار" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Program */}
                  <FormField
                    control={form.control}
                    name="program_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البرنامج *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر البرنامج" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program: any) => (
                              <SelectItem key={program.id} value={program.id}>
                                {program.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف الاختبار</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أدخل وصف الاختبار"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Time Limit */}
                  <FormField
                    control={form.control}
                    name="time_limit_minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدة (بالدقائق)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="60"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Passing Score */}
                  <FormField
                    control={form.control}
                    name="passing_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>درجة النجاح (%) *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="100"
                            placeholder="70"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Max Attempts */}
                  <FormField
                    control={form.control}
                    name="max_attempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد المحاولات المسموحة *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            placeholder="1"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Available From */}
                  <FormField
                    control={form.control}
                    name="available_from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>متاح من</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Available Until */}
                  <FormField
                    control={form.control}
                    name="available_until"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>متاح حتى</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">إعدادات الاختبار</h3>
                  
                  <FormField
                    control={form.control}
                    name="shuffle_questions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">خلط الأسئلة</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            عرض الأسئلة بترتيب عشوائي لكل طالب
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="show_results_immediately"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">إظهار النتائج فوراً</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            عرض النتائج للطالب بعد انتهاء الاختبار مباشرة
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/quizzes')}
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    className="bg-academy-green hover:bg-academy-green/90"
                    disabled={createQuizMutation.isPending}
                  >
                    <Save className="h-4 w-4 ml-2" />
                    {createQuizMutation.isPending ? "جاري الحفظ..." : "حفظ والمتابعة"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateQuiz;