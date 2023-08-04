<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    // view category
    public function index()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => Response::HTTP_OK,
            'category' => $category,
        ]);
    }
    // get category client
    public function getAllCategory()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => Response::HTTP_OK,
            'category' => $category,
        ]);
    }
    // view all category
    public function allcategory()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => Response::HTTP_OK,
            'category' => $category,
        ]);
    }
    // edit category
    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'category' => $category,
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của danh mục!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
    // create category
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'slug' => 'required|max:255|unique:categories,slug',
                'name' => 'required|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            ],
            [
                'required'  => 'Bạn phải điền :attribute',
                'max'  => ':attribute không vượt quá :max ký tự',
                'unique'  => ':attribute đã tồn tại',
                'mimes'  => 'Định dạng :attribute không hợp lệ',
                'image'  => ':attribute phải là ảnh',
            ],
            [
                'slug' => 'Tên định danh',
                'name' => 'Tên danh mục',
                'image' => 'Hình ảnh',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        } else {
            $category = new Category;
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/category/', $filename);
                $category->image = 'uploads/category/' . $filename;
            }
            $category->status = $request->input('status') == true ? '1' : '0';
            $category->save();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Thêm danh mục thành công.'
            ]);
        }
    }
    // update category
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'slug' => 'required|max:255',
                'name' => 'required|max:255',

            ],
            [
                'required'  => 'Bạn phải điền :attribute',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $validator->messages(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $category = Category::find($id);
            if ($category) {
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                if ($request->hasFile('image')) {
                    $path = $category->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/category/', $filename);
                    $category->image = 'uploads/category/' . $filename;
                }
                $category->status = $request->input('status') == true ? '1' : '0';
                $category->save();
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Cập nhật danh mục thành công.'
                ]);
            } else {
                return response()->json([
                    'status' => Response::HTTP_NOT_FOUND,
                    'message' => 'Không tìm thấy id của danh mục!'
                ], Response::HTTP_NOT_FOUND);
            }
        }
    }
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $path = $category->image;
            if (File::exists($path)) {
                File::delete($path);
            }
            $category->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã xóa danh mục.'
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'Không tìm thấy id của danh mục!'
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
