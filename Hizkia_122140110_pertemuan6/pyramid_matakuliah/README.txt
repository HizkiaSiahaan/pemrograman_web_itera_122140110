# Aplikasi Manajemen Matakuliah dengan Pyramid

Aplikasi API RESTful untuk manajemen matakuliah yang dibangun menggunakan Pyramid Framework dan PostgreSQL.

## Fitur

- REST API untuk operasi CRUD (Create, Read, Update, Delete) matakuliah
- Validasi input dan error handling yang komprehensif
- Menggunakan PostgreSQL sebagai database
- Terintegrasi dengan SQLAlchemy ORM dan Alembic untuk migrasi database

## Persyaratan Sistem

- Python 3.6 atau lebih baru
- PostgreSQL 10 atau lebih baru
- pip (Python package manager)

## Instalasi

### 1. Persiapan Lingkungan

```bash
mkdir pyramid_matakuliah
cd pyramid_matakuliah
```

### 2. Membuat Virtual Environment

```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkan virtual environment
# Untuk Windows
venv\Scripts\activate
# Untuk macOS/Linux
source venv/bin/activate
```

### 3. Instalasi Dependensi

```bash
# Upgrade pip dan setuptools
pip install --upgrade pip setuptools

# Instalasi dependensi proyek
pip install -e ".[testing]"
pip install psycopg2-binary
```

### 4. Konfigurasi Database PostgreSQL

```bash
# Login ke PostgreSQL
psql -U postgres

# Di dalam shell PostgreSQL
CREATE DATABASE pyramid_matakuliah;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_matakuliah TO pyramid_user;
\q
```

### 5. Konfigurasi Koneksi Database

Edit file `development.ini` dan ubah setting koneksi database:

```ini
# Cari dan ganti baris sqlalchemy.url
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_matakuliah
```

### 6. Migrasi Database

```bash
# Membuat file migrasi
alembic -c development.ini revision --autogenerate -m "create matakuliah table"

# Menjalankan migrasi
alembic -c development.ini upgrade head

# Inisialisasi database dengan data awal
python -m pyramid_matakuliah.scripts.initialize_db development.ini
```

## Menjalankan Aplikasi

```bash
# Pastikan virtual environment aktif, kemudian jalankan:
pserve development.ini --reload
```

Server akan berjalan pada http://localhost:6543

## Penggunaan API

### 1. Mendapatkan Daftar Matakuliah
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

### 2. Mendapatkan Detail Matakuliah
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

### 3. Menambahkan Matakuliah Baru
```bash
curl -X POST http://localhost:6543/api/matakuliah \
-H "Content-Type: application/json" \
-d '{
"kode_mk": "IF3110",
"nama_mk": "Pengembangan Aplikasi Berbasis Web",
"sks": 3,
"semester": 5
}'
```

### 4. Mengupdate Data Matakuliah
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
-H "Content-Type: application/json" \
-d '{
"nama_mk": "PBO Lanjut",
"sks": 4
}'
```

### 5. Menghapus Data Matakuliah
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/3
```

## Struktur Proyek

```
pyramid_matakuliah/
├── alembic/                 # Migrasi database
├── pyramid_matakuliah/
│   ├── models/
│   │   ├── __init__.py      # Konfigurasi model
│   │   ├── meta.py          # Metadata SQLAlchemy
│   │   └── matakuliah.py    # Model matakuliah
│   ├── scripts/
│   │   └── initialize_db.py # Script inisialisasi database
│   ├── views/
│   │   └── matakuliah.py    # View functions untuk API
│   ├── __init__.py          # Konfigurasi aplikasi
│   └── routes.py            # Definisi route
├── development.ini          # Konfigurasi development
├── production.ini           # Konfigurasi production
└── setup.py                 # Setup package Python
```

## Troubleshooting

### Masalah Koneksi Database
Jika terjadi error koneksi database, pastikan:
- PostgreSQL berjalan di sistem Anda
- Kredensial database di `development.ini` sudah benar
- Database dan user PostgreSQL sudah dibuat

### Error saat Migrasi
Jika terjadi error saat migrasi:
```bash
# Hapus file migrasi (jika perlu)
rm -rf alembic/versions/*

# Buat ulang migrasi
alembic -c development.ini revision --autogenerate -m "create matakuliah table"
alembic -c development.ini upgrade head
```
