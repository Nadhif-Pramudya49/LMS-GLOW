-- DDL untuk Library Management System
CREATE DATABASE IF NOT EXISTS lms_db;
USE lms_db;

-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'LIBRARIAN', 'MEMBER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Books
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    librarian_id INT NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    status ENUM('BORROWED', 'RETURNED') DEFAULT 'BORROWED',
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (member_id) REFERENCES users(id),
    FOREIGN KEY (librarian_id) REFERENCES users(id)
);
