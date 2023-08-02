<?php

namespace App\Http\Controllers\API\v1;

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
            'status' => Response::HTTP_OK,
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
            ],
            [
                'comment' => 'Bình luận'
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $validator->messages(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
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
                    'status' => Response::HTTP_OK,
                    'message' => 'Bình luận thành công.'
                ]);
            } else {
                return response()->json([
                    'status' => Response::HTTP_NOT_FOUND,
                    'message' => 'Không có thú cưng này!'
                ], Response::HTTP_NOT_FOUND);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Bạn phải đăng nhập!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    // người dùng xóa comment của chính họ
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã xóa bình luận.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của bình luận!'
            ], Response::HTTP_NOT_FOUND);
        }
    }
    // admin xóa
    public function delete($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã xóa bình luận.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của bình luận!'
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
