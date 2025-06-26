<?php

namespace App\Jobs;

use App\Mail\WeeklyStudentReport;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class GenerateWeeklyStudentReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Carbon $weekStart,
        public Carbon $weekEnd
    ) {}

    public function handle(): void
    {
        $students = User::query()
            ->students()
            ->whereBetween('created_at', [$this->weekStart, $this->weekEnd])
            ->orderBy('created_at', 'desc')
            ->get();

        if ($students->isEmpty()) {
            return;
        }

        $csvContent = $this->generateCSV($students);
        $fileName = 'weekly_students_' . $this->weekStart->format('Y-m-d') . '_to_' . $this->weekEnd->format('Y-m-d') . '.csv';
        
        Storage::disk('local')->put('temp/' . $fileName, $csvContent);
        $filePath = Storage::disk('local')->path('temp/' . $fileName);

        $adminEmail = config('mail.admin_email');
        
        Mail::to($adminEmail)->send(new WeeklyStudentReport(
            $filePath,
            $this->weekStart->format('Y-m-d'),
            $this->weekEnd->format('Y-m-d'),
            $students->count()
        ));

        Storage::disk('local')->delete('temp/' . $fileName);
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