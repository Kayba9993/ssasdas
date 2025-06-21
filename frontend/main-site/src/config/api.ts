// API configuration and base setup
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    user: '/auth/user',
    updateProfile: '/auth/profile',
  },
  // Dashboard
  dashboard: {
    student: '/dashboard/student',
    teacher: '/dashboard/teacher',
    admin: '/dashboard/admin',
  },
  // Programs
  programs: {
    list: '/programs',
    show: (id: string) => `/programs/${id}`,
    create: '/teacher/programs',
    update: (id: string) => `/teacher/programs/${id}`,
    delete: (id: string) => `/teacher/programs/${id}`,
  },
  // Languages
  languages: {
    list: '/languages',
    show: (id: string) => `/languages/${id}`,
  },
  // Enrollments
  enrollments: {
    list: '/enrollments',
    create: (programId: string) => `/enrollments/programs/${programId}`,
    show: (id: string) => `/enrollments/${id}`,
    update: (id: string) => `/enrollments/${id}`,
    teacher: '/teacher/enrollments',
  },
  // Live Sessions
  liveSessions: {
    list: '/live-sessions',
    show: (id: string) => `/live-sessions/${id}`,
    join: (id: string) => `/live-sessions/${id}/join`,
    create: '/teacher/live-sessions',
    update: (id: string) => `/teacher/live-sessions/${id}`,
    delete: (id: string) => `/teacher/live-sessions/${id}`,
  },
  // Quizzes
  quizzes: {
    show: (id: string) => `/quizzes/${id}`,
    start: (id: string) => `/quizzes/${id}/start`,
    submit: (id: string) => `/quizzes/${id}/submit`,
    results: (submissionId: string) => `/quizzes/submissions/${submissionId}/results`,
    create: '/teacher/quizzes',
    update: (id: string) => `/teacher/quizzes/${id}`,
    delete: (id: string) => `/teacher/quizzes/${id}`,
  },
  // Media
  media: {
    upload: '/media/upload',
    list: '/media',
    show: (id: string) => `/media/${id}`,
    delete: (id: string) => `/media/${id}`,
  },
  // Users (Admin)
  users: {
    list: '/admin/users',
    show: (id: string) => `/admin/users/${id}`,
    update: (id: string) => `/admin/users/${id}`,
    delete: (id: string) => `/admin/users/${id}`,
    teacherStudents: '/teacher/students',
  },
  // Payments (Admin)
  payments: {
    pending: '/admin/payments/pending',
    verify: (enrollmentId: string) => `/admin/payments/${enrollmentId}/verify`,
    reject: (enrollmentId: string) => `/admin/payments/${enrollmentId}/reject`,
  },
} as const;