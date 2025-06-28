<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewUserRegistered extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            to: [config('mail.admin_email', env('ADMIN_EMAIL'))],
            subject: '🔔 New User Registration - ' . $this->user->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-user-registered',
            with: [
                'user' => $this->user,
            ],
        );
    }
    public function build(){
        return $this->from('info@learnaccademy.com')->to('hikatsukayba@gmail.com');  
    }
}