<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuthTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public $name = 'Nguyễn Văn Dũng';
    public $email = 'dungnguyen@gmail.com';
    public $password = '12345678';

    public function testRegister()
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->safeEmail,
            'password' => $this->faker->password(8),
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'username' => $userData['name'],
            'message' => 'Đăng ký thành công.',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => $userData['name'],
            'email' => $userData['email'],
        ]);

        $user = User::where('email', $userData['email'])->first();
        $this->assertTrue(Hash::check($userData['password'], $user->password));
    }
    public function test_register_with_missing_fields()
    {
        $response = $this->postJson('/api/register');

        $response->assertStatus(400);
        $response->assertJsonValidationErrors(['name', 'email', 'password']);
    }
    public function test_login()
    {
        // Tạo tài khoản user mới
        $user = User::factory()->create([
            'email' => $this->email,
            'password' => Hash::make($this->password),
        ]);

        // Gửi yêu cầu đăng nhập với email và password đúng
        $response = $this->postJson('/api/login', [
            'email' => $this->email,
            'password' => $this->password,
        ]);

        // Kiểm tra kết quả trả về của yêu cầu đăng nhập
        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'username',
                'token',
                'message',
                'role',
            ])
            ->assertJson([
                'status' => 200,
                'username' => $user->name,
                'message' => 'Đăng nhập thành công.',
            ]);

        // Lấy Auth Token từ kết quả trả về
        $token = $response->json('token');

        // Kiểm tra Auth Token đã được tạo và trả về
        $this->assertNotEmpty($token);
    }

    public function testLogout()
    {
        // Tạo một người dùng mới và tạo token cho người dùng đó
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Gửi một yêu cầu POST đến API logout
        $response = $this->post('/api/logout');

        // Kiểm tra xem token đã bị xóa chưa
        $this->assertCount(0, $user->tokens);

        // Kiểm tra xem phản hồi có đúng mã lỗi và thông báo
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Đã đăng xuất.',
        ]);
    }
}
