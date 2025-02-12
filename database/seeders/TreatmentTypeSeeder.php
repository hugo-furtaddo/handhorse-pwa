<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TreatmentType;

class TreatmentTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            'Vermifugação',
            'Vacina',
            'Suplementação',
            'Tratamento odontológico',
            'Casqueamento',
        ];

        foreach ($types as $type) {
            TreatmentType::create(['name' => $type]);
        }
    }
}
