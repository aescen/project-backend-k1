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
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
--

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
) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;
-- --------------------------------------------------------
--

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
