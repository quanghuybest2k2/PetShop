<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    // view category
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    // get category client
    public function getAllCategory()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    // view all category
    public function allcategory()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    // edit category
    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy id của danh mục!',
            ]);
        }
    }
    // create category
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'slug' => 'required|max:191|unique:categories,slug',
                'name' => 'required|max:191',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:15360',
            ],
            [
                'required'  => 'Bạn phải điền :attribute',
                'unique'  => 'Slug đã tồn tại!',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
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
                'status' => 200,
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
                'slug' => 'required|max:191',
                'name' => 'required|max:191',

            ],
            [
                'required'  => 'Bạn phải điền :attribute',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
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
                    'status' => 200,
                    'message' => 'Cập nhật danh mục thành công.'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy id của danh mục!'
                ]);
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
                'status' => 200,
                'message' => 'Đã xóa danh mục.'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy id của danh mục!'
            ]);
        }
    }
}
