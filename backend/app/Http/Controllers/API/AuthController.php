<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:student,teacher',
            'student_id' => 'required_if:role,student|string|unique:students,student_id',
            'employee_id' => 'required_if:role,teacher|string|unique:teachers,employee_id',
            'department' => 'required_if:role,teacher|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Create role-specific profile
        if ($request->role === 'student') {
            Student::create([
                'user_id' => $user->id,
                'student_id' => $request->student_id,
                'level' => 'beginner',
            ]);
        } elseif ($request->role === 'teacher') {
            Teacher::create([
                'user_id' => $user->id,
                'employee_id' => $request->employee_id,
                'department' => $request->department,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => new UserResource($user->load($request->role)),
                'token' => $token,
            ]
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => 'Account is inactive. Please contact administrator.'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'user' => new UserResource($user->load($user->role)),
                'token' => $token,
            ]
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'data' => new UserResource($request->user()->load($request->user()->role))
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'avatar' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string|max:1000',
            'phone' => 'sometimes|string|max:20',
        ]);

        $user->update($request->only(['name', 'email', 'avatar']));

        // Update role-specific profile
        if ($user->is_student && $user->student) {
            $user->student->update($request->only(['bio', 'phone']));
        } elseif ($user->is_teacher && $user->teacher) {
            $user->teacher->update($request->only(['bio']));
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => new UserResource($user->fresh()->load($user->role))
        ]);
    }
}