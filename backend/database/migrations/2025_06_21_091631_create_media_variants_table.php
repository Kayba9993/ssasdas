<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_variants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('media_asset_id')->constrained()->onDelete('cascade');
            $table->string('variant_name'); // thumbnail, medium, large, etc.
            $table->string('file_path');
            $table->string('mime_type');
            $table->integer('file_size');
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->timestamps();
            
            $table->index(['media_asset_id', 'variant_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_variants');
    }
};