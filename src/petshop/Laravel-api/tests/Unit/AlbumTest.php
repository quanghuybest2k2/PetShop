<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class AlbumTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function testReturnsCorrectData()
    {

        $response = $this->get('/api/getAlbumPet');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'pets' => [
                    '*' => [
                        'id',
                        'user_id',
                        'category_id',
                        'emotion',
                        'image_pet',
                        'created_at',
                        'updated_at',
                        'category' => [
                            'id',
                            'slug',
                            'name',
                            'description',
                            'image',
                            'status',
                            'created_at',
                            'updated_at',
                        ],
                        'user' => [
                            'id',
                            'name',
                            'email',
                            'email_verified_at',
                            'role_as',
                            'created_at',
                            'updated_at',
                        ],
                    ],
                ],
            ]);
    }
}
