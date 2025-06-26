<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MobileAuthController;

Route::post('/login', [MobileAuthController::class, 'login']);
