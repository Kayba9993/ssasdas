<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizQuestions extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'quiz_id',
        'question',
        'type',
        'points',
        'order',
        'explanation',
        'image',
    ];

    protected $casts = [
        'points' => 'integer',
        'order' => 'integer',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(QuizOptions::class, 'question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SubmissionAnswers::class, 'question_id');
    }
}