<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Album;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;
use OpenApi\Annotations as OA;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Info(
 *     description="Petshop API Documentation",
 *     version="1.0.0",
 *     title="Petshop API",
 *     @OA\Contact(
 *         email="quanghuybest@gmail.com"
 *     ),
 *     @OA\License(
 *         name="GPL2",
 *         url="https://github.com/quanghuybest2k2"
 *     )
 * )
 */

class AlbumController extends Controller
{
    use ResponseTrait;
    /**
     * @OA\GET(
     *     path="/api/v1/getAlbumPet",
     *     tags={"Albums"},
     *     summary="Get Album List",
     *     description="Get Album List as Array",
     *     operationId="index",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200,description="Get Album List as Array"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function index(): JsonResponse
    {
        try {
            $pets = Album::all();
            return response()->json([
                'status' => Response::HTTP_OK,
                'pets' => $pets,
            ], Response::HTTP_OK);
            // return $this->responseSuccess($pets, "Lấy thú cưng thành công!");
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // public function index()
    // {
    //     $cache_key = 'pets_cache';
    //     $maxAge = 120;
    //     if (Cache::has($cache_key)) {
    //         $pets = Cache::get($cache_key);
    //     } else {
    //         $pets = Album::all();
    //         $pets->map(function ($user) {
    //             return [
    //                 'user_id' => $user->id,
    //                 'user_email' => $user->user->email,
    //                 'username' => $user->user->name, // album->user()
    //             ];
    //         });
    //         Cache::put($cache_key, $pets, $maxAge);
    //     }
    //     return response()->json([
    //         'status' => 200,
    //         'pets' => $pets,
    //     ])->header('Cache-Control', "public, max-age=$maxAge");
    // }
    /**
     * @OA\POST(
     *     path="/api/v1/store-albumPet",
     *     tags={"Albums"},
     *     summary="Create New Album",
     *     description="Create New Product",
     *     operationId="store",
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="user_id", type="integer", example=1),
     *              @OA\Property(property="category_id", type="integer", example=1),
     *              @OA\Property(property="emotion", type="string", example="wao wao"),
     *              @OA\Property(property="image_pet", type="string", example=""),
     *          ),
     *      ),
     *      security={{"bearer":{}}},
     *      @OA\Response(response=200, description="Create New Album" ),
     *      @OA\Response(response=401, description="UNAUTHORIZED"),
     *      @OA\Response(response=422, description="Resource UNPROCESSABLE"),
     * )
     */
    public function store(Request $request): JsonResponse
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make(
                $request->all(),
                [
                    'category_id' => 'required|max:255',
                    'emotion' => 'required|max:255',
                    'image_pet' => 'required|image|mimes:jpeg,png,jpg|max:10240',
                ],
                [
                    'required' => 'Bạn phải điền :attribute',
                    'max' => ':attribute không được vượt quá :max ký tự',
                    'mimes' => ':attribute chỉ chấp nhận jpeg,png,jpg',
                    'image' => ':attribute chỉ phải là hình ảnh',
                ],
                [
                    'category_id' => 'Category Id',
                    'emotion' => 'Cảm xúc',
                    'image_pet' => 'Ảnh thú cưng',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => $validator->messages(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $pet = new Album;
                $pet->user_id = $user_id;
                $pet->category_id = $request->input('category_id');
                $pet->emotion = $request->input('emotion');
                if ($request->hasFile('image_pet')) {
                    $file = $request->file('image_pet');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/album/', $filename);
                    $pet->image_pet = 'uploads/album/' . $filename;
                }
                $pet->save();
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Thêm thú cưng thành công.',
                ]);
            }
        } else {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Bạn phải đăng nhập!',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
}
