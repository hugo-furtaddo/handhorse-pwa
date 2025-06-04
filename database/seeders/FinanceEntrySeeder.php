<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FinanceEntry;
use App\Models\User;
use Carbon\Carbon;

class FinanceEntrySeeder extends Seeder
{
    public function run()
    {
        $user = User::first();
        if (! $user) {
            return;
        }

        // example costs and revenues across different months
        FinanceEntry::insert([
            [
                'user_id' => $user->id,
                'type' => 'custo',
                'descricao' => 'Ração',
                'valor' => 150.00,
                'data' => Carbon::now()->subMonths(2)->startOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'type' => 'receita',
                'descricao' => 'Venda de potro',
                'valor' => 2000.00,
                'data' => Carbon::now()->subMonths(2)->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'type' => 'custo',
                'descricao' => 'Ferrageamento',
                'valor' => 300.00,
                'data' => Carbon::now()->subMonth()->startOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'type' => 'receita',
                'descricao' => 'Aulas de equitação',
                'valor' => 500.00,
                'data' => Carbon::now()->subMonth()->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
