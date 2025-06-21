<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'total_questions' => $this->total_questions,
            'time_limit_minutes' => $this->time_limit_minutes,
            'passing_score' => $this->passing_score,
            'shuffle_questions' => $this->shuffle_questions,
            'show_results_immediately' => $this->show_results_immediately,
            'max_attempts' => $this->max_attempts,
            'available_from' => $this->available_from,
            'available_until' => $this->available_until,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'program' => $this->when($this->relationLoaded('program'), new ProgramResource($this->program)),
            'teacher' => $this->when($this->relationLoaded('teacher'), new UserResource($this->teacher)),
            'questions' => $this->when($this->relationLoaded('questions'), QuizQuestionResource::collection($this->questions)),
            'submissions' => $this->when($this->relationLoaded('submissions'), QuizSubmissionResource::collection($this->submissions)),
        ];
    }
}