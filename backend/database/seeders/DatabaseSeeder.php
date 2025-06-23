<?php

namespace Database\Seeders;

use App\Models\Languages;
use App\Models\Programs;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Language;
use App\Models\Program;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'System Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create sample teacher
        $teacherUser = User::create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah@languageapp.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $teacherUser->id,
            'employee_id' => 'TEACH001',
            'department' => 'Language Studies',
            'bio' => 'Experienced language instructor with 10+ years of teaching.',
            'specializations' => ['Spanish', 'Italian'],
            'years_experience' => 10,
            'qualification' => 'PhD in Linguistics',
            'phone' => '+212612345678',
            'hourly_rate' => 50.00,
            'is_available' => true,
        ]);

        // // Create sample student
        // $studentUser = User::create([
        //     'name' => 'John Doe',
        //     'email' => 'john@example.com',
        //     'password' => Hash::make('password'),
        //     'role' => 'student',
        // ]);

        // $student = Student::create([
        //     'user_id' => $studentUser->id,
        //     'student_id' => 'STU001',
        //     'level' => 'beginner',
        //     'skills' => ['listening', 'reading'],
        //     'phone' => '+212612345679',
        //     'learning_goals' => 'Improve conversational skills',
        //     'preferred_schedule' => ['evening', 'weekend'],
        // ]);

        // Create languages
        $languages = [
            [
                'name' => 'الإنجليزية',
                'slug' => 'english',
                'description' => 'Learn English from beginner to advanced level',
                'difficulty_level' => 'intermediate',
                'tags' => ['popular', 'business'],
                'icon' => '🇬🇧',
            ],[
                'name' => 'الإسبانية',
                'slug' => 'spanish',
                'description' => 'Learn Spanish with native speakers',
                'difficulty_level' => 'beginner',
                'tags' => ['popular', 'romance-language'],
                'icon' => '🇪🇸',
            ],
            
        ];

        foreach ($languages as $languageData) {
            $language = Languages::create($languageData);

            // Create a sample program for each language
            Programs::create([
                'title' => "Complete {$language->name} Course",
                'slug' => "complete-{$language->slug}-course",
                'description' => "A comprehensive {$language->name} course covering all skill levels from beginner to advanced.",
                'curriculum' => "Week 1-4: Basics\nWeek 5-8: Intermediate\nWeek 9-12: Advanced",
                'languages_id' => $language->id,
                'teacher_id' => $teacherUser->id,
                'difficulty_level' => 'beginner',
                'duration_weeks' => 12,
                'price' => 299.99,
                'requirements' => ['Basic computer skills', 'Internet connection'],
                'outcomes' => ['Conversational fluency', 'Reading comprehension', 'Writing skills'],
                'max_students' => 25,
                'start_date' => now()->addWeek(),
                'end_date' => now()->addWeeks(13),
            ]);
        }
    }
}