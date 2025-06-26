<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Endpoint para obter informações de login.
     */
    public function create()
    {
        return response()->json(['canResetPassword' => Route::has('password.request')]);
    }

    /**
     * Lida com requisições de login.
     * Se for JSON (vindo do app), retorna token.
     * Se for web, redireciona para dashboard.
     */

    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Logout: encerra sessão web e revoga tokens se necessário.
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }
}
