<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Programs extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'curriculum',
        'language_id',
        'teacher_id',
        'difficulty_level',
        'duration_weeks',
        'price',
        'thumbnail',
        'requirements',
        'outcomes',
        'max_students',
        'is_active',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'requirements' => 'array',
        'outcomes' => 'array',
        'price' => 'decimal:2',
        'duration_weeks' => 'integer',
        'max_students' => 'integer',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Languages::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function liveSessions(): HasMany
    {
        return $this->hasMany(LiveSessions::class);
    }

    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}