<?php

namespace App\Providers;

use App\Events\UserRegistered;
use App\Listeners\SendAdminNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserRegistered::class => [
            SendAdminNotification::class,
        ],
    ];

    public function boot(): void
    {
        parent::boot();
    }
}