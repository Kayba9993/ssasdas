<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProgramsController;
use App\Http\Controllers\API\QuizController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Authentication routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Public program routes
    Route::get('/programs', [ProgramsController::class, 'index']);
    Route::get('/programs/{id}', [ProgramsController::class, 'show']);
    
    // Languages routes
    Route::get('/languages', function () {
        return response()->json([
            'data' => \App\Models\Languages::active()->get()
        ]);
    });
});

// Protected routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    
    // Student routes
    Route::middleware('role:student')->group(function () {
        Route::post('/programs/{id}/enroll', [ProgramsController::class, 'enroll']);
        Route::get('/my-enrollments', [ProgramsController::class, 'myEnrollments']);
        
        // Quiz routes for students
        Route::get('/quizzes/{id}', [QuizController::class, 'show']);
        Route::post('/quizzes/{id}/start', [QuizController::class, 'start']);
        Route::post('/quizzes/{id}/submit', [QuizController::class, 'submit']);
        Route::get('/quiz-submissions/{id}/results', [QuizController::class, 'results']);
    });
    
    // Teacher routes
    Route::middleware('role:teacher')->group(function () {
        Route::get('/teacher/programs', function (Request $request) {
            return response()->json([
                'data' => $request->user()->programs()->with(['language', 'enrollments'])->get()
            ]);
        });
        
        Route::get('/teacher/students', function (Request $request) {
            $programs = $request->user()->programs()->with(['enrollments.student.user'])->get();
            $students = collect();
            
            foreach ($programs as $program) {
                foreach ($program->enrollments as $enrollment) {
                    $students->push([
                        'id' => $enrollment->student->id,
                        'name' => $enrollment->student->name,
                        'email' => $enrollment->student->email,
                        'program' => $program->title,
                        'enrolled_at' => $enrollment->enrolled_at,
                        'progress' => $enrollment->progress_percentage,
                    ]);
                }
            }
            
            return response()->json(['data' => $students->unique('id')->values()]);
        });
    });
    
    // Admin routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/stats', function () {
            return response()->json([
                'data' => [
                    'total_users' => \App\Models\User::count(),
                    'total_students' => \App\Models\User::where('role', 'student')->count(),
                    'total_teachers' => \App\Models\User::where('role', 'teacher')->count(),
                    'total_programs' => \App\Models\Programs::count(),
                    'active_programs' => \App\Models\Programs::active()->count(),
                    'total_enrollments' => \App\Models\Enrollment::count(),
                    'pending_payments' => \App\Models\Enrollment::where('status', 'enrolled')->count(),
                ]
            ]);
        });
        
        Route::get('/admin/users', function () {
            return response()->json([
                'data' => \App\Models\User::with(['student', 'teacher'])->paginate(20)
            ]);
        });
        
        Route::get('/admin/programs', function () {
            return response()->json([
                'data' => \App\Models\Programs::with(['language', 'teacher', 'enrollments'])->paginate(20)
            ]);
        });
    });
});

// Fallback route for API
Route::fallback(function () {
    return response()->json([
        'message' => 'API endpoint not found'
    ], 404);
});