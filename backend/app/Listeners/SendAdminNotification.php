<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\NewUserRegistered;
use Illuminate\Support\Facades\Mail;

class SendAdminNotification
{
    public function handle(UserRegistered $event)
    {
        $adminEmail = config('mail.admin_email', 'admin@example.com');
        
        Mail::to($adminEmail)->send(new NewUserRegistered($event->user));
    }
}
