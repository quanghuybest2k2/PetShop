<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::where('status', '0')->count();
        $category = Category::where('status', '0')->count();
        $orders = Order::count();
        $comments = Comment::count();
        return response()->json([
            'status' => 200,
            'products' => $products,
            'category' => $category,
            'orders' => $orders,
            'comments' => $comments,
        ]);
    }
}
