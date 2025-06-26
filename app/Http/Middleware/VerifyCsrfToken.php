<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * URIs que devem ser excluídas da verificação de CSRF
     *
     * @var array<int, string>
     */
    protected $except = [
        'login',
    ];
}
