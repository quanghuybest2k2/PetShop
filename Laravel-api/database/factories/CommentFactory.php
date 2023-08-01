<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Comment;
use App\Models\Product;
use Faker\Generator as Faker;
use Database\Factories\UserFactory;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => function () {
                return Product::factory()->create()->id;
            },
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'comment' => $this->faker->sentence,
        ];
    }
}
