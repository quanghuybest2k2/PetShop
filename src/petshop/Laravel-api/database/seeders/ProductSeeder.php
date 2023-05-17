<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert(
            [
                [
                    'category_id' => 2,
                    'slug' => 'miu-miu',
                    'name' => 'Miu Miu',
                    'description' => 'Miu Miu là mèo đó',
                    'brand' => 'Ninh Thuận',
                    'selling_price' => '1200000',
                    'original_price' => '1300000',
                    'qty' => '20',
                    'image' => 'uploads/product/1683206936.jpg',
                    'featured' => 1,
                    'status' => 0,
                    'count' => 6,
                ],
                [
                    'category_id' => 1,
                    'slug' => 'cho-shiba',
                    'name' => 'Chó Shiba',
                    'description' => 'Giống chó Nhật Bản',
                    'brand' => 'Đà Lạt',
                    'selling_price' => '1200000',
                    'original_price' => '1400000',
                    'qty' => '15',
                    'image' => 'uploads/product/1683206996.jpg',
                    'featured' => 1,
                    'status' => 0,
                    'count' => 0,
                ],
                [
                    'category_id' => 2,
                    'slug' => 'meo-trang',
                    'name' => 'Mèo Trắng',
                    'description' => 'Mèo màu trắng',
                    'brand' => 'Ấn Độ',
                    'selling_price' => '1300000',
                    'original_price' => '1400000',
                    'qty' => '8',
                    'image' => 'uploads/product/1683207088.jpg',
                    'featured' => 0,
                    'status' => 0,
                    'count' => 14,
                ],
                [
                    'category_id' => 1,
                    'slug' => 'chow-chow',
                    'name' => 'Chow Chow',
                    'description' => 'Chó Canada',
                    'brand' => 'Canada',
                    'selling_price' => '13300000',
                    'original_price' => '13400000',
                    'qty' => '10',
                    'image' => 'uploads/product/1683207152.jpg',
                    'featured' => 0,
                    'status' => 0,
                    'count' => 4,
                ],
                [
                    'category_id' => 1,
                    'slug' => 'cau-vang',
                    'name' => 'Cậu Vàng',
                    'description' => 'Bạn Lão Hạc',
                    'brand' => 'Hà Nội',
                    'selling_price' => '13300000',
                    'original_price' => '14300000',
                    'qty' => '12',
                    'image' => 'uploads/product/1683207204.jpg',
                    'featured' => 1,
                    'status' => 0,
                    'count' => 0,
                ],
                [
                    'category_id' => 1,
                    'slug' => 'so-co-la',
                    'name' => 'Sô cô la',
                    'description' => 'Chó này màu nâu',
                    'brand' => 'Ninh Thuận',
                    'selling_price' => '1530000',
                    'original_price' => '1630000',
                    'qty' => '1',
                    'image' => 'uploads/product/1683207822.jpg',
                    'featured' => 1,
                    'status' => 0,
                    'count' => 4,
                ],
            ]
        );
    }
}
