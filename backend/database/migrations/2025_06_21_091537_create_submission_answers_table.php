<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_answers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('submission_id')->constrained('quiz_submissions')->onDelete('cascade');
            $table->foreignUuid('question_id')->constrained('quiz_questions')->onDelete('cascade');
            $table->foreignUuid('selected_option_id')->nullable()->constrained('quiz_options')->onDelete('cascade');
            $table->text('answer_text')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('points_earned')->default(0);
            $table->timestamps();
            
            $table->index(['submission_id', 'question_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_answers');
    }
};