# Phase 2 Implementation Plan: Core Management (Book CRUD)

## Goal
Implementasi manajemen data buku lengkap (CRUD) dengan otorisasi berbasis role.

## Tasks

### T2.1: Backend Book CRUD Implementation
- [ ] Buat `bookController.js` dengan fungsi:
    - `getAllBooks`: Mendapatkan semua buku (Akses: Semua role).
    - `addBook`: Menambah buku baru (Akses: Admin, Librarian).
    - `updateBook`: Memperbarui data buku (Akses: Admin, Librarian).
    - `deleteBook`: Menghapus buku (Akses: Admin, Librarian).
- [ ] Buat `bookRoutes.js` dan proteksi route menggunakan `authMiddleware`.
- [ ] Daftarkan route `/api/v1/books` di `server/index.js`.

### T2.2: Frontend Book UI - List & Search
- [ ] Buat komponen `BookList.jsx` untuk menampilkan daftar buku dalam tabel.
- [ ] Tambahkan fitur pencarian sederhana di frontend.
- [ ] Tampilkan tombol "Add Book" hanya untuk Admin/Pustakawan.

### T2.4: Backend Member CRUD Implementation
- [ ] Buat `memberController.js` dengan fungsi:
    - `getAllMembers`: Mendapatkan semua user dengan role MEMBER (Akses: Admin, Librarian).
    - `addMember`: Menambah anggota baru (Akses: Admin).
    - `updateMember`: Memperbarui data anggota (Akses: Admin).
    - `deleteMember`: Menghapus anggota (Akses: Admin).
- [ ] Buat `memberRoutes.js` dan proteksi menggunakan `authorizeRoles`.

### T2.5: Frontend Member UI
- [ ] Buat komponen `MemberManager.jsx`.
- [ ] Admin: Bisa melihat tabel anggota dan melakukan CRUD.
- [ ] Librarian: Hanya bisa melihat tabel anggota (tombol aksi disembunyikan).
- [ ] Member: Akses ditolak (redirect atau pesan unauthorized).

## Verification Criteria
- [ ] Admin & Pustakawan bisa Create, Read, Update, Delete buku.
- [ ] Anggota bisa melihat daftar buku tapi tidak melihat tombol edit/delete.
- [ ] Request ke API tanpa token atau dengan role yang salah (misal Member mencoba POST) ditolak oleh server (403 Forbidden).
- [ ] Data buku tersimpan dan terupdate dengan benar di database MySQL.
