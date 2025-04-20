# KiaTrack - Aplikasi Manajemen Buku Pribadi

Aplikasi web untuk mengelola koleksi buku pribadi yang memungkinkan pengguna mencatat buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli.

## Fitur Utama

- **Pengelolaan Buku**
  - Menambahkan buku baru (judul, penulis, status: milik/baca/beli)
  - Mengedit detail buku yang sudah ada
  - Menghapus buku dari koleksi

- **Organisasi dan Pencarian**
  - Filter buku berdasarkan status (milik/baca/beli)
  - Pencarian buku berdasarkan judul atau penulis
  - Tampilan statistik koleksi buku

- **Penyimpanan Data**
  - Data buku tersimpan di localStorage browser
  - Data tetap tersedia setelah menutup browser

## Screenshot Aplikasi


*Halaman utama dengan daftar buku*


*Form untuk menambahkan buku baru*


*Halaman statistik koleksi buku*

## Cara Instalasi dan Menjalankan

1. Clone repository ini
   ```bash
   git clone https://github.com/username/mybookshelf.git
   cd mybookshelf
   ```

2. Install dependensi
   ```bash
   npm install
   ```

3. Jalankan aplikasi
   ```bash
   npm start
   ```

4. Buka browser dan akses
   ```
   http://localhost:3000
   ```

## Teknologi dan Fitur React yang Digunakan

- **React Hooks**
  - `useState` untuk manajemen state lokal komponen
  - `useEffect` untuk efek samping seperti menyimpan data ke localStorage
  - `useContext` untuk akses state global

- **Context API**
  - Implementasi state management global menggunakan BookContext
  - Menyediakan akses data buku ke seluruh komponen

- **Custom Hooks**
  - `useLocalStorage`: Hook untuk menyimpan dan mengambil data dari localStorage
  - `useBookStats`: Hook untuk menghitung statistik koleksi buku

- **React Router**
  - Navigasi multi-halaman (Home, Stats)
  - URL routing untuk akses langsung ke halaman tertentu

- **Struktur Komponen**
  - Komponen reusable (BookForm, BookList, BookFilter)
  - Pemisahan tanggung jawab dengan struktur folder yang jelas

- **PropTypes**
  - Type checking untuk memastikan prop yang diberikan sesuai

- **React Testing Library**
  - Unit test untuk memastikan komponen berfungsi dengan benar

## 📝 Catatan Pengembangan

- Kode dilengkapi dengan komentar pada bagian-bagian penting
- Penanganan error diimplementasikan untuk validasi form
- UI/UX dirancang dengan warna yang nyaman di mata dan tampilan modern