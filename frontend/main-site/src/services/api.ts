import { Language, Professor } from "@/types";

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth APIs
export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  return response.json();
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
};

export const adminLogin = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Admin login failed');
  }
  
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  
  return response.json();
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/user`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to get user');
  }
  
  return response.json();
};

// Language APIs
export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await fetch(`${API_BASE_URL}/languages`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }
  
  const data = await response.json();
  return data.data;
};

export const createLanguage = async (languageData: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/languages`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(languageData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create language');
  }
  
  return response.json();
};

export const updateLanguage = async (id: string, languageData: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/languages/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(languageData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update language');
  }
  
  return response.json();
};

export const deleteLanguage = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/languages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete language');
  }
  
  return response.json();
};

// Quiz APIs
export const fetchQuizzes = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/quizzes`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  
  return response.json();
};

export const createQuiz = async (quizData: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/quizzes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(quizData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create quiz');
  }
  
  return response.json();
};

export const updateQuiz = async (id: string, quizData: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/quizzes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(quizData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update quiz');
  }
  
  return response.json();
};

export const deleteQuiz = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/quizzes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete quiz');
  }
  
  return response.json();
};

// Student management APIs
export const fetchPendingStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/students/pending`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch pending students');
  }
  
  return response.json();
};

export const approveStudent = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/students/${userId}/approve`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to approve student');
  }
  
  return response.json();
};

export const rejectStudent = async (userId: string, reason: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/students/${userId}/reject`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ reason })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to reject student');
  }
  
  return response.json();
};

// Dashboard APIs
export const fetchAdminDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/admin`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch admin dashboard');
  }
  
  return response.json();
};

// Legacy APIs for compatibility
export const fetchLanguageById = async (id: string): Promise<Language | undefined> => {
  const languages = await fetchLanguages();
  return languages.find(lang => lang.id === id);
};

export const fetchProfessors = async (): Promise<Professor[]> => {
  // This would be replaced with actual API call
  const professors = [
    {
      id: "1",
      name: "د. محمد أحمد",
      title: "أستاذ اللغة الإنجليزية",
      language: "الإنجليزية",
      image: "/lovable-uploads/1a202d64-c977-417b-8bf0-0b1c3cfed19f.png",
      description: "خبرة 15 عامًا في تدريس اللغة الإنجليزية للناطقين بالعربية. حاصل على شهادة TESOL وماجستير في اللغويات التطبيقية."
    },
    {
      id: "2", 
      name: "د. سارة علي",
      title: "أستاذة اللغة الفرنسية",
      language: "الفرنسية",
      image: "/lovable-uploads/1f6232dc-505a-4424-805a-ec17ff935bae.png",
      description: "متخصصة في تدريس اللغة الفرنسية مع خبرة 12 عامًا. حاصلة على دكتوراه في الأدب الفرنسي من جامعة السوربون."
    },
    {
      id: "3",
      name: "د. أحمد محمود", 
      title: "أستاذ اللغة الألمانية",
      language: "الألمانية",
      image: "/lovable-uploads/448b66da-1bb9-4262-96ff-d30d78dccb59.png",
      description: "خبير في تدريس اللغة الألمانية للأعمال والأغراض الأكاديمية. خبرة 10 سنوات ومعتمد من معهد جوته."
    }
  ];
  
  return professors;
};

export const fetchProfessorById = async (id: string): Promise<Professor | undefined> => {
  const professors = await fetchProfessors();
  return professors.find(prof => prof.id === id);
};