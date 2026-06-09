# Phase 1 Implementation Plan: Foundation & Auth

## Goal
Inisialisasi project (server & client), setup koneksi database MySQL, dan implementasi sistem login berbasis JWT untuk 3 role.

## Tasks

### T1.1: Project Skeleton & Environment Setup
- [ ] Inisialisasi folder `server` dengan `npm init`.
- [ ] Install dependencies backend: `express`, `mysql2`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `cors`.
- [ ] Buat file `.env` untuk kredensial DB dan JWT secret.
- [ ] Setup struktur folder backend sesuai `DECISIONS.md`.

### T1.2: Database Initialization
- [ ] Jalankan DDL script untuk membuat tabel `users`, `books`, dan `transactions` (dari DECISIONS.md).
- [ ] Buat script seed sederhana untuk menambahkan 1 user per role (Admin, Pustakawan, Anggota) dengan password terenkripsi.
- [ ] Implementasi modul koneksi database di `server/config/db.js`.

### T1.3: Authentication API (Backend)
- [ ] Implementasi `authController.js` untuk fungsi login.
- [ ] Implementasi middleware `authMiddleware.js` untuk verifikasi JWT dan pengecekan role.
- [ ] Daftarkan route `/api/v1/auth/login` di `server/index.js`.

### T1.4: Client Initialization & Base Layout
- [ ] Inisialisasi React app di folder `client` (menggunakan Vite atau CRA).
- [ ] Install dependencies frontend: `axios`, `react-router-dom`, `lucide-react` (icon).
- [ ] Setup folder structure dan routing dasar (`/login`, `/dashboard`).

### T1.5: Login Implementation (Frontend)
- [ ] Buat halaman Login dengan form username & password.
- [ ] Integrasi dengan API login dan simpan token ke `localStorage`.
- [ ] Implementasi AuthContext untuk mengelola state login secara global.

## Verification Criteria
- [ ] Berhasil login sebagai Admin, Pustakawan, dan Anggota.
- [ ] Token JWT tersimpan di browser setelah login.
- [ ] Database terkoneksi dengan benar (log sukses saat server start).
- [ ] Password di database tersimpan dalam bentuk hash (bukan plain text).
