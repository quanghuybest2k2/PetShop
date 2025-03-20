# Hướng Dẫn Chạy Dự Án với Docker

## 1. Khởi Động Dịch Vụ

Sử dụng lệnh sau để khởi động toàn bộ ứng dụng với Docker:

```bash
docker compose up -d --build
```

## 2. Truy Cập Các Dịch Vụ

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **PHPMyAdmin:** [http://localhost:82](http://localhost:82)

### 2.1 Thông Tin Đăng Nhập PHPMyAdmin

- **Username:** `huy`
- **Password:** `huy`

> **Lưu ý:** Vui lòng đợi khoảng **1 phút** để các dịch vụ khởi động hoàn tất 😆.

---

# Chạy Docker Trong Môi Trường Phát Triển (Dev)

Sử dụng lệnh sau để chạy Docker với môi trường Dev:

```bash
docker compose -f docker-compose.local.yml up -d --build
```

## 3. Chạy Backend

Mở terminal đầu tiên và chạy các lệnh sau:

```bash
docker exec -it backend bash

chown -R www-data:www-data /var/www/html

chown -R www-data:www-data /var/www/html/storage

chmod -R 775 /var/www/html/storage

cp /var/www/html/.env.docker.example /var/www/html/.env

composer install --ignore-platform-reqs

php artisan key:generate

php artisan migrate:fresh --seed
```

## 4. Chạy Frontend

Mở terminal thứ hai và chạy các lệnh sau:

```bash
docker exec -it frontend bash

cp /app/.env.example /app/.env

npm install

npm start
```

## 5. Truy Cập Các Dịch Vụ

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **PHPMyAdmin:** [http://localhost:82](http://localhost:82)

### 5.1 Thông Tin Đăng Nhập PHPMyAdmin

- **Username:** `huy`
- **Password:** `huy`

> **Lưu ý:** Vui lòng đợi khoảng **1 phút** để các dịch vụ khởi động hoàn tất 😆.
