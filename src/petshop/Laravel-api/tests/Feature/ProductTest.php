<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    public function testGetProduct()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;
        // Tạo một số sản phẩm giả để kiểm tra
        Product::factory()->count(3)->create();

        // Gửi yêu cầu GET tới API
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/view-product');

        // Kiểm tra phản hồi của API
        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'products' => [
                    '*' => [
                        'category_id',
                        'slug',
                        'name',
                        'description',
                        'brand',
                        'selling_price',
                        'original_price',
                        'qty',
                        'image',
                        'featured',
                        'status',
                    ],
                ],
            ]);
    }
    public function test_Store_Product()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $file = UploadedFile::fake()->image('pet.jpg');

        // Tạo dữ liệu giả ngẫu nhiên bằng phương thức factory()
        $productData = Product::factory()->make();

        $request = [
            'category_id' => $productData->category_id,
            'slug' => $productData->slug,
            'name' => $productData->name,
            'description' => $productData->description,
            'brand' => $productData->brand,
            'selling_price' => $productData->selling_price,
            'original_price' => $productData->original_price,
            'qty' => $productData->qty,
            'name' => $productData->name,
            'image' => $file,
            'featured' => $productData->featured,
            'status' => true,
            'count' => $productData->count,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/store-product', $request);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Thêm thú cưng thành công.',
        ]);
    }
    public function testDestroyProduct()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $product = Product::factory()->create();
        // lấy id vừa tạo
        $id = $product->id;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->delete('/api/delete-product/' . $id);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Đã xóa thú cưng.',
        ]);
    }
}
