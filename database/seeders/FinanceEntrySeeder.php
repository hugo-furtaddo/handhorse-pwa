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

        FinanceEntry::create([
            'user_id'   => $user->id,
            'type'      => 'custo',
            'descricao' => 'Ração',
            'valor'     => 150.00,
            'data'      => Carbon::now()->subDays(15),
        ]);

        FinanceEntry::create([
            'user_id'   => $user->id,
            'type'      => 'custo',
            'descricao' => 'Ferrageamento',
            'valor'     => 250.00,
            'data'      => Carbon::now()->subDays(10),
        ]);

        FinanceEntry::create([
            'user_id'   => $user->id,
            'type'      => 'receita',
            'descricao' => 'Venda de cavalo',
            'valor'     => 5000.00,
            'data'      => Carbon::now()->subDays(5),
        ]);

        FinanceEntry::create([
            'user_id'   => $user->id,
            'type'      => 'receita',
            'descricao' => 'Premiação',
            'valor'     => 1000.00,
            'data'      => Carbon::now()->subDays(2),
        ]);
    }
}
