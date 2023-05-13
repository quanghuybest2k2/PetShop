<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Album;
use App\Models\Category;
use Laravel\Sanctum\Sanctum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AlbumTest extends TestCase
{
    public function test_GetAllPet()
    {
        // Gửi request GET đến endpoint của API
        $response = $this->get('/api/getAlbumPet');

        // Kiểm tra status code của response
        $response->assertStatus(200);

        // Kiểm tra cấu trúc JSON response
        $response->assertJsonStructure([
            'status',
            'pets' => [
                '*' => [
                    'user_id',
                    'user' => [
                        'email',
                        'name'
                    ],
                ]
            ]
        ]);
    }

    public function testStoreWithoutAuthentication()
    {
        $response = $this->postJson('/api/store-albumPet', [
            'category_id' => 1,
            'emotion' => 'happy',
            'image_pet' => UploadedFile::fake()->image('pet.jpg'),
        ], [
            'Authorization' => 'Bearer invalid_token'
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 401,
                'message' => 'Bạn phải đăng nhập!',
            ]);
    }
    public function testStoreSuccess()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        // Tạo dữ liệu giả ngẫu nhiên bằng phương thức factory()
        $categoryData = Album::factory()->make();

        $request = [
            'user_id' => $categoryData->user_id,
            'category_id' => $categoryData->category_id,
            'emotion' => $categoryData->emotion,
            'image_pet' => UploadedFile::fake()->image('pet.jpg'),
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/store-albumPet', $request);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Thêm thú cưng thành công.',
        ]);
    }
}
