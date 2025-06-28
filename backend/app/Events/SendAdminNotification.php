<?php
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
        $adminEmail = config('mail.admin_email', 'hikatsukayba@gmail.com');
        
        Mail::to($adminEmail)->send(new NewUserRegistered($event->user));
    }
}