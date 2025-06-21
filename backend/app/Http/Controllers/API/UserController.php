<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['student', 'teacher']);

        // Filter by role
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // Search by name or email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $users = $query->latest()->paginate(20);

        return response()->json([
            'data' => UserResource::collection($users->items()),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ]
        ]);
    }

    public function show(User $user): JsonResponse
    {
        $user->load(['student', 'teacher', 'enrollments.program']);

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'is_active' => 'sometimes|boolean',
            'role' => 'sometimes|in:student,teacher,admin',
        ]);

        $user->update($request->only(['name', 'email', 'is_active', 'role']));

        return response()->json([
            'message' => 'User updated successfully',
            'data' => new UserResource($user)
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        // Soft delete
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function teacherStudents(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $students = User::with(['student', 'enrollments.program'])
                       ->where('role', 'student')
                       ->whereHas('enrollments.program', function ($query) use ($user) {
                           $query->where('teacher_id', $user->id);
                       })
                       ->latest()
                       ->paginate(20);

        return response()->json([
            'data' => UserResource::collection($students->items()),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ]
        ]);
    }
}