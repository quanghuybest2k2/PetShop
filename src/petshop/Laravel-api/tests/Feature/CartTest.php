<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testAddToCart()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $data = [
            'product_id' => $product->id,
            'product_qty' => 1,
        ];

        // Test unauthorized
        $response = $this->postJson('/api/add-to-cart', $data);
        $response->assertUnauthorized();

        // Test authenticated
        $response = $this->actingAs($user)
            ->postJson('/api/add-to-cart', $data);
        $response->assertSuccessful();

        // Trùng lặp khi thêm
        $response = $this->actingAs($user)
            ->postJson('/api/add-to-cart', $data);
        $response->assertStatus(409);
    }
    public function testViewCart()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();
        Cart::factory()->count(3)->create(
            [
                'user_id' => $user->id,
                'product_id' => $product->id,
                'product_qty' => rand(1, 10)
            ]
        );

        // Test unauthorized
        $response = $this->getJson('/api/cart');
        $response->assertUnauthorized();

        // Test authenticated
        $response = $this->actingAs($user)
            ->getJson('/api/cart');
        $response->assertSuccessful();
        $response->assertJsonStructure([
            'status',
            'cart' => [
                '*' => [
                    'id',
                    'user_id',
                    'product_id',
                    'product_qty',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }
    public function testDeleteCartItem()
    {
        // Tạo một người dùng đăng nhập và lấy thông tin đăng nhập của người dùng
        $product = Product::factory()->create();
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        // Tạo một mục trong giỏ hàng thuộc người dùng đó
        $cartItem = Cart::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        // Gọi API xóa mục trong giỏ hàng
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('DELETE', '/api/delete-cartitem/' . $cartItem->id);

        // Kiểm tra xem mục trong giỏ hàng đã được xóa thành công
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'Xóa thành công.',
        ]);

        // Kiểm tra xem mục trong giỏ hàng đã bị xóa thật sự
        $this->assertDatabaseMissing('carts', [
            'id' => $cartItem->id
        ]);
    }
}
