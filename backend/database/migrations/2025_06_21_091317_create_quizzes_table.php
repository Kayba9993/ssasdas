<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignUuid('program_id')->constrained('programs')->onDelete('cascade');
            $table->foreignUuid('teacher_id')->constrained('users')->onDelete('cascade');
            $table->integer('total_questions');
            $table->integer('time_limit_minutes')->nullable();
            $table->integer('passing_score')->default(70);
            $table->boolean('shuffle_questions')->default(false);
            $table->boolean('show_results_immediately')->default(true);
            $table->integer('max_attempts')->default(1);
            $table->datetime('available_from')->nullable();
            $table->datetime('available_until')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['program_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};