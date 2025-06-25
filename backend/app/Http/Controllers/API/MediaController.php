<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MediaAssets;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'type' => 'required|in:image,video,audio,document',
        ]);

        $file = $request->file('file');
        $type = $request->input('type');

        // Validate file type based on type parameter
        $allowedMimes = [
            'image' => ['jpeg', 'jpg', 'png', 'gif', 'webp'],
            'video' => ['mp4', 'avi', 'mov', 'wmv'],
            'audio' => ['mp3', 'wav', 'ogg'],
            'document' => ['pdf', 'doc', 'docx', 'txt'],
        ];

        $extension = $file->getClientOriginalExtension();
        if (!in_array(strtolower($extension), $allowedMimes[$type])) {
            return response()->json([
                'message' => 'Invalid file type for the specified category'
            ], 422);
        }

        // Generate unique filename
        $filename = Str::uuid() . '.' . $extension;
        $path = $type . 's/' . $filename;

        // Store file
        $file->storeAs('app/public/' . $type . 's', $filename);

        // Create media asset record
        $mediaAsset = MediaAssets::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'original_filename' => $file->getClientOriginalName(),
            'file_path' => $path,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'type' => $type,
            'uploaded_by' => auth()->id(),
            'metadata' => [
                'original_name' => $file->getClientOriginalName(),
                'uploaded_at' => now()->toISOString(),
            ],
        ]);

        return response()->json([
            'message' => 'File uploaded successfully',
            'media' => $mediaAsset,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = MediaAssets::with('uploader');

        // Filter by type
        if ($request->filled('type')) {
            $query->byType($request->type);
        }

        // Filter by uploader (for teachers/admins)
        if ($request->filled('uploaded_by')) {
            $query->where('uploaded_by', $request->uploaded_by);
        }

        $media = $query->latest()->paginate(20);

        return response()->json($media);
    }

    public function show(string $id): JsonResponse
    {
        $media = MediaAssets::with(['uploader', 'variants'])->findOrFail($id);

        return response()->json([
            'data' => $media
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $media = MediaAssets::findOrFail($id);

        // Check if user can delete this media
        if (auth()->user()->role !== 'admin' && $media->uploaded_by !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized to delete this media'
            ], 403);
        }

        // Delete file from storage
        Storage::delete('public/' . $media->file_path);

        // Delete variants if any
        foreach ($media->variants as $variant) {
            Storage::delete('public/' . $variant->file_path);
        }

        // Delete record
        $media->delete();

        return response()->json([
            'message' => 'Media deleted successfully'
        ]);
    }
}