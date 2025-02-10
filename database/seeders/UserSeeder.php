<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Executa as seeds.
     */
    public function run()
    {
        User::create([
            'name'     => 'Usuário Teste',
            'email'    => 'teste@exemplo.com',
            'password' => Hash::make('senha123'),
        ]);
    }
}
