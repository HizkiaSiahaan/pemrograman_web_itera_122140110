
Dashboard Penjadwalan Kuliah ITERA adalah aplikasi web yang dirancang untuk membantu pengguna dalam mengorganisir aktivitas sehari-hari, khususnya untuk mahasiswa. Aplikasi ini menyediakan tiga fitur utama:

Daftar Tugas: Membuat, mengedit, menandai sebagai selesai, dan menghapus daftar tugas
Jadwal Kuliah: Menyimpan dan mengelola jadwal perkuliahan dengan detail mata kuliah, hari, waktu, dan ruangan
Catatan: Membuat catatan penting dengan format judul dan isi
Semua data disimpan secara lokal di browser menggunakan localStorage, sehingga tetap tersedia meskipun browser ditutup.

Screenshoot Fitur Daftar Tugas
![Screenshot 2025-04-13 220056](https://github.com/user-attachments/assets/63b6317c-6006-480c-8fa5-ac295d47da6e)

Screenshoot Fitur Jadwal Kuliah
![image](https://github.com/user-attachments/assets/628d553c-bf40-4c81-8215-93ba47f15f10)

Screenshoot Fitur Catatan
 ![image](https://github.com/user-attachments/assets/b5c8b369-a1ad-41c9-80b0-efe481c4894b)

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
