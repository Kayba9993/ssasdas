<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'curriculum' => $this->curriculum,
            'difficulty_level' => $this->difficulty_level,
            'duration_weeks' => $this->duration_weeks,
            'price' => $this->price,
            'thumbnail' => $this->thumbnail,
            'requirements' => $this->requirements,
            'outcomes' => $this->outcomes,
            'max_students' => $this->max_students,
            'is_active' => $this->is_active,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Relationships
            'language' => $this->when($this->relationLoaded('language'), new LanguageResource($this->language)),
            'teacher' => $this->when($this->relationLoaded('teacher'), new UserResource($this->teacher)),
            'enrollments' => $this->when($this->relationLoaded('enrollments'), EnrollmentResource::collection($this->enrollments)),
            'live_sessions' => $this->when($this->relationLoaded('liveSessions'), LiveSessionResource::collection($this->liveSessions)),
            'quizzes' => $this->when($this->relationLoaded('quizzes'), QuizResource::collection($this->quizzes)),
            
            // Computed fields
            'enrolled_students_count' => $this->when($this->relationLoaded('enrollments'), $this->enrollments->count()),
            'is_enrolled' => $this->when(auth()->check() && auth()->user()->is_student, function () {
                return $this->enrollments->where('student_id', auth()->id())->isNotEmpty();
            }),
        ];
    }
}