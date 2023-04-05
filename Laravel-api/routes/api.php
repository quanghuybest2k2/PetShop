<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//dang ky
Route::post('register', [AuthController::class, 'register']);
// dang nhap
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum', 'isAPIAdmin')->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'Bạn đã đăng nhập', 'status' => 200], 200);
    });
    // group controller
    // Route::controller(Controlldername::class)->group(function () {
    //     Route::post('store-entity', 'store');
    // });
    // Category
    Route::controller(CategoryController::class)->group(function () {
        Route::get('view-category', 'index');
        Route::post('store-category', 'store');
        Route::get('edit-category/{id}', 'edit');
        Route::put('update-category/{id}', 'update');
        Route::delete('delete-category/{id}', 'destroy');
        Route::get('all-category', 'allcategory');
    });
    // Products
    Route::controller(ProductController::class)->group(function () {
        Route::post('store-product', 'store');
        Route::get('view-product', 'index');
        Route::get('edit-product/{id}', 'edit');
        Route::post('update-product/{id}', 'update');
        Route::delete('delete-product/{id}', 'destroy');
    });
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });