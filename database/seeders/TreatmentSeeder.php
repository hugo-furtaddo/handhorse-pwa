<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Treatment;
use App\Models\TreatmentType;
use App\Models\Animal;
use App\Models\User;
use Carbon\Carbon;

class TreatmentSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();
        $animal = Animal::first();
        if (! $user || ! $animal) {
            return;
        }

        $vacina = TreatmentType::where('name', 'Vacina')->first();
        $casqueamento = TreatmentType::where('name', 'Casqueamento')->first();

        Treatment::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'treatment_type_id' => optional($vacina)->id,
            'date' => Carbon::now()->subDays(10),
            'details' => ['type' => 'V8'],
        ]);

        Treatment::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'treatment_type_id' => optional($casqueamento)->id,
            'date' => Carbon::now()->subDays(5),
            'details' => [],
        ]);
    }
}
