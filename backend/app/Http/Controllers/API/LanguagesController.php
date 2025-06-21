<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Languages;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LanguagesController extends Controller
{
    public function index(): JsonResponse
    {
        $languages = Languages::active()->get();
        
        return response()->json([
            'data' => $languages
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $language = Languages::with(['programs' => function ($query) {
            $query->active()->with(['teacher', 'enrollments']);
        }])->findOrFail($id);

        return response()->json([
            'data' => $language
        ]);
    }
}