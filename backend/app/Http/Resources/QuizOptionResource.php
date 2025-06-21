<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizOptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'option_text' => $this->option_text,
            'order' => $this->order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Only show correct answer to teachers/admins or after submission
            'is_correct' => $this->when(
                auth()->check() && (
                    auth()->user()->is_teacher || 
                    auth()->user()->is_admin ||
                    request()->route()->getName() === 'quiz.results'
                ),
                $this->is_correct
            ),
        ];
    }
}