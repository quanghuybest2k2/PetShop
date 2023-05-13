<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return response()->json([
            'status' => 200,
            'comments' => $comments
        ]);
    }
    // người dùng tạo
    public function store(Request $request, $slug)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'comment' => 'required|string'
            ],
            [
                'required'  => 'Bạn phải viết bình luận!',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
        if (auth('sanctum')->check()) {
            $product = Product::where('slug', $slug)->where('status', '0')->first();
            $user_id = auth('sanctum')->user()->id;
            if ($product) {
                Comment::create([
                    'product_id' => $product->id, // slug của product => miu
                    'user_id' => $user_id,
                    'comment' => $request->comment,
                    'slug' => $request->slug,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Bình luận thành công.'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không có thú cưng này!'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Bạn phải đăng nhập!',
            ], 401);
        }
    }
    // người dùng xóa comment của chính họ
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json([
                'status' => Response::HTTP_ACCEPTED,
                'message' => 'Đã xóa bình luận.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NO_CONTENT,
                'message' => 'Không tìm thấy id của bình luận!'
            ]);
        }
    }
    // admin xóa
    public function delete($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json([
                'status' => Response::HTTP_ACCEPTED,
                'message' => 'Đã xóa bình luận.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NO_CONTENT,
                'message' => 'Không tìm thấy id của bình luận!'
            ]);
        }
    }
}
