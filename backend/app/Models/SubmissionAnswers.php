<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionAnswers extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'submission_id',
        'question_id',
        'selected_option_id',
        'answer_text',
        'is_correct',
        'points_earned',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'points_earned' => 'integer',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(QuizSubmissions::class, 'submission_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(QuizQuestions::class, 'question_id');
    }

    public function selectedOption(): BelongsTo
    {
        return $this->belongsTo(QuizOptions::class, 'selected_option_id');
    }
}