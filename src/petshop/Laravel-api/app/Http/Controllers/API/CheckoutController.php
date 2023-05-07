<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make(
                $request->all(),
                [
                    'address' => 'required|max:191',
                    'nameCard' => 'required|max:191',
                    'cardNumber' => 'required|max:191',
                    'cvc' => 'required|max:191',
                    'month' => 'required|max:191',
                    'year' => 'required|max:191',
                ],
                [
                    // 'nameCard.required' => 'Bạn phải điền Tên',
                    // 'cardNumber.required' => 'Bạn phải điền họ và tên đệm',
                    'required'  => 'Bạn phải điền :attribute',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                Stripe\Charge::create([
                    "amount" => $request->amount,
                    "currency" => "VND",
                    "source" => $request->stripeToken,
                    "description" => "Thanh toán thành công!"
                ]);
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->amount = $request->amount; //lấy từ totalCartPrice
                $order->address = $request->address;
                $order->nameCard = $request->nameCard;
                $order->cardNumber = $request->cardNumber;
                $order->cvc = $request->cvc;
                $order->month = $request->month;
                $order->year = $request->year;
                if ($request->payment_mode == 'stripe') {
                    $order->payment_mode = 'Stripe';
                }
                $order->tracking_no = 'petshop' . rand(1111, 9999);
                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();
                $orderitems = [];
                foreach ($cart as $item) {
                    $orderitems[] = [
                        'product_id' => $item->product_id,
                        'qty' => $item->product_qty,
                        // product() trong Cart model
                        'price' => $item->product->selling_price,
                    ];
                    $item->product->update([
                        'qty' => $item->product->qty - $item->product_qty
                    ]);
                }
                $order->orderitems()->createMany($orderitems);
                Cart::destroy($cart);
                return response()->json([
                    'status' => 200,
                    'message' => 'Đặt hàng thành công.',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để tiếp tục!',
            ]);
        }
    }
}
