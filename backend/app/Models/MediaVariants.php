<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MediaVariants extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'media_asset_id',
        'variant_name',
        'file_path',
        'mime_type',
        'file_size',
        'width',
        'height',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    public function mediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAssets::class);
    }

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }
}