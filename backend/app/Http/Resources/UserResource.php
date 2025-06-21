<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'avatar' => $this->avatar,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Conditional relationships
            'student' => $this->when($this->role === 'student' && $this->relationLoaded('student'), 
                new StudentResource($this->student)
            ),
            'teacher' => $this->when($this->role === 'teacher' && $this->relationLoaded('teacher'), 
                new TeacherResource($this->teacher)
            ),
            'enrollments' => $this->when($this->relationLoaded('enrollments'), 
                EnrollmentResource::collection($this->enrollments)
            ),
        ];
    }
}