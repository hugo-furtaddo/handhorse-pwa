<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reproduction;
use App\Models\Animal;
use App\Models\User;
use Carbon\Carbon;

class ReproductionSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();
        $animals = Animal::take(2)->get();
        if (! $user || $animals->count() < 2) {
            return;
        }

        Reproduction::create([
            'user_id' => $user->id,
            'type' => 'monta_natural',
            'date' => Carbon::now()->subDays(30),
            'egua_id' => $animals[1]->id,
            'cavalo_id' => $animals[0]->id,
        ]);

        Reproduction::create([
            'user_id' => $user->id,
            'type' => 'confirmacao_prenhes',
            'date_exame' => Carbon::now()->subDays(5),
            'date_provavel' => Carbon::now()->addMonths(7),
            'animal_id' => $animals[1]->id,
            'pai_id' => $animals[0]->id,
        ]);
    }
}
