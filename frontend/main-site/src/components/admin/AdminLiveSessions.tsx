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
import { Plus, Pencil, Trash, Search, Video } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLiveSessions, fetchPrograms, fetchUsers } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface LiveSessionFormValues {
  title: string;
  description: string;
  program_id: string;
  teacher_id: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_url: string;
  meeting_id: string;
  meeting_password: string;
  max_participants: number;
}

const AdminLiveSessions = () => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: sessionsData, isLoading } = useQuery({
    queryKey: ['live-sessions', { search: searchTerm }],
    queryFn: () => fetchLiveSessions({ search: searchTerm })
  });

  const { data: programsData } = useQuery({
    queryKey: ['programs'],
    queryFn: () => fetchPrograms()
  });

  const { data: teachersData } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchUsers({ role: 'teacher' })
  });

  const form = useForm<LiveSessionFormValues>({
    defaultValues: {
      title: "",
      description: "",
      program_id: "",
      teacher_id: "",
      scheduled_at: "",
      duration_minutes: 60,
      meeting_url: "",
      meeting_id: "",
      meeting_password: "",
      max_participants: 100
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      // This would be the actual API call
      const response = await fetch('/api/v1/admin/live-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['live-sessions'] });
      toast({
        title: "تم إنشاء الجلسة بنجاح",
        description: "تم إضافة الجلسة المباشرة الجديدة إلى النظام"
      });
      setIsAddSheetOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الجلسة",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/v1/admin/live-sessions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['live-sessions'] });
      toast({
        title: "تم تحديث الجلسة بنجاح",
        description: "تم حفظ التغييرات"
      });
      setEditingSession(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث الجلسة",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/admin/live-sessions/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['live-sessions'] });
      toast({
        title: "تم حذف الجلسة بنجاح",
        description: "تم إزالة الجلسة من النظام"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف الجلسة",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: LiveSessionFormValues) => {
    if (editingSession) {
      updateMutation.mutate({ id: editingSession.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (session: any) => {
    setEditingSession(session);
    form.reset({
      title: session.title,
      description: session.description || "",
      program_id: session.program_id || "",
      teacher_id: session.teacher_id || "",
      scheduled_at: session.scheduled_at ? new Date(session.scheduled_at).toISOString().slice(0, 16) : "",
      duration_minutes: session.duration_minutes || 60,
      meeting_url: session.meeting_url || "",
      meeting_id: session.meeting_id || "",
      meeting_password: session.meeting_password || "",
      max_participants: session.max_participants || 100
    });
    setIsAddSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الجلسة؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إدارة الجلسات المباشرة</h1>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="بحث عن جلسة..." 
              className="pl-8 rtl:pr-8 rtl:pl-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={(open) => {
            setIsAddSheetOpen(open);
            if (!open) {
              setEditingSession(null);
              form.reset();
            }
          }}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                إضافة جلسة جديدة
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-right">
                  {editingSession ? "تعديل الجلسة" : "إضافة جلسة جديدة"}
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
                          <FormLabel>عنوان الجلسة</FormLabel>
                          <FormControl>
                            <Input placeholder="عنوان الجلسة" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف الجلسة</FormLabel>
                          <FormControl>
                            <Textarea placeholder="وصف الجلسة" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="program_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البرنامج</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر البرنامج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {programsData?.data?.map((program: any) => (
                                <SelectItem key={program.id} value={program.id}>
                                  {program.title}
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
                      name="scheduled_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>موعد الجلسة</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration_minutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مدة الجلسة (بالدقائق)</FormLabel>
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
                      name="meeting_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رابط الاجتماع</FormLabel>
                          <FormControl>
                            <Input placeholder="https://zoom.us/j/..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meeting_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>معرف الاجتماع</FormLabel>
                          <FormControl>
                            <Input placeholder="123-456-789" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meeting_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>كلمة مرور الاجتماع</FormLabel>
                          <FormControl>
                            <Input placeholder="كلمة المرور" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="max_participants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الحد الأقصى للمشاركين</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="100" 
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
                        {editingSession ? "تحديث" : "حفظ"}
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
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            قائمة الجلسات المباشرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان الجلسة</TableHead>
                <TableHead>البرنامج</TableHead>
                <TableHead>المدرس</TableHead>
                <TableHead>الموعد</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionsData?.data?.map((session: any) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.title}</TableCell>
                  <TableCell>{session.program?.title || '-'}</TableCell>
                  <TableCell>{session.teacher?.name || '-'}</TableCell>
                  <TableCell>
                    {session.scheduled_at ? new Date(session.scheduled_at).toLocaleString('ar-SA') : '-'}
                  </TableCell>
                  <TableCell>{session.duration_minutes} دقيقة</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      session.status === 'live' ? 'bg-green-100 text-green-800' :
                      session.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.status === 'scheduled' ? 'مجدولة' :
                       session.status === 'live' ? 'مباشرة' :
                       session.status === 'completed' ? 'مكتملة' : 'ملغية'}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(session)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(session.id)}
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

export default AdminLiveSessions;