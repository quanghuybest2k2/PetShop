<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\NewProductNotification;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class FrontendController extends Controller
{
    public function index()
    {
        //lấy tát cả loại thú cưng
        $category = Category::all();
        // lấy tất cả thú cưng
        $products = Product::all();
        // sản phẩm phổ biến
        $popularProducts = Product::orderByDesc('count')->take(4)->get();
        // Sản phẩm nổi bật
        $featuredProducts = Product::where('featured', '1')->take(4)->get();

        return response()->json([
            'status' => 200,
            'products' => $products,
            'popularProducts' => $popularProducts,
            'category' => $category,
            'featuredProducts' => $featuredProducts,
        ]);
    }
    public function category()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    public function product($slug)
    {
        $category = Category::where('slug', $slug)->where('status', '0')->first();
        if ($category) {
            // Tìm pet thông qua khóa ngoại liên kết khóa chính
            $product = Product::where('category_id', $category->id)->where('status', '0')->paginate(3);
            // $product = Product::where('category_id', $category->id)->where('status', '0')->get();
            if ($product) {
                return response()->json([
                    'status' => 200,
                    'product_data' => [
                        'product' => $product,
                        'category' => $category,
                    ],
                    'pagination' => [
                        'current_page' => $product->currentPage(),
                        'last_page' => $product->lastPage(),
                        'per_page' => $product->perPage(),
                        'total' => $product->total(),
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Không tồn tại thú cưng này!',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không có danh mục này!',
            ]);
        }
    }
    public function viewproduct($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->where('status', '0')->first();
        if ($category) {
            $product = Product::where('category_id', $category->id)->where('slug', $product_slug)->where('status', '0')->first();
            if ($product) {
                $product->increment('count', 1); // count+1 nếu tải trang
                $comments = $product->comments;
                $commentData = $comments->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'user_id' => $comment->user_id,
                        'username' => $comment->user->name, // Truy cập thông tin người dùng
                        'comment' => $comment->comment,
                        'created_at' => $comment->created_at,
                    ];
                });
                return response()->json([
                    'status' => 200,
                    'product' => $product,
                    'commentData' => $commentData,
                    // 'updateCount' => $updateCount,
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Không tồn tại sản phẩm này!',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không có danh mục này!',
            ]);
        }
    }
}
