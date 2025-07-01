<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WeeklyStudentReport extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $csvPath,
        public string $weekStart,
        public string $weekEnd,
        public int $totalStudents
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Weekly Student Registration Report - ' . $this->weekStart . ' to ' . $this->weekEnd,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.weekly-student-report',
            with: [
                'weekStart' => $this->weekStart,
                'weekEnd' => $this->weekEnd,
                'totalStudents' => $this->totalStudents,
            ],
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromPath($this->csvPath)
                ->as('weekly_student_registrations_' . $this->weekStart . '_to_' . $this->weekEnd . '.csv')
                ->withMime('text/csv'),
        ];
    }
}