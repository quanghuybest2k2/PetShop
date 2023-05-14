<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('albums')->insert(
            [
                [
                    'user_id' => 2,
                    'category_id' => 2,
                    'emotion' => 'Cục cưng nay biết tia gái rồi ta',
                    'image_pet' => 'uploads/album/1683207315.jpg',
                ],
                [
                    'user_id' => 2,
                    'category_id' => 1,
                    'emotion' => 'Mèo này mặt láo ghê',
                    'image_pet' => 'uploads/album/1683207450.jpg',
                ],
                [
                    'user_id' => 3,
                    'category_id' => 2,
                    'emotion' => 'Chó chị mày xinh nhất',
                    'image_pet' => 'uploads/album/1683207506.jpg',
                ],
            ]
        );
    }
}
