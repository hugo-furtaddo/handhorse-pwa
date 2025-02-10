<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Breed;

class BreedSeeder extends Seeder
{
    public function run()
    {
        $breeds = [
            'MANGALARGA MARCHADOR',
            'CAMPOLINA',
            'MANGALARGA',
            'PAMPA',
            'PONEI',
            'PIQUIRA',
            'PEGA',
            'CRIOULO',
        ];

        foreach ($breeds as $breed) {
            Breed::create(['name' => $breed]);
        }
    }
}

