<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }
    public function viewOrder($id)
    {
        $order = Order::find($id);
        if ($order) {

            return response()->json([
                'status' => 200,
                'order' => $order,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'errors' => 'Không tìm thấy đơn hàng này!',
            ]);
        }
    }
}
