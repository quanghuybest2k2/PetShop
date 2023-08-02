<?php

namespace App\Http\Controllers\API\v1;

use Exception;
use App\Models\Product;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\NewProductNotification;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    // xem thú cưng
    public function index()
    {
        $products = Product::where('status', '0');
        return response()->json([
            'status' => Response::HTTP_OK,
            'products' => $products
        ]);
    }
    // tạo thú cưng
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'category_id' => 'required|max:191',
                'slug' => 'required|max:255|unique:products,slug',
                'name' => 'required|max:255',
                'brand' => 'required|max:20',
                'selling_price' => 'required|max:20',
                'original_price' => 'required|max:20',
                'qty' => 'required|max:4',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            ],
            [
                'required'  => 'Bạn phải điền :attribute',
                'unique'  => ':attribute đã tồn tại!',
                'max'  => ':attribute không vượt quá :max ký tự',
                'image'  => 'Phải là hình ảnh',
                'mimes'  => ':attribute không đúng định dạng',
            ],
            [
                'category_id' => 'Category Id',
                'slug' => 'Tên định danh',
                'name' => 'Tên thú cưng',
                'brand' => 'Thương hiệu',
                'selling_price' => 'Giá bán',
                'original_price' => 'Giá gốc',
                'qty' => 'Số lượng',
                'image' => 'Hình ảnh',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $validator->messages(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');

            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->qty = $request->input('qty');
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/' . $filename;
            }
            $product->featured = $request->input('featured') == true ? '1' : '0';
            $product->status = $request->input('status') == true ? '1' : '0';
            $product->save();
            //gửi email thông báo khi người dùng subscribe
            $all_subscribers = Subscriber::all();
            // // $all_subscribers = Subscriber::all()->filter(function ($subscriber) {
            // //     return Str::contains($subscriber->email, 'gmail.com'); // chứa đuổi gmail.com
            // // });
            foreach ($all_subscribers as $subscriber) {
                Mail::to($subscriber->email)
                    ->send(new NewProductNotification($product));
            }
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Thêm thú cưng thành công.',
            ]);
        }
    }
    // xem thú cưng để sửa
    public function edit($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'product' => $product,
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy thú cưng này!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
    // sửa thú cưng
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'category_id' => 'required|max:255',
                'slug' => 'required|max:255',
                'name' => 'required|max:255',
                'brand' => 'required|max:20',
                'selling_price' => 'required|max:20',
                'original_price' => 'required|max:20',
                'qty' => 'required|max:4',
            ],
            [
                'required'  => 'Bạn phải điền :attribute',
                'max'  => ':attribute không vượt quá :max ký tự',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $validator->messages(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $product = Product::find($id);
            if ($product) {
                $product->category_id = $request->input('category_id');
                $product->slug = $request->input('slug');
                $product->name = $request->input('name');
                $product->description = $request->input('description');

                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->qty = $request->input('qty');

                if ($request->hasFile('image')) {
                    $path = $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/' . $filename;
                }
                $product->featured = $request->input('featured');
                $product->status = $request->input('status');
                $product->update();
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Cập nhật thú cưng thành công.',
                ]);
            } else {
                return response()->json([
                    'status' => Response::HTTP_NOT_FOUND,
                    'message' => 'Không tìm thấy thú cưng này!',
                ], Response::HTTP_NOT_FOUND);
            }
        }
    }
    // xoa product
    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $path = $product->image;
            if (File::exists($path)) {
                File::delete($path);
            }
            $product->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã xóa thú cưng.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của thú cưng!'
            ],  Response::HTTP_NOT_FOUND);
        }
    }
}
