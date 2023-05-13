<?php

namespace Tests\Feature;

use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Symfony\Component\HttpFoundation\Response;

class SubscriberTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public $email = 'abc@gmail.com';
    public function test_get_subscriber()
    {
        // Lấy danh sách subscriber từ cơ sở dữ liệu
        $subscribers = Subscriber::all();

        $response = $this->get('/api/getSubscribers');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 200,
                'subscribers' => $subscribers->toArray()
            ]);
    }

    public function testApiWith200()
    {
        $response = $this->get('/api/getSubscribers');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 200,
                'subscribers' => []
            ]);
    }
    public function testStoreSubscriberWithValidator()
    {
        $response = $this->post('/api/subscribers', ['email' => $this->email]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('subscribers', ['email' => $this->email]);
    }
    public function test_can_create_a_subscriber()
    {
        $subscriber = Subscriber::factory()->create();

        $this->assertInstanceOf(Subscriber::class, $subscriber);
        $this->assertDatabaseHas('subscribers', [
            'id' => $subscriber->id,
            'email' => $subscriber->email,
        ]);
    }
}
