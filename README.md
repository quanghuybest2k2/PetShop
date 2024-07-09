# PetShop

Xây dựng ứng dụng web quản lý cửa hàng thú cưng

## Bài tập nhóm môn Phát triển ứng dụng web nâng cao

## API dùng Postman test

[Video Demo](https://www.youtube.com/watch?v=eXgQm2_3Ct4&t=216s&ab_channel=%C4%90o%C3%A0nQuangHuy)

[Link tham khảo](https://www.petshopdalat.vn/)

## Hướng dẫn cài đặt

### Yêu cầu môi trường

[composer](https://getcomposer.org/download/)

[NodeJS](https://nodejs.org/en)

[Xampp 8.2.4 / PHP 8.2.4](https://www.apachefriends.org/download.html)

### Cài đặt Database

#### Mở Xampp nhấn `start` Apache và nhấn `start` MYSQL

#### truy cập url `http://localhost/phpmyadmin/` và tạo database mới đặt tên là `petshop`

### Cài đặt laravel api

#### Gõ các lệnh:

### `cp .env.example .env`

### vào `.env` vừa tạo sửa `DB_DATABASE=petshop`

### Gõ lệnh `composer install` nếu không được thì gõ `composer update`

### Gõ lệnh `php artisan key:generate`

### Gõ lệnh `php artisan migrate:fresh --seed`

### Để chạy dự án `php artisan serve`

### Cài đặt react project

### Gõ các lệnh:

### `npm install`

#### Để chạy dự án

### `npm start`

### Docs API

`http://127.0.0.1:8000/api/docs`
