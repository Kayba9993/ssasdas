<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LiveSessionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'scheduled_at' => $this->scheduled_at,
            'duration_minutes' => $this->duration_minutes,
            'status' => $this->status,
            'max_participants' => $this->max_participants,
            'recording_urls' => $this->recording_urls,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Conditional fields based on user role
            'meeting_url' => $this->when(
                auth()->check() && (auth()->user()->is_teacher || auth()->user()->is_admin),
                $this->meeting_url
            ),
            'meeting_id' => $this->when(
                auth()->check() && (auth()->user()->is_teacher || auth()->user()->is_admin),
                $this->meeting_id
            ),
            'meeting_password' => $this->when(
                auth()->check() && (auth()->user()->is_teacher || auth()->user()->is_admin),
                $this->meeting_password
            ),
            
            'program' => $this->when($this->relationLoaded('program'), new ProgramResource($this->program)),
            'teacher' => $this->when($this->relationLoaded('teacher'), new UserResource($this->teacher)),
        ];
    }
}