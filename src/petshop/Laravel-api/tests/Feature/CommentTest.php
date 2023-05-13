<?php

namespace Tests\Feature;

use App\Models\Comment;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Database\Factories\CommentFactory;
use Laravel\Sanctum\Sanctum;
use Database\Factories\UserFactory;
use Database\Factories\ProductFactory;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testSuccessfulCommentCreation()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['status' => '0']);
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/store-comment/' . $product->slug, [
            'comment' => 'Con chó này dễ thương ghê.',
        ]);

        // Assert the response status code is 200 (OK)
        $response->assertStatus(200);

        // Assert the response contains the success message
        $response->assertJson([
            'status' => 200,
            'message' => 'Bình luận thành công.'
        ]);

        // Assert the comment is created in the database
        $this->assertDatabaseHas('comments', [
            'product_id' => $product->id,
            'user_id' => $user->id,
            'comment' => 'Con chó này dễ thương ghê.',
        ]);
    }
    // Chưa viết bình luận
    public function testStoreMissingComment()
    {
        $response = $this->post('/api/store-comment/product-slug', []);

        $response->assertStatus(422)
            ->assertJson([
                'status' => 422,
                'errors' => [
                    'comment' => ['Bạn phải viết bình luận!']
                ]
            ]);
    }

    public function testStoreInvalidProductSlug()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->actingAs($user, 'sanctum')->post('/api/store-comment/adadadada', [
            'comment' => 'Con chim này xinh quá.'
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'status' => 404,
                'message' => 'Không có thú cưng này!'
            ]);
    }
    // chưa đăng nhập
    public function testStoreUnauthenticated()
    {
        $response = $this->post('/api/store-comment/product-slug', [
            'comment' => 'Con chó này dễ thương ghê.',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 401,
                'message' => 'Bạn phải đăng nhập!'
            ]);
    }
}
