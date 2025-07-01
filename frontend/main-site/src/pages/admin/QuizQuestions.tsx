import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  ArrowRight, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X
} from "lucide-react";
import { fetchQuizById } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import axios from "@/lib/axios";

interface QuestionOption {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id?: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  points: number;
  explanation?: string;
  options: QuestionOption[];
}

const QuizQuestions = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    question: "",
    type: "multiple_choice",
    points: 1,
    explanation: "",
    options: [
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
    ],
  });

  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => fetchQuizById(quizId!),
    enabled: !!quizId,
  });

  const { data: questionsData, isLoading: questionsLoading } = useQuery({
    queryKey: ['quiz-questions', quizId],
    queryFn: async () => {
      const response = await axios.get(`/teacher/quizzes/${quizId}/questions`);
      return response.data;
    },
    enabled: !!quizId,
  });

  const createQuestionMutation = useMutation({
    mutationFn: async (questionData: Question) => {
      const response = await axios.post(`/teacher/quizzes/${quizId}/questions`, questionData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-questions', quizId] });
      queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "تم إضافة السؤال",
        description: "تم إضافة السؤال بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء إضافة السؤال",
        variant: "destructive",
      });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ questionId, questionData }: { questionId: string; questionData: Question }) => {
      const response = await axios.put(`/teacher/quizzes/${quizId}/questions/${questionId}`, questionData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-questions', quizId] });
      setIsDialogOpen(false);
      setEditingQuestion(null);
      resetForm();
      toast({
        title: "تم تحديث السؤال",
        description: "تم تحديث السؤال بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء تحديث السؤال",
        variant: "destructive",
      });
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (questionId: string) => {
      const response = await axios.delete(`/teacher/quizzes/${quizId}/questions/${questionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-questions', quizId] });
      queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
      toast({
        title: "تم حذف السؤال",
        description: "تم حذف السؤال بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || "حدث خطأ أثناء حذف السؤال",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setNewQuestion({
      question: "",
      type: "multiple_choice",
      points: 1,
      explanation: "",
      options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
      ],
    });
  };

  const addOption = () => {
    const currentQuestion = editingQuestion || newQuestion;
    const updatedQuestion = {
      ...currentQuestion,
      options: [...currentQuestion.options, { option_text: "", is_correct: false }],
    };
    
    if (editingQuestion) {
      setEditingQuestion(updatedQuestion);
    } else {
      setNewQuestion(updatedQuestion);
    }
  };

  const removeOption = (index: number) => {
    const currentQuestion = editingQuestion || newQuestion;
    const updatedQuestion = {
      ...currentQuestion,
      options: currentQuestion.options.filter((_, i) => i !== index),
    };
    
    if (editingQuestion) {
      setEditingQuestion(updatedQuestion);
    } else {
      setNewQuestion(updatedQuestion);
    }
  };

  const updateOption = (index: number, field: keyof QuestionOption, value: string | boolean) => {
    const currentQuestion = editingQuestion || newQuestion;
    const updatedOptions = currentQuestion.options.map((option, i) => 
      i === index ? { ...option, [field]: value } : option
    );
    
    const updatedQuestion = { ...currentQuestion, options: updatedOptions };
    
    if (editingQuestion) {
      setEditingQuestion(updatedQuestion);
    } else {
      setNewQuestion(updatedQuestion);
    }
  };

  const handleSubmit = () => {
    const questionData = editingQuestion || newQuestion;
    
    if (!questionData.question.trim()) {
      toast({
        title: "خطأ",
        description: "نص السؤال مطلوب",
        variant: "destructive",
      });
      return;
    }

    if ((questionData.type === 'multiple_choice' || questionData.type === 'true_false') && 
        questionData.options.length < 2) {
      toast({
        title: "خطأ",
        description: "يجب إضافة خيارين على الأقل",
        variant: "destructive",
      });
      return;
    }

    if ((questionData.type === 'multiple_choice' || questionData.type === 'true_false') && 
        !questionData.options.some(option => option.is_correct)) {
      toast({
        title: "خطأ",
        description: "يجب تحديد الإجابة الصحيحة",
        variant: "destructive",
      });
      return;
    }

    if (editingQuestion && editingQuestion.id) {
      updateQuestionMutation.mutate({
        questionId: editingQuestion.id,
        questionData: questionData,
      });
    } else {
      createQuestionMutation.mutate(questionData);
    }
  };

  const handleEdit = (question: any) => {
    setEditingQuestion({
      id: question.id,
      question: question.question,
      type: question.type,
      points: question.points,
      explanation: question.explanation || "",
      options: question.options || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (questionId: string) => {
    deleteQuestionMutation.mutate(questionId);
  };

  const currentQuestion = editingQuestion || newQuestion;
  const questions = questionsData?.data || [];
  const quiz = quizData?.data;

  if (isLoading || questionsLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
          <div>
            <h1 className="text-3xl font-bold">{quiz?.title}</h1>
            <p className="text-gray-600">إدارة أسئلة الاختبار</p>
          </div>
        </div>

        {/* Quiz Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-academy-green">{questions.length}</p>
                <p className="text-sm text-gray-600">عدد الأسئلة</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{quiz?.passing_score}%</p>
                <p className="text-sm text-gray-600">درجة النجاح</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{quiz?.time_limit_minutes || '∞'}</p>
                <p className="text-sm text-gray-600">المدة (دقيقة)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{quiz?.max_attempts}</p>
                <p className="text-sm text-gray-600">عدد المحاولات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>أسئلة الاختبار</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-academy-green hover:bg-academy-green/90"
                    onClick={() => {
                      setEditingQuestion(null);
                      resetForm();
                    }}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة سؤال
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingQuestion ? "تعديل السؤال" : "إضافة سؤال جديد"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Question Text */}
                    <div>
                      <label className="block text-sm font-medium mb-2">نص السؤال *</label>
                      <Textarea
                        value={currentQuestion.question}
                        onChange={(e) => {
                          const updatedQuestion = { ...currentQuestion, question: e.target.value };
                          if (editingQuestion) {
                            setEditingQuestion(updatedQuestion);
                          } else {
                            setNewQuestion(updatedQuestion);
                          }
                        }}
                        placeholder="أدخل نص السؤال"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Question Type */}
                      <div>
                        <label className="block text-sm font-medium mb-2">نوع السؤال *</label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value: any) => {
                            const updatedQuestion = { 
                              ...currentQuestion, 
                              type: value,
                              options: value === 'true_false' 
                                ? [
                                    { option_text: "صحيح", is_correct: false },
                                    { option_text: "خطأ", is_correct: false }
                                  ]
                                : value === 'multiple_choice'
                                ? [
                                    { option_text: "", is_correct: false },
                                    { option_text: "", is_correct: false }
                                  ]
                                : []
                            };
                            if (editingQuestion) {
                              setEditingQuestion(updatedQuestion);
                            } else {
                              setNewQuestion(updatedQuestion);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple_choice">اختيار متعدد</SelectItem>
                            <SelectItem value="true_false">صح أو خطأ</SelectItem>
                            <SelectItem value="short_answer">إجابة قصيرة</SelectItem>
                            <SelectItem value="essay">مقال</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Points */}
                      <div>
                        <label className="block text-sm font-medium mb-2">النقاط *</label>
                        <Input
                          type="number"
                          min="1"
                          value={currentQuestion.points}
                          onChange={(e) => {
                            const updatedQuestion = { ...currentQuestion, points: parseInt(e.target.value) || 1 };
                            if (editingQuestion) {
                              setEditingQuestion(updatedQuestion);
                            } else {
                              setNewQuestion(updatedQuestion);
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Options for multiple choice and true/false */}
                    {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-sm font-medium">الخيارات *</label>
                          {currentQuestion.type === 'multiple_choice' && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addOption}
                            >
                              <Plus className="h-4 w-4 ml-1" />
                              إضافة خيار
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Switch
                                checked={option.is_correct}
                                onCheckedChange={(checked) => updateOption(index, 'is_correct', checked)}
                              />
                              <Input
                                value={option.option_text}
                                onChange={(e) => updateOption(index, 'option_text', e.target.value)}
                                placeholder={`الخيار ${index + 1}`}
                                className="flex-1"
                                disabled={currentQuestion.type === 'true_false'}
                              />
                              {currentQuestion.type === 'multiple_choice' && currentQuestion.options.length > 2 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeOption(index)}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div>
                      <label className="block text-sm font-medium mb-2">التفسير (اختياري)</label>
                      <Textarea
                        value={currentQuestion.explanation}
                        onChange={(e) => {
                          const updatedQuestion = { ...currentQuestion, explanation: e.target.value };
                          if (editingQuestion) {
                            setEditingQuestion(updatedQuestion);
                          } else {
                            setNewQuestion(updatedQuestion);
                          }
                        }}
                        placeholder="أدخل تفسير الإجابة الصحيحة"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setEditingQuestion(null);
                          resetForm();
                        }}
                      >
                        إلغاء
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-academy-green hover:bg-academy-green/90"
                        disabled={createQuestionMutation.isPending || updateQuestionMutation.isPending}
                      >
                        <Save className="h-4 w-4 ml-2" />
                        {editingQuestion ? "تحديث السؤال" : "إضافة السؤال"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {questions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">لا توجد أسئلة في هذا الاختبار</p>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-academy-green hover:bg-academy-green/90"
                >
                  إضافة أول سؤال
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question: any, index: number) => (
                  <Card key={question.id} className="border-l-4 border-l-academy-green">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-academy-green">السؤال {index + 1}</span>
                            <Badge variant="outline">
                              {question.type === 'multiple_choice' && 'اختيار متعدد'}
                              {question.type === 'true_false' && 'صح أو خطأ'}
                              {question.type === 'short_answer' && 'إجابة قصيرة'}
                              {question.type === 'essay' && 'مقال'}
                            </Badge>
                            <Badge variant="secondary">{question.points} نقطة</Badge>
                          </div>
                          <p className="text-gray-800 mb-3">{question.question}</p>
                          
                          {question.options && question.options.length > 0 && (
                            <div className="space-y-2">
                              {question.options.map((option: any, optionIndex: number) => (
                                <div 
                                  key={optionIndex} 
                                  className={`p-2 rounded border ${
                                    option.is_correct 
                                      ? 'bg-green-50 border-green-200 text-green-800' 
                                      : 'bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <span className="font-medium">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span> {option.option_text}
                                  {option.is_correct && (
                                    <Badge className="mr-2 bg-green-600">صحيح</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.explanation && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-sm text-blue-800">
                                <strong>التفسير:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(question)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(question.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default QuizQuestions;