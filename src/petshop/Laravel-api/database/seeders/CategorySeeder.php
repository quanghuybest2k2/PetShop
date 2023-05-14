<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert(
            [
                [
                    'slug' => 'cho',
                    'name' => 'Chó',
                    'description' => 'Chó Việt Nam',
                    'image' => 'uploads/category/1683206764.jpg',
                    'status' => 0,
                ],
                [
                    'slug' => 'meo',
                    'name' => 'Mèo',
                    'description' => 'Mèo Việt Nam',
                    'image' => 'uploads/category/1683206734.jpg',
                    'status' => 0,
                ],
            ]
        );
    }
}
