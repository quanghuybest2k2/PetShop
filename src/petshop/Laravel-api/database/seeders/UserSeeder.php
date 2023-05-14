<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * php artisan db:seed --class=UserSeeder
     */
    public function run(): void
    {
        DB::table('users')->insert(
            [
                [
                    'name' => 'Admin',
                    'email' => 'admin@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_as' => 1,
                ],
                [
                    'name' => 'Đoàn Quang Huy',
                    'email' => 'quanghuybest@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_as' => 0,
                ],
                [
                    'name' => 'Lâm Ngọc Yến',
                    'email' => 'yenlam@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_as' => 0,
                ],
            ]
        );
    }
}
