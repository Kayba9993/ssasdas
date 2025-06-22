import React from "react";
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
import { Check, X, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPendingStudents, approveStudent, rejectStudent } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const AdminStudentApproval = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingStudent, setRejectingStudent] = useState<any>(null);
  
  const { data: pendingStudents, isLoading } = useQuery({
    queryKey: ['pending-students'],
    queryFn: fetchPendingStudents
  });

  const approveMutation = useMutation({
    mutationFn: approveStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-students'] });
      toast({
        title: "تم قبول الطالب بنجاح",
        description: "تم تفعيل حساب الطالب"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في قبول الطالب",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) => 
      rejectStudent(userId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-students'] });
      toast({
        title: "تم رفض الطالب",
        description: "تم رفض طلب التسجيل"
      });
      setRejectingStudent(null);
      setRejectReason("");
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في رفض الطالب",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleApprove = (studentId: string) => {
    approveMutation.mutate(studentId);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال سبب الرفض",
        variant: "destructive"
      });
      return;
    }
    
    rejectMutation.mutate({ 
      userId: rejectingStudent.id, 
      reason: rejectReason 
    });
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">طلبات التسجيل المعلقة</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            الطلاب في انتظار الموافقة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingStudents?.data?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات تسجيل معلقة
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>العمر</TableHead>
                  <TableHead>المستوى</TableHead>
                  <TableHead>اللغة المطلوبة</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead className="w-[150px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingStudents?.data?.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.student?.phone || '-'}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{student.student?.level || '-'}</TableCell>
                    <TableCell>
                      {student.student?.skills?.join(', ') || '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(student.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApprove(student.id)}
                        disabled={approveMutation.isPending}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        قبول
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setRejectingStudent(student)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            رفض
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>رفض طلب التسجيل</DialogTitle>
                            <DialogDescription>
                              يرجى إدخال سبب رفض طلب التسجيل للطالب {rejectingStudent?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Textarea
                              placeholder="اكتب سبب الرفض هنا..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setRejectingStudent(null);
                                setRejectReason("");
                              }}
                            >
                              إلغاء
                            </Button>
                            <Button 
                              variant="destructive" 
                              onClick={handleReject}
                              disabled={rejectMutation.isPending}
                            >
                              رفض الطلب
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStudentApproval;