<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Programs;
use App\Models\Enrollment;
use App\Models\LiveSessions;
use App\Models\QuizSubmissions;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function studentDashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->is_student) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Get student's enrollments
        $enrollments = Enrollment::with(['program.language', 'program.teacher'])
                                ->where('student_id', $user->id)
                                ->latest()
                                ->take(5)
                                ->get();

        // Get upcoming sessions for enrolled programs
        $programIds = $enrollments->pluck('program_id');
        $upcomingSessions = LiveSessions::with(['program', 'teacher'])
                                       ->whereIn('program_id', $programIds)
                                       ->upcoming()
                                       ->orderBy('scheduled_at')
                                       ->take(5)
                                       ->get();

        // Get recent quiz submissions
        $recentQuizzes = QuizSubmissions::with(['quiz.program'])
                                       ->where('student_id', $user->id)
                                       ->latest()
                                       ->take(5)
                                       ->get();

        // Calculate stats
        $stats = [
            'enrolled_courses' => $enrollments->count(),
            'completed_sessions' => $upcomingSessions->where('status', 'completed')->count(),
            'quiz_results' => $recentQuizzes->count(),
            'average_progress' => $enrollments->avg('progress_percentage') ?? 0,
        ];

        return response()->json([
            'stats' => $stats,
            'enrollments' => $enrollments,
            'upcoming_sessions' => $upcomingSessions,
            'recent_quizzes' => $recentQuizzes,
        ]);
    }

    public function teacherDashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->is_teacher) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Get teacher's programs
        $programs = Programs::with(['language', 'enrollments'])
                           ->where('teacher_id', $user->id)
                           ->latest()
                           ->take(5)
                           ->get();

        // Get upcoming sessions
        $upcomingSessions = LiveSessions::with(['program'])
                                       ->where('teacher_id', $user->id)
                                       ->upcoming()
                                       ->orderBy('scheduled_at')
                                       ->take(5)
                                       ->get();

        // Calculate stats
        $totalStudents = Enrollment::whereIn('program_id', $programs->pluck('id'))->count();
        $totalSessions = LiveSessions::where('teacher_id', $user->id)->count();

        $stats = [
            'active_courses' => $programs->where('is_active', true)->count(),
            'total_students' => $totalStudents,
            'scheduled_sessions' => $upcomingSessions->count(),
            'total_programs' => $programs->count(),
        ];

        return response()->json([
            'stats' => $stats,
            'programs' => $programs,
            'upcoming_sessions' => $upcomingSessions,
        ]);
    }

    public function adminDashboard(): JsonResponse
    {
        // System-wide statistics
        $stats = [
            'total_users' => User::count(),
            'total_students' => User::where('role', 'student')->count(),
            'total_teachers' => User::where('role', 'teacher')->count(),
            'active_programs' => Programs::active()->count(),
            'total_enrollments' => Enrollment::count(),
            'pending_verifications' => Enrollment::where('status', 'enrolled')->count(),
        ];

        // Recent activities
        $recentUsers = User::with(['student', 'teacher'])
                          ->latest()
                          ->take(5)
                          ->get();

        $recentEnrollments = Enrollment::with(['student', 'program'])
                                     ->latest()
                                     ->take(5)
                                     ->get();

        return response()->json([
            'stats' => $stats,
            'recent_users' => $recentUsers,
            'recent_enrollments' => $recentEnrollments,
        ]);
    }
}