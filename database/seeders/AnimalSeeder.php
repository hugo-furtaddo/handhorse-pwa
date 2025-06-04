<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Animal;
use App\Models\Breed;
use App\Models\User;
use Carbon\Carbon;

class AnimalSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();
        if (! $user) {
            return;
        }

        $breeds = Breed::take(3)->get();
        if ($breeds->isEmpty()) {
            return;
        }

        Animal::create([
            'user_id' => $user->id,
            'name' => 'Thor',
            'breed_id' => $breeds[0]->id,
            'sex' => 'male',
            'birth_date' => Carbon::now()->subYears(5),
        ]);

        Animal::create([
            'user_id' => $user->id,
            'name' => 'Lua',
            'breed_id' => $breeds->get(1)->id ?? $breeds[0]->id,
            'sex' => 'female',
            'birth_date' => Carbon::now()->subYears(4),
        ]);

        Animal::create([
            'user_id' => $user->id,
            'name' => 'Estrela',
            'breed_id' => $breeds->get(2)->id ?? $breeds[0]->id,
            'sex' => 'female',
            'birth_date' => Carbon::now()->subYears(3),
        ]);
    }
}
