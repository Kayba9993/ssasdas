<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizSubmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attempt_number' => $this->attempt_number,
            'total_score' => $this->total_score,
            'max_possible_score' => $this->max_possible_score,
            'percentage' => $this->percentage,
            'is_passed' => $this->is_passed,
            'started_at' => $this->started_at,
            'submitted_at' => $this->submitted_at,
            'time_taken_minutes' => $this->time_taken_minutes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'quiz' => $this->when($this->relationLoaded('quiz'), new QuizResource($this->quiz)),
            'student' => $this->when($this->relationLoaded('student'), new UserResource($this->student)),
            'answers' => $this->when($this->relationLoaded('answers'), SubmissionAnswerResource::collection($this->answers)),
        ];
    }
}