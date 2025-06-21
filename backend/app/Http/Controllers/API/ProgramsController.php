<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Programs;
use App\Http\Resources\ProgramResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProgramsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Programs::with(['language', 'teacher', 'enrollments'])
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

        // Filter by teacher (for teacher dashboard)
        if ($request->filled('teacher_id')) {
            $query->where('teacher_id', $request->teacher_id);
        }

        $programs = $query->paginate(12);

        return response()->json([
            'data' => ProgramResource::collection($programs->items()),
            'meta' => [
                'current_page' => $programs->currentPage(),
                'last_page' => $programs->lastPage(),
                'per_page' => $programs->perPage(),
                'total' => $programs->total(),
            ]
        ]);
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
            },
            'enrollments'
        ])->findOrFail($id);

        return response()->json([
            'data' => new ProgramResource($program)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Only teachers can create programs'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'language_id' => 'required|exists:languages,id',
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'duration_weeks' => 'required|integer|min:1|max:52',
            'price' => 'required|numeric|min:0',
            'requirements' => 'sometimes|array',
            'outcomes' => 'sometimes|array',
            'max_students' => 'required|integer|min:1|max:100',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $program = Programs::create([
            ...$request->validated(),
            'teacher_id' => $user->id,
            'slug' => \Str::slug($request->title),
        ]);

        return response()->json([
            'message' => 'Program created successfully',
            'data' => new ProgramResource($program->load(['language', 'teacher']))
        ], 201);
    }

    public function update(Request $request, Programs $program): JsonResponse
    {
        $user = $request->user();
        
        // Check authorization
        if ($user->is_teacher && $program->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'language_id' => 'sometimes|exists:languages,id',
            'difficulty_level' => 'sometimes|in:beginner,intermediate,advanced',
            'duration_weeks' => 'sometimes|integer|min:1|max:52',
            'price' => 'sometimes|numeric|min:0',
            'requirements' => 'sometimes|array',
            'outcomes' => 'sometimes|array',
            'max_students' => 'sometimes|integer|min:1|max:100',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'is_active' => 'sometimes|boolean',
        ]);

        $updateData = $request->validated();
        if (isset($updateData['title'])) {
            $updateData['slug'] = \Str::slug($updateData['title']);
        }

        $program->update($updateData);

        return response()->json([
            'message' => 'Program updated successfully',
            'data' => new ProgramResource($program->fresh()->load(['language', 'teacher']))
        ]);
    }

    public function destroy(Programs $program): JsonResponse
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->is_teacher && $program->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $program->delete();

        return response()->json([
            'message' => 'Program deleted successfully'
        ]);
    }
}