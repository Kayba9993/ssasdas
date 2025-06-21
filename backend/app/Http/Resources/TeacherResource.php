<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'department' => $this->department,
            'bio' => $this->bio,
            'specializations' => $this->specializations,
            'years_experience' => $this->years_experience,
            'qualification' => $this->qualification,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'user' => $this->when($this->relationLoaded('user'), new UserResource($this->user)),
        ];
    }
}