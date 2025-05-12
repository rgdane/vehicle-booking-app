<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\VehicleController;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
//     Auth::logout();
//     $request->session()->invalidate();
//     $request->session()->regenerateToken();
//     return response()->json(['message' => 'Logout berhasil']);
// });

    Route::middleware(['auth:sanctum', 'role:admin,direktur_pusat,direktur_cabang'])->group(function () {
        Route::apiResource('vehicles', VehicleController::class);
        Route::apiResource('drivers', DriverController::class);
        Route::apiResource('bookings', BookingController::class);
        Route::post('/approvals', [ApprovalController::class, 'store']);
        Route::get('/vehicle-usage/{year}', [DashboardController::class, 'vehicleUsage']);
        Route::get('/years', [DashboardController::class, 'getYear']);
        Route::get('/export', [BookingController::class, 'export']);
        Route::get('/bookings', [BookingController::class, 'indexByFilter']);
        Route::get('/booking-years', [BookingController::class, 'getBookingYear']);
    });
    Route::middleware(['auth:sanctum', 'role:direktur_pusat,direktur_cabang'])->group(function () {
        Route::put('approvals/{id}', [ApprovalController::class, 'update']);
        Route::get('/approvals/level/{level}', [ApprovalController::class, 'indexByLevel']);
    });





