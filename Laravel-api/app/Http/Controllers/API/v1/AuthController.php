<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
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
    }
    public function login(Request $request)
    {
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
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Đã đăng xuất.',
        ]);
    }
}
