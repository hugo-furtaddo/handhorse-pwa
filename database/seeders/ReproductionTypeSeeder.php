<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ReproductionType;

class ReproductionTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            'Monta natural',
            'Inseminação',
            'Transferência de embrião',
            'Confirmação de prenhes',
        ];

        foreach ($types as $type) {
            ReproductionType::create(['name' => $type]);
        }
    }
}
