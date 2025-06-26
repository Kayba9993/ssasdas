<?php

namespace App\Console\Commands;

use App\Mail\WeeklyStudentReport;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SendWeeklyStudentReport extends Command
{
    protected $signature = 'report:weekly-students {--force : Force send even if no registrations}';
    protected $description = 'Send weekly student registration report to admin';

    public function handle(): int
    {
        $weekStart = Carbon::now()->subWeek()->startOfWeek();
        $weekEnd = Carbon::now()->subWeek()->endOfWeek();

        $this->info('Generating weekly student report for: ' . $weekStart->format('Y-m-d') . ' to ' . $weekEnd->format('Y-m-d'));

        // Get students registered in the past week
        $students = User::query()
            ->where('role', 'student')
            ->whereBetween('created_at', [$weekStart, $weekEnd])
            ->orderBy('created_at', 'desc')
            ->get();

        if ($students->isEmpty() && !$this->option('force')) {
            $this->warn('No student registrations found for the past week.');
            return self::SUCCESS;
        }

        try {
            // Generate CSV
            $csvContent = $this->generateCSV($students);
            $fileName = 'weekly_students_' . $weekStart->format('Y-m-d') . '_to_' . $weekEnd->format('Y-m-d') . '.csv';
            
            // Store in temporary storage
            Storage::disk('local')->put('temp/' . $fileName, $csvContent);
            $filePath = Storage::disk('local')->path('temp/' . $fileName);

            // Send email with CSV attachment
            $adminEmail = config('mail.admin_email', 'admin@example.com');
            
            Mail::to($adminEmail)->send(new WeeklyStudentReport(
                $filePath,
                $weekStart->format('Y-m-d'),
                $weekEnd->format('Y-m-d'),
                $students->count()
            ));

            // Clean up temporary file
            Storage::disk('local')->delete('temp/' . $fileName);

            $this->info('Weekly student report sent successfully to: ' . $adminEmail);
            $this->info('Total students in report: ' . $students->count());

            return self::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Failed to send weekly report: ' . $e->getMessage());
            return self::FAILURE;
        }
    }

    private function generateCSV($students): string
    {
        $headers = ['ID', 'Name', 'Email', 'Registration Date', 'Phone', 'Status', 'Email Verified'];
        $csvData = implode(',', $headers) . "\n";

        foreach ($students as $student) {
            $row = [
                $student->id,
                '"' . str_replace('"', '""', $student->name) . '"',
                $student->email,
                $student->created_at->format('Y-m-d H:i:s'),
                $student->phone ?? 'N/A',
                $student->status ?? 'Active',
                $student->email_verified_at ? 'Yes' : 'No'
            ];
            $csvData .= implode(',', $row) . "\n";
        }

        return $csvData;
    }
}