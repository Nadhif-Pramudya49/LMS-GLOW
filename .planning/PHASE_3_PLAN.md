# Phase 3 Implementation Plan: Transactions & Search

## Goal
Implementasi sistem peminjaman dan pengembalian buku, manajemen stok otomatis, dan fitur riwayat transaksi bagi anggota.

## Tasks

### T3.1: Backend Transaction Logic
- [ ] Buat `transactionController.js` dengan fungsi:
    - `borrowBook`: Mencatat peminjaman (Akses: Librarian).
        - Cek stok buku (F12).
        - Insert ke tabel `transactions`.
        - Kurangi stok di tabel `books` (F10).
    - `returnBook`: Mencatat pengembalian (Akses: Librarian).
        - Update tabel `transactions` (status & return_date).
        - Tambah stok di tabel `books` (F11).
    - `getMemberHistory`: Mendapatkan riwayat pinjam untuk anggota tertentu (Akses: Member sendiri, Admin, Librarian).
- [ ] Buat `transactionRoutes.js` dan proteksi dengan `authMiddleware`.
- [ ] Daftarkan route `/api/v1/transactions` di `server/index.js`.

### T3.2: Frontend Transaction UI (Librarian)
- [ ] Buat halaman `Transactions.jsx` untuk Pustakawan.
- [ ] Form Peminjaman: Pilih Anggota (dropdown/search) + Pilih Buku (dropdown/search).
- [ ] Daftar Peminjaman Aktif: Tabel yang menampilkan buku yang sedang dipinjam dengan tombol "Process Return".

### T3.3: Frontend Member History UI
- [ ] Buat halaman `MyHistory.jsx` untuk Anggota.
- [ ] Tampilkan tabel riwayat (Nama Buku, Tanggal Pinjam, Tanggal Kembali, Status).

## Verification Criteria
- [ ] Pustakawan berhasil memproses peminjaman; stok buku berkurang 1.
- [ ] Pustakawan berhasil memproses pengembalian; stok buku bertambah 1.
- [ ] Sistem menolak peminjaman jika stok = 0.
- [ ] Anggota dapat melihat riwayat peminjaman mereka sendiri dengan data yang akurat.
- [ ] Database `transactions` mencatat `member_id` dan `librarian_id` dengan benar.
