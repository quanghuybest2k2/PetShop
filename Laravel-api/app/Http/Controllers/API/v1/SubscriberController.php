<?php

namespace App\Http\Controllers\API\v1;

use Exception;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::all();

        return response()->json([
            'status' =>
            Response::HTTP_OK,
            'subscribers' => $subscribers
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email|unique:subscribers,email'
            ],
            [
                'required'  => 'Bạn phải điền :attribute',
                'unique'  => ':attribute đã đăng ký rồi!',
                'email'  => ':attribute không đúng định dạng!',
            ],
            [
                'email' => 'Email'
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' =>
                Response::HTTP_BAD_REQUEST,
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }
        $subscriber =  Subscriber::create([
            'email' => $request->input('email'),
        ]);
        if ($subscriber) {
            return response()->json([
                'status' =>
                Response::HTTP_OK,
                'message' => 'Đăng ký thành công.',
            ]);
        } else {
            return response()->json([
                'status' =>
                Response::HTTP_CONFLICT,
                'errors' => 'Đăng ký thất bại!'
            ], Response::HTTP_CONFLICT);
        }
    }

    public function destroy($id)
    {
        $subscriber = Subscriber::find($id);
        if ($subscriber) {
            $subscriber->delete();
            return response()->json([
                'status' =>
                Response::HTTP_OK,
                'message' => 'Đã hủy đăng ký.'
            ]);
        } else {
            return response()->json([
                'status' =>
                Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của subscriber!'
            ],  Response::HTTP_NOT_FOUND);
        }
    }
}
