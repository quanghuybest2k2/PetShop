<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck) {
                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => Response::HTTP_CONFLICT,
                        'message' => $productCheck->name . ' đã được thêm vào giỏ hàng!',
                    ], Response::HTTP_CONFLICT);
                } else {
                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->product_qty = $product_qty;
                    $cartitem->save();
                    return response()->json([
                        'status' => Response::HTTP_CREATED,
                        'message' => 'Đã thêm vào giỏ hàng.',
                    ], Response::HTTP_CREATED);
                }
            } else {
                return response()->json([
                    'status' =>
                    Response::HTTP_NOT_FOUND,
                    'message' => 'Không tìm thấy thú cưng này!',
                ], Response::HTTP_NOT_FOUND);
            }
        } else {
            return response()->json([
                'status' =>
                Response::HTTP_UNAUTHORIZED,
                'message' => 'Đăng nhập để thêm vào giỏ hàng!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function viewcart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' =>
                Response::HTTP_OK,
                'cart' => $cartitems,
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Đăng nhập để xem giỏ hàng!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function updatequantity($cart_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($scope == "inc") { // increase
                $cartitem->product_qty += 1;
            } else if ($scope == "dec") {
                $cartitem->product_qty -= 1;
            }
            $cartitem->update();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã cập nhật số lượng.',
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Đăng nhập để tiếp tục!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function deleteCartitem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($cartitem) {
                $cartitem->delete();
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Xóa thành công.',
                ]);
            } else {
                return response()->json([
                    'status' =>
                    Response::HTTP_NOT_FOUND,
                    'message' => 'Không tìm thấy mục trong giỏ hàng!',
                ], Response::HTTP_NOT_FOUND);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Đăng nhập để tiếp tục!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
}
