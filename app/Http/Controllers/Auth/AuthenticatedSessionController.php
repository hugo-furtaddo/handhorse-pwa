<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Exibe a view web do login (PWA/Inertia).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
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

    if ($request->expectsJson()) {
        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
}

    /**
     * Logout: encerra sessão web e revoga tokens se necessário.
     */
    public function destroy(Request $request)
    {
        if ($request->expectsJson()) {
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logout realizado']);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
