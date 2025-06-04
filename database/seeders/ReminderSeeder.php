<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Breed;
use App\Models\AssociationDeadline;
use App\Notifications\AssociationReminder;
use Illuminate\Database\Seeder;

class ReminderSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();
        if (! $user) {
            return;
        }

        $breeds = Breed::with('association.deadlines')->has('association')->get();
        foreach ($breeds as $breed) {
            $deadline = $breed->association->deadlines->first();
            if (! $deadline) {
                continue;
            }

            foreach ([30, 15, 1] as $daysLeft) {
                $user->notify(new AssociationReminder($breed, $deadline, $daysLeft));
            }
        }
    }
}
