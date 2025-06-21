<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionAnswerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'answer_text' => $this->answer_text,
            'is_correct' => $this->is_correct,
            'points_earned' => $this->points_earned,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'question' => $this->when($this->relationLoaded('question'), new QuizQuestionResource($this->question)),
            'selected_option' => $this->when($this->relationLoaded('selectedOption'), new QuizOptionResource($this->selectedOption)),
        ];
    }
}