<?php

namespace App\Jobs;

use App\Models\Breed;
use App\Models\User;
use App\Models\Animal;
use App\Models\AssociationDeadline;
use App\Notifications\AssociationReminder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendAssociationReminder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $user;
    protected Breed $breed;
    protected AssociationDeadline $deadline;
    protected int $daysLeft;
    protected string $animalName;

    public function __construct(User $user, Breed $breed, AssociationDeadline $deadline, int $daysLeft, string $animalName)
    {
        $this->user = $user;
        $this->breed = $breed;
        $this->deadline = $deadline;
        $this->daysLeft = $daysLeft;
        $this->animalName = $animalName;
    }

    public function handle(): void
    {
        $this->user->notify(new AssociationReminder(
            $this->breed,
            $this->deadline,
            $this->daysLeft,
            $this->animalName
        ));
    }
}
