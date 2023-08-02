<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'status' => Response::HTTP_OK,
            'orders' => $orders
        ]);
    }
    public function viewOrder($id)
    {
        $order = Order::find($id);
        if ($order) {

            return response()->json([
                'status' => Response::HTTP_OK,
                'order' => $order,
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => 'Không tìm thấy đơn hàng này!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
