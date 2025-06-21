<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnrollmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'progress_percentage' => $this->progress_percentage,
            'enrolled_at' => $this->enrolled_at,
            'completed_at' => $this->completed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            'student' => $this->when($this->relationLoaded('student'), new UserResource($this->student)),
            'program' => $this->when($this->relationLoaded('program'), new ProgramResource($this->program)),
        ];
    }
}