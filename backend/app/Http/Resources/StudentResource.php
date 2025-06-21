<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'date_of_birth' => $this->date_of_birth,
            'phone' => $this->phone,
            'bio' => $this->bio,
            'skills' => $this->skills,
            'level' => $this->level,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'user' => $this->when($this->relationLoaded('user'), new UserResource($this->user)),
        ];
    }
}