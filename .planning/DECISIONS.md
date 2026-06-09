# Technical Decisions & Architecture

## 1. Entity Relationship Diagram (ERD) & Database Schema

### ERD Logic
- **users**: Menyimpan data Admin, Pustakawan, dan Anggota dengan kolom `role`.
- **books**: Menyimpan detail katalog buku dan stok saat ini.
- **transactions**: Menghubungkan user (anggota yang meminjam), user (pustakawan yang melayani), dan buku. Menyimpan tanggal pinjam/kembali dan status (BORROWED, RETURNED).

### MySQL Schema
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'LIBRARIAN', 'MEMBER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL, -- User with role MEMBER
    librarian_id INT NOT NULL, -- User with role LIBRARIAN/ADMIN who processed it
    borrow_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    status ENUM('BORROWED', 'RETURNED') DEFAULT 'BORROWED',
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (member_id) REFERENCES users(id),
    FOREIGN KEY (librarian_id) REFERENCES users(id)
);
```

## 2. API REST Structure
Base URL: `/api/v1`

| Endpoint | Method | Desc | Role |
| :--- | :--- | :--- | :--- |
| `/auth/login` | POST | Login & get JWT | All |
| `/books` | GET | List & Search books | All |
| `/books` | POST | Add new book | Admin, Librarian |
| `/books/:id` | PUT/DELETE | Update/Delete book | Admin, Librarian |
| `/members` | GET/POST | List/Add members | Admin |
| `/transactions` | POST | Create borrowing record | Librarian |
| `/transactions/:id/return` | PUT | Process return & update stock | Librarian |
| `/transactions/history` | GET | View personal history | Member |
| `/dashboard/stats` | GET | Get stats based on role | All |

## 3. Folder Structure
```text
lms-project/
├── server/ (Node.js + Express)
│   ├── config/ (DB connection)
│   ├── controllers/ (Logic)
│   ├── middleware/ (Auth/JWT)
│   ├── models/ (Queries)
│   ├── routes/ (API endpoints)
│   └── index.js
├── client/ (React.js)
│   ├── src/
│   │   ├── components/ (Reusable UI)
│   │   ├── pages/ (Login, Dashboard, CRUD)
│   │   ├── services/ (API calls)
│   │   ├── context/ (Auth state)
│   │   └── App.js
└── docs/ (ERD, API Specs)
```

## 4. Design Rationales
1. **Role-Based Access Control (RBAC)**: Menggunakan satu tabel `users` dengan kolom `role` mempermudah autentikasi terpusat dan manajemen sesi menggunakan JWT.
2. **Transaction Integrity**: Penggunaan MySQL (Relational) sangat penting untuk transaksi peminjaman. Relasi Foreign Key menjamin tidak ada data anggota atau buku yang "hilang" saat masih ada transaksi aktif.
3. **Decoupled Architecture**: Memisahkan `client` dan `server` memungkinkan pengembangan frontend dan backend dilakukan secara independen (paralel) oleh tim.
4. **JWT Authentication**: Mengurangi beban server karena stateless, cocok untuk aplikasi yang skalabel dan mudah diimplementasikan di React.
