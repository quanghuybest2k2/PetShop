<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => function () {
                return Category::factory()->create()->id;
            },
            'slug' => Str::slug($this->faker->sentence),
            'name' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'brand' => $this->faker->word,
            'selling_price' => $this->faker->randomFloat(2, 10, 100),
            'original_price' => $this->faker->randomFloat(2, 10, 100),
            'qty' => $this->faker->numberBetween(1, 10),
            'image' => $this->faker->imageUrl(640, 480, 'cats'),
            'featured' => $this->faker->boolean(),
            'status' => $this->faker->numberBetween(0, 1),
            'count' => $this->faker->numberBetween(0, 100),
        ];
    }
}
