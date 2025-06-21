<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizQuestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'type' => $this->type,
            'points' => $this->points,
            'order' => $this->order,
            'explanation' => $this->explanation,
            'image' => $this->image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'options' => $this->when($this->relationLoaded('options'), QuizOptionResource::collection($this->options)),
        ];
    }
}