<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Programs;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProgramsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Programs::with(['language', 'teacher'])
                        ->active()
                        ->latest();

        // Filter by language
        if ($request->filled('language_id')) {
            $query->where('language_id', $request->language_id);
        }

        // Filter by difficulty level
        if ($request->filled('difficulty_level')) {
            $query->where('difficulty_level', $request->difficulty_level);
        }

        // Search by title or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $programs = $query->paginate(12);

        return response()->json($programs);
    }

    public function show(string $id): JsonResponse
    {
        $program = Programs::with([
            'language',
            'teacher.teacher',
            'liveSessions' => function ($query) {
                $query->upcoming()->orderBy('scheduled_at');
            },
            'quizzes' => function ($query) {
                $query->active();
            }
        ])->findOrFail($id);

        // Check if current user is enrolled (if authenticated)
        $isEnrolled = false;
        if (Auth::check() && Auth::user()->is_student) {
            $isEnrolled = Enrollment::where('student_id', Auth::id())
                                   ->where('program_id', $program->id)
                                   ->exists();
        }

        return response()->json([
            'program' => $program,
            'is_enrolled' => $isEnrolled,
        ]);
    }

    public function enroll(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        if (!$user->is_student) {
            return response()->json([
                'message' => 'Only students can enroll in programs'
            ], 403);
        }

        $program = Programs::findOrFail($id);

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('student_id', $user->id)
                                       ->where('program_id', $program->id)
                                       ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'Already enrolled in this program'
            ], 409);
        }

        // Check enrollment capacity
        $currentEnrollments = $program->enrollments()->count();
        if ($currentEnrollments >= $program->max_students) {
            return response()->json([
                'message' => 'Program is full'
            ], 409);
        }

        $enrollment = Enrollment::create([
            'student_id' => $user->id,
            'program_id' => $program->id,
            'enrolled_at' => now(),
        ]);

        return response()->json([
            'message' => 'Successfully enrolled in program',
            'enrollment' => $enrollment->load('program')
        ], 201);
    }

    public function myEnrollments(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->is_student) {
            return response()->json([
                'message' => 'Only students have enrollments'
            ], 403);
        }

        $enrollments = Enrollment::with(['program.language', 'program.teacher'])
                                ->where('student_id', $user->id)
                                ->latest()
                                ->paginate(10);

        return response()->json($enrollments);
    }
}