<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'icon' => $this->icon,
            'difficulty_level' => $this->difficulty_level,
            'tags' => $this->tags,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'programs' => $this->when($this->relationLoaded('programs'), ProgramResource::collection($this->programs)),
            'programs_count' => $this->when($this->relationLoaded('programs'), $this->programs->count()),
        ];
    }
}