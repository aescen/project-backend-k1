-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
--
-- Host: localhost
-- Generation Time: Aug 12, 2022 at 05:37 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
    AUTOCOMMIT = 0;
START TRANSACTION;
SET
    time_zone = "+00:00";
SET
    @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
    UNIQUE_CHECKS = 0;
SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;
SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

/*!40101
SET
    @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT
*/;

/*!40101
SET
    @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS
*/;

/*!40101
 SET
    @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION
*/;

/*!40101
SET
    NAMES utf8mb4
*/;
--

-- Database: `c6wfbifMYx`
--
CREATE DATABASE IF NOT EXISTS `c6wfbifMYx` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE
    `c6wfbifMYx`;
-- --------------------------------------------------------
--

-- Table structure for table `roles`
--
CREATE TABLE IF NOT EXISTS `roles`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY `roles_role`(`role`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `roles`
--
INSERT INTO `roles` (
    `id`, `role`
)
VALUES
    (2, 'admin'),
    (3, 'kurir'),
    (1, 'super');

-- Table structure for table `users`
--
CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `email` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `password` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `no_hp` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `id_role` INT(10) UNSIGNED DEFAULT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY `users_email`(`email`),
    KEY `id_role`(`id_role`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
--

-- Dumping data for table `users`
--

INSERT INTO `users` (
    `id`, `nama`, `email`, `password`, `no_hp`, `id_role`
)
VALUES
    (1, 'AIA', 'aialogistics@aia.com', '$2b$10$TgXhDf0ELKdVA3jwk4RGrOEywMxrN948vlGcwFv9tCPAQgeOo7CVq', '123456789', 1),
    (2, 'Admin JKT', 'admin.jkt@aia.com', '$2b$10$UUoSPJV0LDd21gemvtTL3.Djz4Uf46RdIildxji41PV9.lTPfgedK', '123456789', 2),
    (3, 'Admin SBY', 'admin.sby@aia.com', '$2b$10$ih5GXaP1YWdBHqthlYzd5OxbsF9yydUfmNogylfvjgKrzQeKjJfyu', '123456789', 2),
    (4, 'Fiki', 'fiki@aia.com', '$2b$10$ss3VuPzKNkrdJtYaqFGbS.MdVDx35AWTIUN2O1w6fbmPk7SJtfCnG', '123456789', 3),
    (5, 'Arivin', 'arivin@aia.com', '$2b$10$OL6gSojRuFLWeBSeOwGaCevDrAbDBOQEllaBXseGEeUF19r6Tmz1a', '123456789', 3);

-- Table structure for table `kode_kota`
--
CREATE TABLE IF NOT EXISTS `kode_kota`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `nama` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY `kode_kota_kode`(`kode`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `kode_kota`
--
INSERT INTO `kode_kota` (
    `id`, `kode`, `nama`
)
VALUES
    (1, 'JKTA', 'JAKARTA'),
    (2, 'SUB', 'SURABAYA');

-- Table structure for table `gudang`
--
CREATE TABLE IF NOT EXISTS `gudang`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_admin` INT(10) UNSIGNED DEFAULT NULL,
    `nama` VARCHAR(64) COLLATE utf8mb4_bin NOT NULL,
    `alamat` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `id_kode_kota` INT(10) UNSIGNED DEFAULT NULL,
    PRIMARY KEY(`id`),
    KEY `id_admin`(`id_admin`),
    KEY `id_kode_kota`(`id_kode_kota`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `gudang`
--
INSERT INTO `gudang` (
    `id`, `id_admin`, `nama`, `alamat`, `id_kode_kota`
)
VALUES
    (1, 2, 'AIA JKTA', 'Jalan Jaka 1, Jakarta', 1),
    (2, 3, 'AIA SUB', 'Jalan Sura 5, Surabaya', 2);

-- Table structure for table `ongkir`
--
CREATE TABLE IF NOT EXISTS `ongkir`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `kota_pengirim` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `kota_penerima` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `ongkir` INT(10) UNSIGNED NOT NULL,
    `kode` INT(10) UNSIGNED DEFAULT NULL,
    PRIMARY KEY(`id`),
    KEY `kota_pengirim`(`kota_pengirim`),
    KEY `kota_penerima`(`kota_penerima`),
    KEY `kode`(`kode`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `ongkir`
--
INSERT INTO `ongkir` (
    `id`, `kota_pengirim`, `kota_penerima`, `ongkir`, `kode`
)
VALUES
    (1, 'JKTA', 'SUB', 100000, NULL),
    (2, 'SUB', 'JKTA', 125000, NULL);

-- Table structure for table `pesanan`
--
CREATE TABLE IF NOT EXISTS `pesanan`(
    `id` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `id_admin` INT(10) UNSIGNED NOT NULL,
    `resi` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `nama_barang` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `nama_pengirim` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `nama_penerima` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `alamat_pengirim` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `alamat_penerima` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `no_hp_pengirim` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `no_hp_penerima` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `berat` INT(10) UNSIGNED NOT NULL,
    `ongkir` INT(10) UNSIGNED NOT NULL,
    `status` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    UNIQUE KEY `pesanan_resi`(`resi`),
    KEY `id_admin`(`id_admin`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (
    `id`, `id_admin`, `resi`, `nama_barang`, `nama_pengirim`, `nama_penerima`, `alamat_pengirim`, `alamat_penerima`, `no_hp_pengirim`, `no_hp_penerima`, `berat`, `ongkir`, `status`, `created_at`, `updated_at`
)
VALUES
    ('123QWEASDZXC', 2, 'JKTA-SUB-123QWEASDZXC', 'Barang Ex', 'Sander', 'Rere', 'Jalan Karta 1, Jakarta', 'Jalan Baya 1, Surabaya', '123456789', '123456789', 10, 100000, 'Terkirim', '2022-08-09 12:00:00', '2022-08-09 12:00:00'),
    ('I100RKMK1LJ7', 3, 'SUB-JKTA-I100RKMK1LJ7', 'Mainan', 'Tiwi', 'Aisya', 'Jl. Segar, Surabaya', '9876543210', '9876543210', '9876543210', 20, 500000, 'Terkirim', '2022-08-11 09:35:02', '2022-08-11 09:47:11'),
    ('U4V70BFUWTL0 ', 2, 'SUB-JKTA-U4V70BFUWTL0 ', 'Sepeda', 'Susan', 'Alex', 'Jl. Kapibara, Surabaya', '9876543210', '9876543210', '9876543210', 35, 437500, 'Diproses', '2022-08-11 05:43:50', '2022-08-11 06:15:46');

-- Table structure for table `pengiriman`
--
CREATE TABLE IF NOT EXISTS `pengiriman`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_pesanan` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `id_gudang` INT(10) UNSIGNED NOT NULL,
    `keterangan` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `waktu` DATETIME NOT NULL,
    `id_kurir` INT(10) UNSIGNED DEFAULT NULL,
    PRIMARY KEY(`id`),
    KEY `id_pesanan`(`id_pesanan`),
    KEY `id_gudang`(`id_gudang`),
    KEY `id_kurir`(`id_kurir`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

-- Dumping data for table `pengiriman`
--
INSERT INTO `pengiriman` (
    `id`, `id_pesanan`, `id_gudang`, `keterangan`, `waktu`, `id_kurir`
)
VALUES
    (1, '123QWEASDZXC', 1, 'Paket telah diinput di Jakarta (manifested) [AIA JKTA - Admin JKT]', '2022-08-09 12:00:00', NULL),
    (2, '123QWEASDZXC', 1, 'Paket keluar dari Jakarta [AIA JKTA]', '2022-08-09 15:00:00', NULL),
    (3, '123QWEASDZXC', 2, 'Paket telah diterima di Surabaya [AIA SUB]', '2022-08-10 04:00:00', NULL),
    (4, '123QWEASDZXC', 2, 'Paket dibawa [AIA SUB - Arivin]', '2022-08-10 07:00:00', 5),
    (5, '123QWEASDZXC', 2, 'Paket diterima oleh Rere', '2022-08-10 09:00:00', 5),
    (6, 'U4V70BFUWTL0', 2, 'Paket telah diinput di Surabaya (manifested)  [AIA SUB]', '2022-08-11 06:16:16', NULL),
    (7, 'U4V70BFUWTL0 ', 2, 'Paket keluar Surabaya [AIA SUB]', '2022-08-11 06:18:57', NULL),
    (8, 'U4V70BFUWTL0', 2, 'Paket keluar dari Surabaya [AIA SUB]', '2022-08-11 06:20:54', NULL),
    (9, 'U4V70BFUWTL0', 1, 'Paket telah diterima di Jakarta [AIA JKTA]', '2022-08-11 06:22:52', NULL),
    (10, 'U4V70BFUWTL0', 1, 'Paket dibawa [AIA JKTA - Fiki]', '2022-08-11 06:26:08', 4),
    (11, 'U4V70BFUWTL0', 1, 'Paket diterima oleh Alex', '2022-08-11 06:26:17', 4),
    (12, 'I100RKMK1LJ7', 2, 'Paket telah diinput di Surabaya (manifested)  [AIA SUB]', '2022-08-11 09:38:23', NULL),
    (13, 'I100RKMK1LJ7', 2, 'Paket keluar dari Surabaya [AIA SUB]', '2022-08-11 09:40:41', NULL),
    (14, 'I100RKMK1LJ7', 1, 'Paket telah diterima di Jakarta [AIA JKTA]', '2022-08-11 09:43:00', NULL),
    (15, 'I100RKMK1LJ7', 1, 'Paket dibawa [AIA JKTA - Fiki]', '2022-08-11 09:45:57', 4),
    (16, 'I100RKMK1LJ7', 1, 'Paket diterima oleh Aisyah', '2022-08-11 09:47:11', 4);

-- Constraints for dumped tables
--
--

-- Constraints for table `users`
--
ALTER TABLE
    `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY(`id_role`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT
    ;
--

-- Constraints for table `gudang`
--
ALTER TABLE
    `gudang` ADD CONSTRAINT `gudang_ibfk_373` FOREIGN KEY(`id_admin`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `gudang_ibfk_374` FOREIGN KEY(`id_kode_kota`) REFERENCES `kode_kota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
--

-- Constraints for table `ongkir`
--
ALTER TABLE
    `ongkir` ADD CONSTRAINT `ongkir_ibfk_439` FOREIGN KEY(`kota_pengirim`) REFERENCES `kode_kota`(`kode`) ON UPDATE CASCADE,
    ADD CONSTRAINT `ongkir_ibfk_440` FOREIGN KEY(`kota_penerima`) REFERENCES `kode_kota`(`kode`) ON UPDATE CASCADE,
    ADD CONSTRAINT `ongkir_ibfk_441` FOREIGN KEY(`kode`) REFERENCES `kode_kota`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
--

-- Constraints for table `pesanan`
--
ALTER TABLE
    `pesanan` ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY(`id_admin`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
--

-- Constraints for table `pengiriman`
--
ALTER TABLE
    `pengiriman` ADD CONSTRAINT `pengiriman_ibfk_521` FOREIGN KEY(`id_pesanan`) REFERENCES `pesanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `pengiriman_ibfk_522` FOREIGN KEY(`id_gudang`) REFERENCES `gudang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `pengiriman_ibfk_523` FOREIGN KEY(`id_kurir`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

/*!40101
SET
    CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT
*/;

/*!40101
SET
    CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS
*/;

/*!40101
SET
    COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION
*/;
