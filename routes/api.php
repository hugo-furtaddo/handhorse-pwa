<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\ReproductionController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\ProfileController;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::apiResource('animals', AnimalController::class)->except(['create', 'edit']);
    Route::get('/animals/{animal}/history', [AnimalController::class, 'history']);
    Route::post('/animals/{animal}/awards', [AwardController::class, 'store']);

    Route::get('/finance', [FinanceController::class, 'index']);
    Route::post('/finance', [FinanceController::class, 'store']);

    Route::get('/treatments', [TreatmentController::class, 'index']);
    Route::post('/treatments', [TreatmentController::class, 'store']);

    Route::get('/reproduction', [ReproductionController::class, 'index']);
    Route::post('/reproduction', [ReproductionController::class, 'store']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/read', [NotificationController::class, 'markAllRead']);

    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
});
