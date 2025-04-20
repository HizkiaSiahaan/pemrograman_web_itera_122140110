<<<<<<< HEAD
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
=======

Dashboard Penjadwalan Kuliah ITERA adalah aplikasi web yang dirancang untuk membantu pengguna dalam mengorganisir aktivitas sehari-hari, khususnya untuk mahasiswa. Aplikasi ini menyediakan tiga fitur utama:

Daftar Tugas: Membuat, mengedit, menandai sebagai selesai, dan menghapus daftar tugas
Jadwal Kuliah: Menyimpan dan mengelola jadwal perkuliahan dengan detail mata kuliah, hari, waktu, dan ruangan
Catatan: Membuat catatan penting dengan format judul dan isi
Semua data disimpan secara lokal di browser menggunakan localStorage, sehingga tetap tersedia meskipun browser ditutup.

Screenshoot Fitur Daftar Tugas

Screenshoot Fitur Jadwal Kuliah

Screenshoot Fitur Catatan
 
Fitur ES6+ yang Diimplementasikan
1.Classes:
    TaskManager, ScheduleManager, dan NoteManager diimplementasikan sebagai class ES6 Menggunakan method dan property class untuk mengelola data
2.Modules:
    Aplikasi dibagi menjadi modul-modul terpisah (data.js, utils.js, main.js) Menggunakan import/export untuk mengelola dependensi
3.Arrow Functions:
    Digunakan secara konsisten di seluruh kode untuk fungsi-fungsi pendek
4.Template Literals:
    Digunakan untuk string yang kompleks (meskipun tidak terlalu terlihat dalam kode saat ini)
5.Const/Let:
    Mengganti var dengan const dan let untuk deklarasi variabel
6.Spread Operator:
    Digunakan dalam updateSchedule dan updateNote untuk membuat objek baru
7.LocalStorage API:
    Untuk penyimpanan data persisten di sisi klien
8.Event Delegation:
    Digunakan untuk menangani event pada elemen-elemen dinamis
9.Promises & Async/Await:
    Diimplementasikan dalam fungsi showNotification di utils.js
10.Default Parameters:
    Digunakan dalam fungsi showNotification untuk parameter type
>>>>>>> d61d16940a9553eec4c74aeda0506dd07f39e509
