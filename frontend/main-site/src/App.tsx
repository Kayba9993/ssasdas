import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import ProfessorsPage from "./pages/ProfessorsPage";
import ProfessorDetailPage from "./pages/ProfessorDetailPage";
import LanguagesPage from "./pages/LanguagesPage";
import RegistrationPage from "./pages/RegistrationPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";

// Admin pages
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDashboardOverview from "./components/admin/AdminDashboardOverview";
import AdminStudents from "./components/admin/AdminStudents";
import AdminTeachers from "./components/admin/AdminTeachers";
import AdminLanguages from "./components/admin/AdminLanguages";
import AdminUsers from "./components/admin/AdminUsers";
import AdminPrograms from "./components/admin/AdminPrograms";
import AdminQuizzes from "./components/admin/AdminQuizzes";
import AdminLiveSessions from "./components/admin/AdminLiveSessions";
import AdminStudentApproval from "./components/admin/AdminStudentApproval";
import AdminSettings from "./components/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main site routes */}
            <Route path="/" element={<Index />} />
            <Route path="/professors" element={<ProfessorsPage />} />
            <Route path="/professors/:id" element={<ProfessorDetailPage />} />
            <Route path="/languages" element={<LanguagesPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin login route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboardPage />}>
              <Route index element={<AdminDashboardOverview />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="languages" element={<AdminLanguages />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="quizzes" element={<AdminQuizzes />} />
              <Route path="live-sessions" element={<AdminLiveSessions />} />
              <Route path="student-approval" element={<AdminStudentApproval />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;