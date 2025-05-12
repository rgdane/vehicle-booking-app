# 🚗 Aplikasi Pemesanan Kendaraan (APK)

Dokumen ini berisi informasi terkait konfigurasi, kredensial login, versi teknologi yang digunakan, serta panduan penggunaan aplikasi.

---

## 🔐 Daftar Username & Password

| Username          | Password     | Role             |
|------------------|--------------|------------------|
| admin@gmail.com  | admin123  | admin            |
| cabang@gmail.com | cabang123 | direktur_cabang  |
| pusat@gmail.com  | pusat123 | direktur_pusat   |

> **Catatan**: Gantilah password default ini saat deploy ke production!

---

## 💾 Konfigurasi Database

- **DBMS**: MySQL / MariaDB
- **Database Name**: `db_vehicle_booking_app`
- **Username**: `root`
- **Password**: *(kosong / sesuai config lokal)*
- **Port**: `3306`

---

## 🧰 Versi Teknologi

| Teknologi | Versi        |
|-----------|--------------|
| PHP       | 8.1+         |
| MySQL     | 5.7 / 8.0    |
| Laravel   | 10.x         |
| React     | 18.x         |
| Node.js   | 18.x (untuk frontend build) |
| Ant Design| 5.x          |

---

## 📦 Setup & Instalasi

### Backend (Laravel)

1. Clone repo backend:
    ```bash
    git clone https://github.com/rgdane/vehicle-booking-app backend

    cd backend
    ```

2. Install dependency:
    ```bash
    composer install
    ```

3. Salin file `.env`:
    ```bash
    cp .env.example .env
    ```

4. Atur database di `.env`:
    ```
    DB_DATABASE=db_vehicle_booking_app
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5. Generate key & migrate:
    ```bash
    php artisan key:generate
    php artisan migrate --seed
    ```

6. Jalankan server:
    ```bash
    php artisan serve
    ```

---

### Frontend (React + Vite)

1. Masuk ke direktori frontend:
    ```bash
    cd frontend
    ```

2. Install dependency:
    ```bash
    npm install
    ```

3. Jalankan:
    ```bash
    npm run dev
    ```

4. Akses di: `http://127.0.0.1:5173`

---

## 🔧 Fitur Utama

- Autentikasi berdasarkan peran (`admin`, `direktur_cabang`, `direktur_pusat`)
- Pengajuan pemesanan kendaraan
- Proses approval 2 tahap
- Manajemen pengemudi & kendaraan
- Dashboard statistik penggunaan kendaraan

---

## 📌 Catatan Tambahan

- Pastikan backend Laravel dan frontend React jalan secara paralel
- Gunakan browser terbaru untuk kompatibilitas penuh

---

## 🧑‍💻 Developer

Silakan hubungi developer jika ada kendala teknis atau kebutuhan deployment:
- **Nama**: Rega Dane Wijayanta
- **Email**: regadanew1@gmail.com
- **Whatsapp**: wa.me/+628970852650
