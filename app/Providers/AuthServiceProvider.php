<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Animal;
use App\Policies\AnimalPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * As mapeamentos de policy para a aplicação.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Animal::class => AnimalPolicy::class,
    ];

    /**
     * Registra quaisquer serviços de autenticação / autorização.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Você pode definir Gates adicionais aqui, se necessário.
    }
}
