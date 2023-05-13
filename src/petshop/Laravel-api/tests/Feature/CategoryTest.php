<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public $email = 'admin@gmail.com';
    public $password = '12345678';

    // Xem danh mục không cần authentication
    public function testGetCategoy()
    {
        $response = $this->get('/api/getCategory');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'category',
        ]);
    }
    public function testGetAllCategory()
    {
        $response = $this->get('/api/get-all-category');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'category',
        ]);
    }
    public function testStore()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $file = UploadedFile::fake()->image('test.jpg');

        // Tạo dữ liệu giả ngẫu nhiên bằng phương thức factory()
        $categoryData = Category::factory()->make();

        $request = [
            'slug' => $categoryData->slug,
            'name' => $categoryData->name,
            'image' => $file,
            'status' => true,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/store-category', $request);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Thêm danh mục thành công.',
        ]);
    }

    public function testEditWithView()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $id = 1;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/edit-category/' . $id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'category',
        ]);
    }

    public function testUpdateCategory()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        // Tạo một record mới trong cơ sở dữ liệu
        $category = Category::factory()->create();

        // Tạo dữ liệu ngẫu nhiên để cập nhật record
        $updatedData = [
            'slug' => Str::random(10),
            'name' => 'New Category Name',
            'image' => 'image.jpg',
            'status' => true,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/update-category/' . $category->id, $updatedData);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Cập nhật danh mục thành công.',
        ]);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $category = Category::factory()->create();
        $id = $category->id;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->delete('/api/delete-category/' . $id);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Đã xóa danh mục.',
        ]);
    }
}
