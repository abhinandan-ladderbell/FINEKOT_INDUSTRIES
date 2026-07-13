-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2026 at 07:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finekot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `product` varchar(150) DEFAULT NULL,
  `requirement` text NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `name`, `email`, `phone`, `company_name`, `city`, `product`, `requirement`, `attachment_path`, `ip_address`, `created_at`) VALUES
(6, 'preet', 'p@gmail.com', '1234567890', 'preet', 'delhi', 'Solar Rooftop Structures', 'preet', 'd0349be1b2f5179b.png', '::1', '2026-07-10 07:48:20');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry_products`
--

CREATE TABLE `enquiry_products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiry_products`
--

INSERT INTO `enquiry_products` (`id`, `name`, `sort_order`, `created_at`) VALUES
(1, 'Solar Rooftop Structures', 1, '2026-07-10 10:53:02'),
(2, 'Ground Mounted Structures', 2, '2026-07-10 10:53:02'),
(3, 'Agricultural Pumping Structures', 3, '2026-07-10 10:53:02'),
(4, 'Nut-Bolted Fencing Systems', 4, '2026-07-10 10:53:02'),
(5, 'All Types of Fabrication', 5, '2026-07-10 10:53:02'),
(7, 'soloar ground', 0, '2026-07-10 11:18:55');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_groups`
--

CREATE TABLE `gallery_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_groups`
--

INSERT INTO `gallery_groups` (`id`, `name`, `sort_order`, `created_at`) VALUES
(2, 'Production Process', 2, '2026-07-09 12:08:24'),
(3, 'Machinery & Infrastructure', 3, '2026-07-09 12:08:24'),
(4, 'Completed Projects', 4, '2026-07-09 12:08:24'),
(7, 'soloar', 0, '2026-07-10 07:58:47');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items`
--

CREATE TABLE `gallery_items` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_items`
--

INSERT INTO `gallery_items` (`id`, `group_id`, `caption`, `image_path`, `sort_order`, `created_at`) VALUES
(5, 7, 'solor', 'ca1923c4a2ff9e8d.png', 0, '2026-07-10 07:59:01'),
(6, 2, 'test', 'f702f075ce477d77.png', 0, '2026-07-10 11:34:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiry_products`
--
ALTER TABLE `enquiry_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `gallery_groups`
--
ALTER TABLE `gallery_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gallery_group` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `enquiry_products`
--
ALTER TABLE `enquiry_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery_groups`
--
ALTER TABLE `gallery_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery_items`
--
ALTER TABLE `gallery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD CONSTRAINT `fk_gallery_group` FOREIGN KEY (`group_id`) REFERENCES `gallery_groups` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
