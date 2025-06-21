<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Http\Resources\LanguageResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LanguagesController extends Controller
{
    public function index(): JsonResponse
    {
        $languages = Languages::active()
                             ->withCount('programs')
                             ->get();
        
        return response()->json([
            'data' => LanguageResource::collection($languages)
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $language = Languages::with(['programs' => function ($query) {
            $query->active()->with(['teacher', 'enrollments']);
        }])->findOrFail($id);

        return response()->json([
            'data' => new LanguageResource($language)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:languages',
            'description' => 'sometimes|string',
            'icon' => 'sometimes|string|max:255',
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'tags' => 'sometimes|array',
        ]);

        $language = Languages::create([
            ...$request->validated(),
            'slug' => \Str::slug($request->name),
        ]);

        return response()->json([
            'message' => 'Language created successfully',
            'data' => new LanguageResource($language)
        ], 201);
    }

    public function update(Request $request, Languages $language): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255|unique:languages,name,' . $language->id,
            'description' => 'sometimes|string',
            'icon' => 'sometimes|string|max:255',
            'difficulty_level' => 'sometimes|in:beginner,intermediate,advanced',
            'tags' => 'sometimes|array',
            'is_active' => 'sometimes|boolean',
        ]);

        $updateData = $request->validated();
        if (isset($updateData['name'])) {
            $updateData['slug'] = \Str::slug($updateData['name']);
        }

        $language->update($updateData);

        return response()->json([
            'message' => 'Language updated successfully',
            'data' => new LanguageResource($language)
        ]);
    }

    public function destroy(Languages $language): JsonResponse
    {
        // Check if language has programs
        if ($language->programs()->exists()) {
            return response()->json([
                'message' => 'Cannot delete language with existing programs'
            ], 409);
        }

        $language->delete();

        return response()->json([
            'message' => 'Language deleted successfully'
        ]);
    }
}