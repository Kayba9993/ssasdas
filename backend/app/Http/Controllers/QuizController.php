<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizSubmission;
use App\Models\QuizSubmissions;
use App\Models\SubmissionAnswer;
use App\Models\Enrollment;
use App\Models\SubmissionAnswers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
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
        }

        // Get user's previous attempts
        $attempts = QuizSubmissions::where('quiz_id', $quiz->id)
                                 ->where('student_id', $user->id)
                                 ->orderBy('attempt_number')
                                 ->get();

        // Check if user can take the quiz
        $canTakeQuiz = $attempts->count() < $quiz->max_attempts;

        // Shuffle questions if enabled
        $questions = $quiz->questions;
        if ($quiz->shuffle_questions) {
            $questions = $questions->shuffle();
        }

        return response()->json([
            'quiz' => $quiz,
            'questions' => $questions,
            'attempts' => $attempts,
            'can_take_quiz' => $canTakeQuiz,
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
            'submission' => $submission,
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
                // Note: Short answer and essay questions would need manual grading

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
                'submission' => $submission->load('answers.question', 'answers.selectedOption'),
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
            'submission' => $submission,
        ]);
    }
}