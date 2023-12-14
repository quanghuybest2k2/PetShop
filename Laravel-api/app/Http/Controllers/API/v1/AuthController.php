<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ResponseTrait;
use Illuminate\Http\JsonResponse;


class AuthController extends Controller
{
    use ResponseTrait;

    /**
     * @OA\POST(
     *     path="/api/v1/register",
     *     tags={"Authentication"},
     *     summary="Register User",
     *     description="Register New User",
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="name", type="string", example="Đoàn Quang Huy"),
     *              @OA\Property(property="email", type="string", example="quanghuybest@gmail.com"),
     *              @OA\Property(property="password", type="string", example="12345678")
     *          ),
     *      ),
     *      @OA\Response(response=200, description="Register New User Data" ),
     *      @OA\Response(response=400, description="Bad request")
     * )
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:191',
                    'email' => 'required|email|max:191|unique:users,email',
                    'password' => 'required|min:8',
                ],
                [
                    'required' => 'Bạn phải điền :attribute',
                    'max' => ':attribute không được vượt quá :max ký tự',
                    'email' => ':attribute không hợp lệ',
                    'unique' => ':attribute đã được sử dụng',
                    'min' => ':attribute phải có ít nhất :min ký tự',
                ],
                [
                    'name' => 'Họ và tên',
                    'email' => 'Email',
                    'password' => 'Mật khẩu',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'status' => Response::HTTP_BAD_REQUEST,
                    'errors' => $validator->errors(),
                ], Response::HTTP_BAD_REQUEST);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Đăng ký thành công.',
                ]);
            }
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * @OA\POST(
     *     path="/api/v1/login",
     *     tags={"Authentication"},
     *     summary="Login",
     *     description="Login",
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="email", type="string", example="quanghuybest@gmail.com"),
     *              @OA\Property(property="password", type="string", example="12345678")
     *          ),
     *      ),
     *      @OA\Response(response=200, description="Login"),
     *      @OA\Response(response=401, description="UNAUTHORIZED")
     * )
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'email' => 'required|max:255',
                    'password' => 'required|min:8',
                ],
                [
                    'required'  => 'Bạn phải điền :attribute',
                    'max' => ':attribute không được vượt quá :max ký tự',
                    'min' => ':attribute phải có ít nhất :min ký tự',
                ],
                [
                    'email' => 'Email',
                    'password' => 'Mật khẩu'
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'validator_errors' => $validator->messages(),
                ]);
            } else {
                $user = User::where('email', $request->email)->first();
                if (!$user || !Hash::check($request->password, $user->password)) {
                    return response()->json([
                        'status' => Response::HTTP_UNAUTHORIZED,
                        'message' => 'Thông tin không hợp lệ!',
                    ], Response::HTTP_UNAUTHORIZED);
                } else {
                    if ($user->role_as == 1) { // admin
                        $role = 'admin';
                        $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
                    } else {
                        $role = '';
                        $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                    }
                    return response()->json([
                        'status' => Response::HTTP_OK,
                        'username' => $user->name,
                        'token' => $token,
                        'message' => 'Đăng nhập thành công.',
                        'role' => $role,
                    ]);
                }
            }
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * @OA\POST(
     *     path="/api/v1/logout",
     *     tags={"Authentication"},
     *     summary="Logout",
     *     description="Logout",
     *     @OA\Response(response=200, description="Logout" ),
     *     @OA\Response(response=400, description="Bad request")
     * )
     */
    public function logout(): JsonResponse
    {
        try {
            auth()->user()->tokens()->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Đã đăng xuất.',
            ]);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
