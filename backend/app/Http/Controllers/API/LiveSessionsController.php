<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LiveSessions;
use App\Models\Enrollment;
use App\Http\Resources\LiveSessionResource;
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

        // Filter by teacher (for teacher dashboard)
        if ($request->filled('teacher_id')) {
            $query->where('teacher_id', $request->teacher_id);
        }

        $sessions = $query->paginate(10);

        return response()->json([
            'data' => LiveSessionResource::collection($sessions->items()),
            'meta' => [
                'current_page' => $sessions->currentPage(),
                'last_page' => $sessions->lastPage(),
                'per_page' => $sessions->perPage(),
                'total' => $sessions->total(),
            ]
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $session = LiveSessions::with(['program.language', 'teacher'])
                              ->findOrFail($id);

        return response()->json([
            'data' => new LiveSessionResource($session)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Only teachers can create sessions'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'program_id' => 'required|exists:programs,id',
            'scheduled_at' => 'required|date|after:now',
            'duration_minutes' => 'required|integer|min:15|max:480',
            'meeting_url' => 'sometimes|url',
            'meeting_id' => 'sometimes|string',
            'meeting_password' => 'sometimes|string',
            'max_participants' => 'required|integer|min:1|max:500',
        ]);

        // Verify teacher owns the program
        $program = \App\Models\Programs::findOrFail($request->program_id);
        if ($program->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $session = LiveSessions::create([
            ...$request->validated(),
            'teacher_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Live session created successfully',
            'data' => new LiveSessionResource($session->load(['program', 'teacher']))
        ], 201);
    }

    public function update(Request $request, LiveSessions $session): JsonResponse
    {
        $user = $request->user();
        
        // Check authorization
        if ($user->is_teacher && $session->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'scheduled_at' => 'sometimes|date',
            'duration_minutes' => 'sometimes|integer|min:15|max:480',
            'meeting_url' => 'sometimes|url',
            'meeting_id' => 'sometimes|string',
            'meeting_password' => 'sometimes|string',
            'max_participants' => 'sometimes|integer|min:1|max:500',
            'status' => 'sometimes|in:scheduled,live,completed,cancelled',
        ]);

        $session->update($request->validated());

        return response()->json([
            'message' => 'Live session updated successfully',
            'data' => new LiveSessionResource($session->fresh()->load(['program', 'teacher']))
        ]);
    }

    public function destroy(LiveSessions $session): JsonResponse
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->is_teacher && $session->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $session->delete();

        return response()->json([
            'message' => 'Live session deleted successfully'
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

        // Check if session is available for joining
        if (!in_array($session->status, ['scheduled', 'live'])) {
            return response()->json([
                'message' => 'This session is not available for joining'
            ], 409);
        }

        return response()->json([
            'data' => [
                'meeting_url' => $session->meeting_url,
                'meeting_id' => $session->meeting_id,
                'meeting_password' => $session->meeting_password,
                'session' => new LiveSessionResource($session),
            ]
        ]);
    }
}