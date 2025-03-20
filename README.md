# PetShop

## Giới thiệu

PetShop là một ứng dụng web giúp quản lý cửa hàng thú cưng, hỗ trợ người dùng quản lý sản phẩm, đơn hàng, khách hàng và nhiều tính năng khác.

## Bài tập nhóm môn Phát triển ứng dụng web nâng cao

## API dùng Postman để test

- [Video Demo](https://www.youtube.com/watch?v=eXgQm2_3Ct4&t=216s&ab_channel=%C4%90o%C3%A0nQuangHuy)
- [Tham khảo PetShop Đà Lạt](https://www.petshopdalat.vn/)

---

## Hướng dẫn cài đặt

### 1. Yêu cầu môi trường

Trước khi cài đặt và chạy dự án, hãy đảm bảo rằng hệ thống của bạn đã được cài đặt các công cụ sau:

- [Composer](https://getcomposer.org/download/)
- [NodeJS](https://nodejs.org/en)
- [XAMPP 8.2.4 / PHP 8.2.4](https://www.apachefriends.org/download.html)

### 2. Cài đặt Database

1. Mở **XAMPP** và nhấn `Start` Apache và `Start` MySQL.
2. Truy cập `http://localhost/phpmyadmin/`.
3. Tạo một database mới với tên **petshop**.

### 3. Cài đặt Laravel API

Thực hiện các bước sau để cài đặt API backend sử dụng Laravel:

```sh
cd Laravel-api
cp .env.example .env
```

- Mở file `.env` vừa tạo và chỉnh sửa dòng sau:
  ```env
  DB_DATABASE=petshop
  ```

Tiếp theo, chạy các lệnh sau để cài đặt:

```sh
composer install  # Nếu gặp lỗi, có thể thử `composer update`
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

Lệnh cuối cùng sẽ khởi động server Laravel.

### 4. Cài đặt React Frontend

Tiếp theo, thiết lập React project:

```sh
cd react-project
cp .env.example .env
npm install
npm start
```

Lệnh `npm start` sẽ khởi chạy ứng dụng React trên `http://localhost:3000`.

---

## Chạy dự án với Docker

Bạn cũng có thể chạy dự án bằng Docker. Xem hướng dẫn chi tiết tại [đây](./run-with-docker.md).

---

## Tài liệu API

- Truy cập tài liệu API tại: `http://127.0.0.1:8000/api/docs`

## Liên hệ

Nếu có bất kỳ vấn đề nào khi cài đặt hoặc sử dụng ứng dụng, vui lòng liên hệ nhóm phát triển để được hỗ trợ.
