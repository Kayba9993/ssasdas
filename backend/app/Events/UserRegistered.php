<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserRegistered
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public User $user
    ) {}
}

// 2. Create Listener for the Event
// app/Listeners/SendAdminNotification.php
namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\NewUserRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendAdminNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(UserRegistered $event): void
    {
        $adminEmail = config('mail.admin_email', 'admin@example.com');
        
        Mail::to($adminEmail)->send(new NewUserRegistered($event->user));
    }
}