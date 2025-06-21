<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Programs;
use App\Http\Resources\EnrollmentResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EnrollmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->is_student) {
            $enrollments = Enrollment::with(['program.language', 'program.teacher'])
                                   ->where('student_id', $user->id)
                                   ->latest()
                                   ->paginate(10);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'data' => EnrollmentResource::collection($enrollments->items()),
            'meta' => [
                'current_page' => $enrollments->currentPage(),
                'last_page' => $enrollments->lastPage(),
                'per_page' => $enrollments->perPage(),
                'total' => $enrollments->total(),
            ]
        ]);
    }

    public function store(Request $request, Programs $program): JsonResponse
    {
        $user = $request->user();

        if (!$user->is_student) {
            return response()->json(['message' => 'Only students can enroll'], 403);
        }

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('student_id', $user->id)
                                       ->where('program_id', $program->id)
                                       ->first();

        if ($existingEnrollment) {
            return response()->json(['message' => 'Already enrolled in this program'], 409);
        }

        // Check capacity
        $currentEnrollments = $program->enrollments()->count();
        if ($currentEnrollments >= $program->max_students) {
            return response()->json(['message' => 'Program is full'], 409);
        }

        $enrollment = Enrollment::create([
            'student_id' => $user->id,
            'program_id' => $program->id,
            'enrolled_at' => now(),
        ]);

        return response()->json([
            'message' => 'Successfully enrolled in program',
            'data' => new EnrollmentResource($enrollment->load('program'))
        ], 201);
    }

    public function show(Enrollment $enrollment): JsonResponse
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->is_student && $enrollment->student_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'data' => new EnrollmentResource($enrollment->load(['program.language', 'program.teacher', 'student']))
        ]);
    }

    public function update(Request $request, Enrollment $enrollment): JsonResponse
    {
        $user = $request->user();
        
        // Only students can update their own enrollments (limited fields)
        if ($user->is_student && $enrollment->student_id === $user->id) {
            $request->validate([
                'progress_percentage' => 'sometimes|numeric|min:0|max:100',
            ]);
            
            $enrollment->update($request->only(['progress_percentage']));
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'message' => 'Enrollment updated successfully',
            'data' => new EnrollmentResource($enrollment)
        ]);
    }

    public function teacherEnrollments(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $enrollments = Enrollment::with(['student', 'program'])
                                ->whereHas('program', function ($query) use ($user) {
                                    $query->where('teacher_id', $user->id);
                                })
                                ->latest()
                                ->paginate(20);

        return response()->json([
            'data' => EnrollmentResource::collection($enrollments->items()),
            'meta' => [
                'current_page' => $enrollments->currentPage(),
                'last_page' => $enrollments->lastPage(),
                'per_page' => $enrollments->perPage(),
                'total' => $enrollments->total(),
            ]
        ]);
    }

    public function pendingPayments(): JsonResponse
    {
        $enrollments = Enrollment::with(['student', 'program'])
                                ->where('status', 'enrolled')
                                ->latest()
                                ->paginate(20);

        return response()->json([
            'data' => EnrollmentResource::collection($enrollments->items()),
            'meta' => [
                'current_page' => $enrollments->currentPage(),
                'last_page' => $enrollments->lastPage(),
                'per_page' => $enrollments->perPage(),
                'total' => $enrollments->total(),
            ]
        ]);
    }

    public function verifyPayment(Enrollment $enrollment): JsonResponse
    {
        $enrollment->update(['status' => 'completed']);

        return response()->json([
            'message' => 'Payment verified successfully',
            'data' => new EnrollmentResource($enrollment)
        ]);
    }

    public function rejectPayment(Request $request, Enrollment $enrollment): JsonResponse
    {
        $request->validate([
            'reason' => 'required|string|max:500'
        ]);

        $enrollment->update([
            'status' => 'suspended',
            // You might want to add a rejection_reason field to the enrollments table
        ]);

        return response()->json([
            'message' => 'Payment rejected',
            'data' => new EnrollmentResource($enrollment)
        ]);
    }
}