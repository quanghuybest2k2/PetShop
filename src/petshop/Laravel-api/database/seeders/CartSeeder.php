<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carts')->insert(
            [
                [
                    'user_id' => 2,
                    'product_id' => 1,
                    'product_qty' => 1,
                ],
            ]
        );
    }
}
