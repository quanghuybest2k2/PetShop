<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// v1 web api
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\CartController;
use App\Http\Controllers\API\v1\AlbumController;
use App\Http\Controllers\API\v1\OrderController;
use App\Http\Controllers\API\v1\CommentController;
use App\Http\Controllers\API\v1\ProductController;
use App\Http\Controllers\API\v1\CategoryController;
use App\Http\Controllers\API\v1\CheckoutController;
use App\Http\Controllers\API\v1\FrontendController;
use App\Http\Controllers\API\v1\DashboardController;
use App\Http\Controllers\API\v1\SubscriberController;
// v2 testing api
// use App\Http\Controllers\API\v2\AuthController;

Route::prefix('v1')->group(function () {
    // user
    Route::controller(AuthController::class)->group(function () {
        //dang ky
        Route::post('register', 'register');
        // dang nhap
        Route::post('login', 'login');
    });

    Route::controller(FrontendController::class)->group(function () {
        Route::get('viewHomePage', 'index');
        Route::get('getCategory', 'category');
        Route::get('fetchproducts/{slug}', 'product');
        Route::get('viewproductdetail/{category_slug}/{product_slug}', 'viewproduct');
    });
    // get all category from client
    Route::controller(CategoryController::class)->group(function () {
        Route::get('get-all-category', 'getAllCategory');
    });
    // Album
    Route::controller(AlbumController::class)->group(function () {
        Route::get('getAlbumPet', 'index');
        Route::post('store-albumPet', 'store');
    });
    // cart
    Route::controller(CartController::class)->group(function () {
        Route::post('add-to-cart', 'addtocart');
        Route::get('cart', 'viewcart');
        Route::put('cart-updatequantity/{cart_id}/{scope}', 'updatequantity');
        Route::delete('delete-cartitem/{cart_id}', 'deleteCartitem');
    });
    // checkout
    Route::controller(CheckoutController::class)->group(function () {
        Route::post('place-order', 'placeorder');
        Route::post('checkout', 'VnPay_payment');
        Route::post('save-payment', 'savePayment');
    });
    // Comment
    Route::controller(CommentController::class)->group(function () {
        Route::post('store-comment/{slug}', 'store');
        Route::delete('delete-comment/{id}', 'destroy');
    });
    // subscribers
    Route::controller(SubscriberController::class)->group(function () {
        Route::get('getSubscribers', 'index');
        Route::post('subscribers', 'store');
    });
    // admin
    Route::middleware('auth:sanctum', 'isAPIAdmin')->group(function () {

        Route::get('/checkingAuthenticated', function () {
            return response()->json(['message' => 'Bạn đã đăng nhập', 'status' => 200], 200);
        });
        // Dashboard
        Route::controller(DashboardController::class)->group(function () {
            Route::get('view-dashboard', 'index');
        });
        // Category
        Route::controller(CategoryController::class)->group(function () {
            Route::get('view-category', 'index');
            Route::post('store-category', 'store');
            Route::get('edit-category/{id}', 'edit');
            Route::put('update-category/{id}', 'update');
            Route::delete('delete-category/{id}', 'destroy');
            Route::get('all-category', 'allcategory');
        });
        // Orders
        Route::controller(OrderController::class)->group(function () {
            Route::get('admin/orders', 'index');
            Route::get('admin/view-order/{id}', 'viewOrder');
        });
        // Products
        Route::controller(ProductController::class)->group(function () {
            Route::post('store-product', 'store');
            Route::get('view-product', 'index');
            Route::get('edit-product/{id}', 'edit');
            Route::post('update-product/{id}', 'update');
            Route::delete('delete-product/{id}', 'destroy');
        });
        //
        // View Comment in Admin
        Route::controller(CommentController::class)->group(function () {
            Route::get('view-comment', 'index');
            Route::delete('deleteComment/{id}', 'delete');
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
