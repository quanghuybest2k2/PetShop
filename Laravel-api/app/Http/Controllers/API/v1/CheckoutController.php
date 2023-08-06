<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make(
                $request->all(),
                [
                    'address' => 'required|max:255',
                    'nameCard' => 'required|max:255',
                    'cardNumber' => 'required|max:255',
                    'cvc' => 'required|max:255',
                    'month' => 'required|max:255',
                    'year' => 'required|max:255',
                ],
                [
                    // 'nameCard.required' => 'Bạn phải điền Tên',
                    // 'cardNumber.required' => 'Bạn phải điền họ và tên đệm',
                    'required'  => 'Bạn phải điền :attribute',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => $validator->messages(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
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
                    'status' => Response::HTTP_OK,
                    'message' => 'Đặt hàng thành công.',
                ]);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Đăng nhập để tiếp tục!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function VnPay_payment(Request $request)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = 'http://localhost:3000/thank-you';
        $vnp_TmnCode = env('VNP_TMNCODE');
        $vnp_HashSecret = env('VNP_HASHSECRET');

        $vnp_TxnRef = 'petshop' . rand(1111, 9999); //tracking_no
        $vnp_OrderInfo = "Thanh toán hóa đơn";
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $request->total * 100; //amount
        $vnp_Locale = 'vn';
        $vnp_BankCode = $request->bankcode;
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
    }
    public function savePayment(Request $request)
    {
        $vnp_TxnRef = $request->input('vnp_TxnRef');

        $existingOrder = Order::where('tracking_no', $vnp_TxnRef)->first();

        if ($existingOrder) {
            return response()->json([
                'status' => Response::HTTP_CONFLICT,
                'message' => 'Đơn hàng bị trùng lặp vì lưu trước đó!',
            ], Response::HTTP_CONFLICT);
        }

        $vnp_Amount = $request->input('vnp_Amount');

        $user_id = auth('sanctum')->user()->id;
        $order = new Order;
        $order->user_id = $user_id;
        $order->amount = $vnp_Amount;
        $order->payment_mode = 'VnPay';
        $order->tracking_no = $vnp_TxnRef;
        $order->save();

        $cart = Cart::where('user_id', $user_id)->get();
        $orderitems = [];
        foreach ($cart as $item) {
            $orderitems[] = [
                'product_id' => $item->product_id,
                'qty' => $item->product_qty,
                'price' => $item->product->selling_price,
            ];
            $item->product->update([
                'qty' => $item->product->qty - $item->product_qty
            ]);
        }
        $order->orderitems()->createMany($orderitems);
        Cart::destroy($cart);

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Thanh toán thành công'
        ], Response::HTTP_OK);
    }
}
