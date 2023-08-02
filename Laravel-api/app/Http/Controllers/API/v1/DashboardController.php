<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Order;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Category;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::where('status', '0')->count();
        $category = Category::where('status', '0')->count();
        $orders = Order::count();
        $comments = Comment::count();
        return response()->json([
            'status' => Response::HTTP_OK,
            'products' => $products,
            'category' => $category,
            'orders' => $orders,
            'comments' => $comments,
        ]);
    }
}
