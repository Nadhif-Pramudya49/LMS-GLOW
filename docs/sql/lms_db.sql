-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jun 2026 pada 13.38
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `isbn`, `category`, `stock`, `created_at`) VALUES
(1, 'Proklamasi', 'Soekarno', '1945', 'Negara', 50, '2026-06-09 15:38:12'),
(2, 'Laskar Pelangi', 'Andrea Hirata', '9789793062792', 'Novel', 10, '2026-06-13 11:21:26'),
(3, 'Bumi Manusia', 'Pramoedya Ananta Toer', '9789799731234', 'Novel', 7, '2026-06-13 11:21:26'),
(4, 'Negeri 5 Menara', 'Ahmad Fuadi', '9789792212952', 'Novel', 7, '2026-06-13 11:21:26'),
(5, 'Atomic Habits', 'James Clear', '9780735211292', 'Self Improvement', 12, '2026-06-13 11:21:26'),
(6, 'Rich Dad Poor Dad', 'Robert Kiyosaki', '9781612680194', 'Finance', 9, '2026-06-13 11:21:26'),
(7, 'The Psychology of Money', 'Morgan Housel', '9780857197689', 'Finance', 11, '2026-06-13 11:21:26'),
(8, 'Clean Code', 'Robert C. Martin', '9780132350884', 'Programming', 6, '2026-06-13 11:21:26'),
(9, 'The Pragmatic Programmer', 'Andrew Hunt', '9780135957059', 'Programming', 5, '2026-06-13 11:21:26'),
(10, 'Introduction to Algorithms', 'Thomas H. Cormen', '9780262046305', 'Programming', 4, '2026-06-13 11:21:26'),
(11, 'Deep Work', 'Cal Newport', '9781455586691', 'Productivity', 10, '2026-06-13 11:21:26'),
(12, 'Sapiens', 'Yuval Noah Harari', '9780062316097', 'History', 8, '2026-06-13 11:21:26'),
(13, 'Homo Deus', 'Yuval Noah Harari', '9780062464316', 'History', 7, '2026-06-13 11:21:26'),
(14, 'Filosofi Teras', 'Henry Manampiring', '9786020633176', 'Philosophy', 9, '2026-06-13 11:21:26'),
(15, 'Think and Grow Rich', 'Napoleon Hill', '9781585424337', 'Motivation', 9, '2026-06-13 11:21:26'),
(16, 'Ikigai', 'Hector Garcia', '9780143130727', 'Self Improvement', 8, '2026-06-13 11:21:26'),
(17, 'Cantik Itu Luka', 'Eka Kurniawan', '9786022914631', 'Novel', 5, '2026-06-13 11:21:26'),
(18, 'Laut Bercerita', 'Leila S. Chudori', '9786024246945', 'Novel', 7, '2026-06-13 11:21:26'),
(19, 'Madilog', 'Tan Malaka', '9789791684408', 'Philosophy', 5, '2026-06-13 11:21:26'),
(20, 'Sejarah Dunia yang Disembunyikan', 'Jonathan Black', '9789792285529', 'History', 4, '2026-06-13 11:21:26'),
(21, 'Pemrograman Java', 'Abdul Kadir', '9789792936759', 'Programming', 10, '2026-06-13 11:21:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `librarian_id` int(11) NOT NULL,
  `borrow_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('BORROWED','RETURNED') DEFAULT 'BORROWED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `book_id`, `member_id`, `librarian_id`, `borrow_date`, `return_date`, `status`) VALUES
(1, 1, 3, 2, '2026-06-09', '2026-06-09', 'RETURNED'),
(2, 1, 3, 2, '2026-06-09', '2026-06-13', 'RETURNED'),
(3, 14, 32, 1, '2026-06-26', NULL, 'BORROWED'),
(4, 17, 27, 1, '2026-06-26', NULL, 'BORROWED'),
(5, 3, 29, 1, '2026-06-26', NULL, 'BORROWED');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` enum('ADMIN','LIBRARIAN','MEMBER') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `role`, `created_at`) VALUES
(1, 'admin', '$2a$10$oL5oc3PsmXXM9GKngwYTDOQxI.ONlvCTA9fjq3R7t1qI7t5LbdeR2', 'System Admin', 'ADMIN', '2026-06-09 12:20:06'),
(2, 'pustakawan', '$2a$10$MdOZ.oElIpFt.Rg0botQAO9pPzGxhqQKGrPPMFa5XZY8l/hTzptrK', 'Andi Pustakawan', 'LIBRARIAN', '2026-06-09 12:20:06'),
(3, 'anggota', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPoa0CWB.f5Ee', 'Budi Anggota', 'MEMBER', '2026-06-09 12:20:06'),
(13, 'ahmad', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Ahmad Fauzan', 'MEMBER', '2026-06-13 11:24:35'),
(14, 'siti', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Siti Aisyah', 'MEMBER', '2026-06-13 11:24:35'),
(15, 'budi', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Budi Santoso', 'MEMBER', '2026-06-13 11:24:35'),
(16, 'dewi', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Dewi Lestari', 'MEMBER', '2026-06-13 11:24:35'),
(17, 'rizky', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Rizky Pratama', 'MEMBER', '2026-06-13 11:24:35'),
(18, 'nabila', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Nabila Putri', 'MEMBER', '2026-06-13 11:24:35'),
(19, 'fajar', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Fajar Nugroho', 'MEMBER', '2026-06-13 11:24:35'),
(20, 'aulia', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Aulia Rahman', 'MEMBER', '2026-06-13 11:24:35'),
(21, 'yoga', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Yoga Saputra', 'MEMBER', '2026-06-13 11:24:35'),
(22, 'putri', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Putri Maharani', 'MEMBER', '2026-06-13 11:24:35'),
(23, 'andi', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Andi Wijaya', 'MEMBER', '2026-06-13 11:24:35'),
(24, 'rina', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Rina Kartika', 'MEMBER', '2026-06-13 11:24:35'),
(25, 'dimas', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Dimas Prakoso', 'MEMBER', '2026-06-13 11:24:35'),
(26, 'nurul', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Nurul Hidayah', 'MEMBER', '2026-06-13 11:24:35'),
(27, 'ilham', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Ilham Maulana', 'MEMBER', '2026-06-13 11:24:35'),
(28, 'tasya', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Tasya Amelia', 'MEMBER', '2026-06-13 11:24:35'),
(29, 'aldi', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Aldi Firmansyah', 'MEMBER', '2026-06-13 11:24:35'),
(30, 'maya', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Maya Sari', 'MEMBER', '2026-06-13 11:24:35'),
(31, 'rafi', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Rafi Akbar', 'MEMBER', '2026-06-13 11:24:35'),
(32, 'najwa', '$2a$10$ocJyQ2aVc.mR.06idm8anO9LZXdbX1.xiaLBK/vOSPobnVBrBLUjK', 'Najwa Khairun Nisa', 'MEMBER', '2026-06-13 11:24:35');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `librarian_id` (`librarian_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`librarian_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
