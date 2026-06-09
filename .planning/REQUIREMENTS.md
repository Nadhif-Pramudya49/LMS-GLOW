# Requirements

## Functional Requirements (F-IDs)
- **F01**: Pengguna dapat melakukan Login dan Logout berdasarkan role (Admin, Pustakawan, Anggota).
- **F02**: Dashboard menampilkan ringkasan data sesuai role pengguna:
  - **Admin**: Total Buku, Total Anggota, Total Peminjaman.
  - **Pustakawan**: Buku Dipinjam, Buku Tersedia.
  - **Anggota**: Buku yang sedang dipinjam, Riwayat peminjaman.
- **F03**: Admin dan Pustakawan dapat melakukan CRUD data Buku (Judul, Pengarang, ISBN, Kategori, Stok).
- **F04**: Admin dapat melakukan CRUD data Anggota.
- **F05**: Anggota dapat mencari buku berdasarkan Judul atau Pengarang.
- **F06**: Pustakawan dapat mencatat transaksi Peminjaman Buku.
- **F07**: Pustakawan dapat mencatat transaksi Pengembalian Buku.
- **F08**: Anggota dapat melihat riwayat peminjaman mereka sendiri (Nama Buku, Tanggal Pinjam, Tanggal Kembali, Status).
- **F09**: Admin dapat melihat laporan/statistik total buku dan anggota.
- **F10**: Sistem harus mengurangi stok buku secara otomatis saat transaksi peminjaman berhasil.
- **F11**: Sistem harus menambah stok buku secara otomatis saat transaksi pengembalian berhasil.
- **F12**: Sistem harus mencegah peminjaman jika stok buku sama dengan 0.

## Non-Functional Requirements (NF-IDs)
- **NF01**: Sistem harus memiliki antarmuka yang responsif (React.js).
- **NF02**: Keamanan data menggunakan JWT untuk autentikasi API.
- **NF03**: Konsistensi data antara Backend (Node.js) dan Database (MySQL).
- **NF04**: Dokumentasi kode dan alur kerja Agentic AI harus jelas sesuai standar GSD.
