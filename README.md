# Library Management System (LMS)

Sistem Informasi Manajemen Perpustakaan berbasis web yang dibangun menggunakan pendekatan **Agentic AI** dan framework **GSD Core**. Proyek ini dikembangkan untuk memenuhi tugas mata kuliah Pengembangan Sistem Informasi (PSI).

## 🚀 Fitur Utama

- **Autentikasi & Otorisasi**: Login berbasis role (Admin, Pustakawan, Anggota) menggunakan JWT.
- **Dashboard Statistik**: Visualisasi data total buku, anggota, dan transaksi aktif secara real-time.
- **Manajemen Buku**: CRUD data buku lengkap dengan pelacakan stok otomatis.
- **Manajemen Anggota**: Pengelolaan data anggota perpustakaan (khusus Admin).
- **Transaksi Peminjaman**: Alur peminjaman dan pengembalian buku yang terintegrasi dengan pembaruan stok.
- **Riwayat Personal**: Anggota dapat melihat daftar buku yang sedang dipinjam dan riwayat transaksi mereka.

## 🛠️ Teknologi

- **Frontend**: React.js, Vite, Lucide React (Icons), Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL.
- **Security**: JSON Web Token (JWT), Bcrypt.js (Password Hashing).
- **Workflow**: GSD Core (Discuss, Plan, Execute, Verify, Ship).

## 📂 Struktur Folder

```text
isd-project/
├── client/              # Frontend React (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # AuthContext & State management
│   │   ├── pages/       # Dashboard, Login, Manager pages
│   │   └── services/    # API calls configuration
├── server/              # Backend Node.js + Express
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & Role verification
│   ├── routes/          # API endpoints definition
│   └── index.js         # Entry point
├── docs/                # Dokumentasi (SQL Schema, etc)
└── .planning/           # Dokumen perencanaan GSD Core
```

## ⚙️ Cara Instalasi

### 1. Prasyarat
- Node.js (v16+)
- MySQL Server (XAMPP/Docker/WAMP)

### 2. Setup Database
1. Jalankan MySQL Server Anda.
2. Buat database baru bernama `lms_db`.
3. Import schema dari file `docs/sql/schema.sql`.

### 3. Konfigurasi Environment
Buat file `server/.env` (jika belum ada) dan sesuaikan:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=lms_db
JWT_SECRET=supersecretkeylms2024
PORT=5000
```

---

## 🏃‍♂️ Menjalankan Aplikasi

### Menjalankan Backend
```bash
cd server
npm install
node index.js
```
*Server akan berjalan di `http://localhost:5000`*

### Menjalankan Frontend
```bash
cd client
npm install
npm run dev
```
*Aplikasi web dapat diakses di `http://localhost:3000`*

---

## 🔑 Akun Demo

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` |
| **Pustakawan** | `pustakawan` | `pustakawan123` |
| **Anggota** | `anggota` | `anggota123` |

---

## 📷 Screenshots

![Login Page](https://via.placeholder.com/800x400?text=LMS+Login+Page)
*Halaman Login dengan validasi role.*

![Dashboard](https://via.placeholder.com/800x400?text=LMS+Dashboard+Statistics)
*Tampilan statistik real-time untuk Admin/Pustakawan.*

---

## 🛣️ API Endpoints Utama

### Auth
- `POST /api/v1/auth/login` - Login pengguna

### Books
- `GET /api/v1/books` - Daftar semua buku
- `POST /api/v1/books` - Tambah buku (Admin/Librarian)

### Transactions
- `POST /api/v1/transactions/borrow` - Proses peminjaman
- `PUT /api/v1/transactions/:id/return` - Proses pengembalian
- `GET /api/v1/transactions/history` - Lihat riwayat transaksi

---

**LMS - v1.0**
*Developed with ❤️ using Agentic AI workflows.*
