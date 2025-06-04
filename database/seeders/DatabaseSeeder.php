<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BreedSeeder::class,
            AssociationSeeder::class,
            ReproductionTypeSeeder::class,
            TreatmentTypeSeeder::class,
            AnimalSeeder::class,
            TreatmentSeeder::class,
            ReproductionSeeder::class,
            ReminderSeeder::class,
            FinanceEntrySeeder::class,
        ]);
    }
}
