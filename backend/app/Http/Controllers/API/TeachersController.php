<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TeachersController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['teacher'])
                    ->where('role', 'teacher')
                    ->where('is_active', true);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhereHas('teacher', function ($teacherQuery) use ($search) {
                      $teacherQuery->where('department', 'like', "%{$search}%")
                                  ->orWhere('qualification', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by specialization
        if ($request->filled('specialization')) {
            $query->whereHas('teacher', function ($teacherQuery) use ($request) {
                $teacherQuery->whereJsonContains('specializations', $request->specialization);
            });
        }

        // Filter by department
        if ($request->filled('department')) {
            $query->whereHas('teacher', function ($teacherQuery) use ($request) {
                $teacherQuery->where('department', $request->department);
            });
        }

        $teachers = $query->latest()->paginate(12);

        return response()->json([
            'data' => UserResource::collection($teachers->items()),
            'meta' => [
                'current_page' => $teachers->currentPage(),
                'last_page' => $teachers->lastPage(),
                'per_page' => $teachers->perPage(),
                'total' => $teachers->total(),
            ]
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $teacher = User::with(['teacher', 'programs.language'])
                      ->where('role', 'teacher')
                      ->where('is_active', true)
                      ->findOrFail($id);

        return response()->json([
            'data' => new UserResource($teacher)
        ]);
    }

    public function getSpecializations(): JsonResponse
    {
        $specializations = User::where('role', 'teacher')
                              ->where('is_active', true)
                              ->whereHas('teacher')
                              ->with('teacher')
                              ->get()
                              ->pluck('teacher.specializations')
                              ->flatten()
                              ->unique()
                              ->values();

        return response()->json([
            'data' => $specializations
        ]);
    }

    public function getDepartments(): JsonResponse
    {
        $departments = User::where('role', 'teacher')
                          ->where('is_active', true)
                          ->whereHas('teacher')
                          ->with('teacher')
                          ->get()
                          ->pluck('teacher.department')
                          ->unique()
                          ->filter()
                          ->values();

        return response()->json([
            'data' => $departments
        ]);
    }
}