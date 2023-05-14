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
                    'nameCard' => 'Test',
                    'cardNumber' => '4242 4242 4242 4242',
                    'cvc' => '123',
                    'month' => '12',
                    'year' => '2028',
                    'payment_mode' => 'Stripe',
                    'tracking_no' => 'petshop1433',
                ],
            ]
        );
    }
}
