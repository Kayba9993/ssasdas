<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\QuizQuestions;
use App\Models\QuizOptions;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class QuizQuestionsController extends Controller
{
    public function index(Quiz $quiz): JsonResponse
    {
        $questions = $quiz->questions()->with('options')->orderBy('order')->get();

        return response()->json([
            'data' => $questions
        ]);
    }

    public function store(Request $request, Quiz $quiz): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher && !$user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'question' => 'required|string',
            'type' => 'required|in:multiple_choice,true_false,short_answer,essay',
            'points' => 'required|integer|min:1',
            'explanation' => 'sometimes|string',
            'image' => 'sometimes|string',
            'options' => 'required_if:type,multiple_choice,true_false|array|min:2',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
        ]);

        DB::beginTransaction();

        try {
            $question = QuizQuestions::create([
                'quiz_id' => $quiz->id,
                'question' => $request->question,
                'type' => $request->type,
                'points' => $request->points,
                'order' => $quiz->questions()->count() + 1,
                'explanation' => $request->explanation,
                'image' => $request->image,
            ]);

            if ($request->has('options')) {
                foreach ($request->options as $index => $optionData) {
                    QuizOptions::create([
                        'question_id' => $question->id,
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'],
                        'order' => $index + 1,
                    ]);
                }
            }

            // Update quiz total questions count
            $quiz->update(['total_questions' => $quiz->questions()->count()]);

            DB::commit();

            return response()->json([
                'message' => 'Question created successfully',
                'data' => $question->load('options')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create question'
            ], 500);
        }
    }

    public function show(QuizQuestions $question): JsonResponse
    {
        return response()->json([
            'data' => $question->load('options')
        ]);
    }

    public function update(Request $request, QuizQuestions $question): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->is_teacher && !$user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'question' => 'sometimes|string',
            'type' => 'sometimes|in:multiple_choice,true_false,short_answer,essay',
            'points' => 'sometimes|integer|min:1',
            'explanation' => 'sometimes|string',
            'image' => 'sometimes|string',
            'options' => 'sometimes|array|min:2',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
        ]);

        DB::beginTransaction();

        try {
            $question->update($request->only(['question', 'type', 'points', 'explanation', 'image']));

            if ($request->has('options')) {
                // Delete existing options
                $question->options()->delete();
                
                // Create new options
                foreach ($request->options as $index => $optionData) {
                    QuizOptions::create([
                        'question_id' => $question->id,
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'],
                        'order' => $index + 1,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Question updated successfully',
                'data' => $question->fresh()->load('options')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update question'
            ], 500);
        }
    }

    public function destroy(QuizQuestions $question): JsonResponse
    {
        $user = auth()->user();
        
        if (!$user->is_teacher && !$user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $quiz = $question->quiz;
        $question->delete();

        // Update quiz total questions count
        $quiz->update(['total_questions' => $quiz->questions()->count()]);

        return response()->json([
            'message' => 'Question deleted successfully'
        ]);
    }
}