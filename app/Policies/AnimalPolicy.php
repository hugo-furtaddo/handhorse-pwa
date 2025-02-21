<?php

namespace App\Policies;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnimalPolicy
{
    use HandlesAuthorization;

    // Verifica se o usuário pode visualizar o animal
    public function view(User $user, Animal $animal)
    {
        // Apenas o usuário dono do animal pode visualizá-lo
        return $user->id === $animal->user_id;
    }

    // Verifica se o usuário pode atualizar o animal
    public function update(User $user, Animal $animal)
    {
        return $user->id === $animal->user_id;
    }

    // Verifica se o usuário pode excluir o animal
    public function delete(User $user, Animal $animal)
    {
        return $user->id === $animal->user_id;
    }

}
