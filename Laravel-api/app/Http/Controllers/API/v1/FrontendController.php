<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\NewProductNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class FrontendController extends Controller
{
    public function index()
    {
        //lấy tát cả loại thú cưng
        $category = Category::where('status', '0')->get();
        // lấy tất cả thú cưng
        $products = Product::where('status', '0')->get();
        // sản phẩm phổ biến
        $popularProducts = Product::orderByDesc('count')->take(4)->get();
        // Sản phẩm nổi bật
        $featuredProducts = Product::where('featured', '1')->take(4)->get();

        return response()->json([
            'status' => Response::HTTP_OK,
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
            'status' => Response::HTTP_OK,
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
                    'status' => Response::HTTP_OK,
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
                    'status' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Không tồn tại thú cưng này!',
                ], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không có danh mục này!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
    public function viewproduct($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->where('status', '0')->first();
        if ($category) {
            $product = Product::where('category_id', $category->id)->where('slug', $product_slug)->where('status', '0')->first();
            if ($product) {
                $product->increment('count', 1); // count+1 nếu tải trang
                $comments = $product->comments; // quan hệ trong model Product

                return response()->json([
                    'status' => Response::HTTP_OK,
                    'product' => $product,
                ]);
            } else {
                return response()->json([
                    'status' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Không tồn tại sản phẩm này!',
                ], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không có danh mục này!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
