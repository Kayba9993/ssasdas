<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LiveSessions;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LiveSessionsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = LiveSessions::with(['program.language', 'teacher'])
                            ->upcoming()
                            ->orderBy('scheduled_at');

        // Filter by program if specified
        if ($request->filled('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        // Filter by language if specified
        if ($request->filled('language_id')) {
            $query->whereHas('program', function ($q) use ($request) {
                $q->where('language_id', $request->language_id);
            });
        }

        $sessions = $query->paginate(10);

        return response()->json($sessions);
    }

    public function show(string $id): JsonResponse
    {
        $session = LiveSessions::with(['program.language', 'teacher'])
                              ->findOrFail($id);

        // Check if current user is enrolled in the program
        $isEnrolled = false;
        if (auth()->check() && auth()->user()->is_student) {
            $isEnrolled = Enrollment::where('student_id', auth()->id())
                                   ->where('program_id', $session->program_id)
                                   ->exists();
        }

        return response()->json([
            'session' => $session,
            'is_enrolled' => $isEnrolled,
        ]);
    }

    public function join(string $id): JsonResponse
    {
        $user = auth()->user();
        $session = LiveSessions::findOrFail($id);

        // Check if user is enrolled in the program
        if ($user->is_student) {
            $enrollment = Enrollment::where('student_id', $user->id)
                                   ->where('program_id', $session->program_id)
                                   ->first();

            if (!$enrollment) {
                return response()->json([
                    'message' => 'You must be enrolled in the program to join this session'
                ], 403);
            }
        }

        // Check if session is live or upcoming
        if (!in_array($session->status, ['scheduled', 'live'])) {
            return response()->json([
                'message' => 'This session is not available for joining'
            ], 409);
        }

        return response()->json([
            'meeting_url' => $session->meeting_url,
            'meeting_id' => $session->meeting_id,
            'meeting_password' => $session->meeting_password,
        ]);
    }
}