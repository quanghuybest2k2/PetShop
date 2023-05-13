<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::all();

        return response()->json([
            'status' => 200,
            'subscribers' => $subscribers
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email|unique:subscribers,email'
            ],
            [
                'required'  => 'Bạn phải điền email',
                'unique'  => 'Bạn đã đăng ký rồi!',
                'email'  => 'Email không đúng định dạng!',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ], 400);
        }
        $subscriber =  Subscriber::create([
            'email' => $request->input('email'),
        ]);
        if ($subscriber) {
            return response()->json([
                'status' => 200,
                'message' => 'Đăng ký thành công.',
            ]);
        } else {
            return response()->json([
                'status' => 409,
                'errors' => 'Đăng ký thất bại!'
            ], 409);
        }
    }

    public function destroy($id)
    {
        $subscriber = Subscriber::find($id);
        if ($subscriber) {
            $subscriber->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Đã hủy đăng ký.'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy id của subscriber!'
            ], 404);
        }
    }
}
