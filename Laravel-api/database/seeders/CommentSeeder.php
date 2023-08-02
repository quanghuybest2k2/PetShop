<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert(
            [
                [
                    'product_id' => 1,
                    'user_id' => 2,
                    'comment' => 'Mẻo này xinh',
                ],
                [
                    'product_id' => 6,
                    'user_id' => 2,
                    'comment' => 'Chó này đen như cú chứ sô cô la gì',
                ],
                [
                    'product_id' => 3,
                    'user_id' => 2,
                    'comment' => 'Bốc em nó về thôi',
                ],
                [
                    'product_id' => 3,
                    'user_id' => 3,
                    'comment' => 'ơ kìa con gì giống con mèo quá z nè',
                ],
                [
                    'product_id' => 4,
                    'user_id' => 2,
                    'comment' => 'con chó gì nhìn giống con sư tử',
                ],
                [
                    'product_id' => 5,
                    'user_id' => 2,
                    'comment' => 'Cậu vàng bạn Lão Hạc đây sao',
                ],
            ]
        );
    }
}
