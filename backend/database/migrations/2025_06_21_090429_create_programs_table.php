<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('curriculum')->nullable();
            $table->foreignUuid('languages_id')->constrained('languages')->onDelete('cascade');
            $table->foreignUuid('teacher_id')->constrained('users')->onDelete('cascade');
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
            $table->integer('duration_weeks');
            $table->decimal('price', 10, 2)->default(0);
            $table->string('thumbnail')->nullable();
            $table->json('requirements')->nullable();
            $table->json('outcomes')->nullable();
            $table->integer('max_students')->default(50);
            $table->boolean('is_active')->default(true);
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['languages_id', 'teacher_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};