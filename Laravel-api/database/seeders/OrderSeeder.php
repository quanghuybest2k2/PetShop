<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert(
            [
                [
                    'user_id' => 2,
                    'amount' => '4130000',
                    'address' => '123 Tôn Đức Thắng, Ninh Sơn, Ninh Thuận, Việt Nam',
                    'payment_mode' => 'Stripe',
                    'tracking_no' => 'petshop1433',
                ],
                [
                    'user_id' => 2,
                    'amount' => '1200000',
                    'address' => '',
                    'payment_mode' => 'VnPay',
                    'tracking_no' => 'petshop1532',
                ],
            ]
        );
    }
}
