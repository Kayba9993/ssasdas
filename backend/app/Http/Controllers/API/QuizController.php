<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizSubmissions;
use App\Models\SubmissionAnswers;
use App\Models\Enrollment;
use App\Http\Resources\QuizResource;
use App\Http\Resources\QuizSubmissionResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $quizzes = Quiz::with(['program'])
                      ->where('teacher_id', $user->id)
                      ->latest()
                      ->paginate(10);

        return response()->json([
            'data' => QuizResource::collection($quizzes->items()),
            'meta' => [
                'current_page' => $quizzes->currentPage(),
                'last_page' => $quizzes->lastPage(),
                'per_page' => $quizzes->perPage(),
                'total' => $quizzes->total(),
            ]
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $user = auth()->user();
        
        $quiz = Quiz::with(['program', 'questions.options'])
                   ->findOrFail($id);

        // Check if user is enrolled in the program
        if ($user->is_student) {
            $enrollment = Enrollment::where('student_id', $user->id)
                                   ->where('program_id', $quiz->program_id)
                                   ->first();

            if (!$enrollment) {
                return response()->json([
                    'message' => 'You must be enrolled in the program to access this quiz'
                ], 403);
            }

            // Get user's previous attempts
            $attempts = QuizSubmissions::where('quiz_id', $quiz->id)
                                     ->where('student_id', $user->id)
                                     ->orderBy('attempt_number')
                                     ->get();

            // Check if user can take the quiz
            $canTakeQuiz = $attempts->count() < $quiz->max_attempts;

            return response()->json([
                'data' => new QuizResource($quiz),
                'attempts' => QuizSubmissionResource::collection($attempts),
                'can_take_quiz' => $canTakeQuiz,
            ]);
        }

        return response()->json([
            'data' => new QuizResource($quiz)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher) {
            return response()->json(['message' => 'Only teachers can create quizzes'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'program_id' => 'required|exists:programs,id',
            'time_limit_minutes' => 'sometimes|integer|min:5|max:480',
            'passing_score' => 'required|integer|min:0|max:100',
            'shuffle_questions' => 'sometimes|boolean',
            'show_results_immediately' => 'sometimes|boolean',
            'max_attempts' => 'required|integer|min:1|max:10',
            'available_from' => 'sometimes|date',
            'available_until' => 'sometimes|date|after:available_from',
        ]);

        // Verify teacher owns the program
        $program = \App\Models\Programs::findOrFail($request->program_id);
        if ($program->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $quiz = Quiz::create([
            ...$request->validated(),
            'teacher_id' => $user->id,
            'total_questions' => 0, // Will be updated when questions are added
        ]);

        return response()->json([
            'message' => 'Quiz created successfully',
            'data' => new QuizResource($quiz->load('program'))
        ], 201);
    }

    public function update(Request $request, Quiz $quiz): JsonResponse
    {
        $user = $request->user();
        
        // Check authorization
        if ($user->is_teacher && $quiz->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'time_limit_minutes' => 'sometimes|integer|min:5|max:480',
            'passing_score' => 'sometimes|integer|min:0|max:100',
            'shuffle_questions' => 'sometimes|boolean',
            'show_results_immediately' => 'sometimes|boolean',
            'max_attempts' => 'sometimes|integer|min:1|max:10',
            'available_from' => 'sometimes|date',
            'available_until' => 'sometimes|date|after:available_from',
            'is_active' => 'sometimes|boolean',
        ]);

        $quiz->update($request->validated());

        return response()->json([
            'message' => 'Quiz updated successfully',
            'data' => new QuizResource($quiz->fresh()->load('program'))
        ]);
    }

    public function destroy(Quiz $quiz): JsonResponse
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->is_teacher && $quiz->teacher_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $quiz->delete();

        return response()->json([
            'message' => 'Quiz deleted successfully'
        ]);
    }

    public function start(string $id): JsonResponse
    {
        $user = auth()->user();
        $quiz = Quiz::findOrFail($id);

        // Check enrollment
        $enrollment = Enrollment::where('student_id', $user->id)
                               ->where('program_id', $quiz->program_id)
                               ->first();

        if (!$enrollment) {
            return response()->json([
                'message' => 'You must be enrolled in the program to take this quiz'
            ], 403);
        }

        // Check attempts limit
        $attemptsCount = QuizSubmissions::where('quiz_id', $quiz->id)
                                      ->where('student_id', $user->id)
                                      ->count();

        if ($attemptsCount >= $quiz->max_attempts) {
            return response()->json([
                'message' => 'Maximum attempts reached'
            ], 409);
        }

        // Create new submission
        $submission = QuizSubmissions::create([
            'quiz_id' => $quiz->id,
            'student_id' => $user->id,
            'attempt_number' => $attemptsCount + 1,
            'max_possible_score' => $quiz->questions->sum('points'),
            'started_at' => now(),
        ]);

        return response()->json([
            'message' => 'Quiz started successfully',
            'data' => new QuizSubmissionResource($submission),
        ], 201);
    }

    public function submit(Request $request, string $id): JsonResponse
    {
        $user = auth()->user();
        $quiz = Quiz::with('questions.options')->findOrFail($id);

        $request->validate([
            'submission_id' => 'required|exists:quiz_submissions,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:quiz_questions,id',
            'answers.*.selected_option_id' => 'nullable|exists:quiz_options,id',
            'answers.*.answer_text' => 'nullable|string',
        ]);

        $submission = QuizSubmissions::where('id', $request->submission_id)
                                   ->where('student_id', $user->id)
                                   ->where('quiz_id', $quiz->id)
                                   ->firstOrFail();

        if ($submission->submitted_at) {
            return response()->json([
                'message' => 'Quiz already submitted'
            ], 409);
        }

        DB::beginTransaction();

        try {
            $totalScore = 0;

            foreach ($request->answers as $answerData) {
                $question = $quiz->questions->find($answerData['question_id']);
                $isCorrect = false;
                $pointsEarned = 0;

                if ($question->type === 'multiple_choice' && isset($answerData['selected_option_id'])) {
                    $selectedOption = $question->options->find($answerData['selected_option_id']);
                    $isCorrect = $selectedOption && $selectedOption->is_correct;
                    $pointsEarned = $isCorrect ? $question->points : 0;
                } elseif ($question->type === 'true_false' && isset($answerData['selected_option_id'])) {
                    $selectedOption = $question->options->find($answerData['selected_option_id']);
                    $isCorrect = $selectedOption && $selectedOption->is_correct;
                    $pointsEarned = $isCorrect ? $question->points : 0;
                }

                SubmissionAnswers::create([
                    'submission_id' => $submission->id,
                    'question_id' => $question->id,
                    'selected_option_id' => $answerData['selected_option_id'] ?? null,
                    'answer_text' => $answerData['answer_text'] ?? null,
                    'is_correct' => $isCorrect,
                    'points_earned' => $pointsEarned,
                ]);

                $totalScore += $pointsEarned;
            }

            // Calculate percentage and pass status
            $percentage = ($totalScore / $submission->max_possible_score) * 100;
            $isPassed = $percentage >= $quiz->passing_score;

            $submission->update([
                'total_score' => $totalScore,
                'percentage' => $percentage,
                'is_passed' => $isPassed,
                'submitted_at' => now(),
                'time_taken_minutes' => now()->diffInMinutes($submission->started_at),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Quiz submitted successfully',
                'data' => new QuizSubmissionResource($submission->load('answers.question', 'answers.selectedOption')),
                'show_results' => $quiz->show_results_immediately,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to submit quiz'
            ], 500);
        }
    }

    public function results(string $submissionId): JsonResponse
    {
        $user = auth()->user();

        $submission = QuizSubmissions::with([
            'quiz.questions.options',
            'answers.question.options',
            'answers.selectedOption'
        ])
        ->where('student_id', $user->id)
        ->findOrFail($submissionId);

        if (!$submission->quiz->show_results_immediately && !$submission->submitted_at) {
            return response()->json([
                'message' => 'Results not available yet'
            ], 403);
        }

        return response()->json([
            'data' => new QuizSubmissionResource($submission),
        ]);
    }
}