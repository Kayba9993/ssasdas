<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_assets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('original_filename');
            $table->string('file_path');
            $table->string('mime_type');
            $table->integer('file_size');
            $table->enum('type', ['image', 'video', 'audio', 'document']);
            $table->foreignUuid('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['type', 'uploaded_by']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_assets');
    }
};
