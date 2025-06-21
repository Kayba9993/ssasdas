<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('quiz_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('student_id')->constrained('users')->onDelete('cascade');
            $table->integer('attempt_number');
            $table->integer('total_score')->default(0);
            $table->integer('max_possible_score');
            $table->decimal('percentage', 5, 2)->default(0);
            $table->boolean('is_passed')->default(false);
            $table->datetime('started_at');
            $table->datetime('submitted_at')->nullable();
            $table->integer('time_taken_minutes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['quiz_id', 'student_id', 'attempt_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_submissions');
    }
};