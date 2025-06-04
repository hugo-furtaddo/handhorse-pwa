<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Animal;
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

        $animals = Animal::with('breed.association.deadlines')
            ->whereHas('breed.association')
            ->get();

        foreach ($animals as $animal) {
            $breed = $animal->breed;
            $deadline = $breed->association->deadlines->first();
            if (! $deadline) {
                continue;
            }

            foreach ([30, 15, 1] as $daysLeft) {
                $user->notify(new AssociationReminder($breed, $deadline, $daysLeft, $animal->name));
            }
        }
    }
}
