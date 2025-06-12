<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FinanceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Animal;
use App\Models\FinanceEntry;
use App\Http\Controllers\ReproductionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Aqui você define as rotas da sua aplicação web. As rotas estão organizadas
| de forma a garantir segurança e uma integração robusta com os controllers.
|
*/

// Rota raiz redireciona para a página de login
Route::get('/', function () {
    return redirect()->route('login');
});

// Dashboard: busca os animais do usuário e os passa para o Dashboard,
// onde o componente de carrossel lida com a exibição
Route::get('/dashboard', function () {
    $userId = auth()->id();
    $animals = Animal::with('breed')->where('user_id', $userId)->get();

    $finance = App\Models\FinanceEntry::where('user_id', $userId)
        ->get()
        ->groupBy(function($item) {
            return \Illuminate\Support\Carbon::parse($item->data)->format('Y-m');
        })
        ->map(function($group) {
            return [
                'custo' => $group->where('type', 'custo')->sum('valor'),
                'receita' => $group->where('type', 'receita')->sum('valor'),
            ];
        });

    return Inertia::render('Dashboard', [
        'animals' => $animals,
        'finance' => $finance,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Rotas protegidas para usuários autenticados
Route::middleware(['auth'])->group(function () {

    // Rotas para gerenciamento de animais (CRUD completo)
    Route::resource('animals', AnimalController::class);
    Route::get('/animals/{animal}/history', [AnimalController::class, 'history'])->name('animals.history');

    // Rotas para gerenciamento de perfil do usuário
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/animal-health', [TreatmentController::class, 'index'])->name('animal-health');
    Route::post('/treatments', [TreatmentController::class, 'store'])->name('treatments.store');

    Route::get('/reproduction', [ReproductionController::class, 'index'])->name('reproduction.index');
    Route::post('/reproduction', [ReproductionController::class, 'store'])->name('reproduction.store');

    // Financeiro: custos e receitas
    Route::get('/finance', [\App\Http\Controllers\FinanceController::class, 'index'])->name('finance.index');
    Route::post('/finance', [\App\Http\Controllers\FinanceController::class, 'store'])->name('finance.store');

    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/read', [\App\Http\Controllers\NotificationController::class, 'markAllRead'])->name('notifications.read');

    Route::post('/animals/{animal}/awards', [\App\Http\Controllers\AwardController::class, 'store'])->name('awards.store');
});

// Rotas de autenticação (login, registro, etc.)
require __DIR__.'/auth.php';
