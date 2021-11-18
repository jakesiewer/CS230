-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2021 at 11:44 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressID` int(11) NOT NULL,
  `AddressLine1` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `AddressLine2` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Town` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `CityOrCounty` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `EIRCODE` varchar(8) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Address Details Table';

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`AddressID`, `AddressLine1`, `AddressLine2`, `Town`, `CityOrCounty`, `EIRCODE`) VALUES
(6, 'Carraleena Point', '', 'Rathmullan', 'Donegal', 'DDD DDDD'),
(7, 'undefined', ' ', 'undefined', 'undefined', 'undefine'),
(15, '301 Greenfields Square', '', 'Tullow', 'Carlow', 'R93 556Y'),
(20, 'Carraleena Point', '', 'Rathmullan', 'Donegal', 'F92 FR13'),
(21, 'Carraleena Point', 'Low', 'Rathmullan', 'Donegal', 'D00 DD00'),
(22, 'Carraleena Point', '', 'Rathmullan', 'Co. Donegal', 'QQQ QQQQ'),
(23, 'Doe Lane', '', 'Doe', 'Dublin', 'YYY YYYY'),
(25, 'Ballyheerin', '', 'Fanad', 'Donegal', 'F23 FR65'),
(30, 'The Lodge', 'Park Lane', 'Carlow', 'Carlow', 'R93 24G7'),
(32, '201 Beechwood Park', '', 'Lifford', 'Donegal', 'F92 2J23');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Customer Details Table';

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerID`, `title`, `firstname`, `lastname`, `mobile`, `email`) VALUES
(6, 'Mrs', 'David', 'Siewer', '1111111111', 'dsiewer@gmail.com'),
(7, 'Ms', 'undefined', 'undefined', '1233445543', 'x@gmail.com'),
(15, 'Mr', 'Lukas', 'Connor', '0821234567', 'lukas.connor@mygreenemail.com'),
(20, 'Mr', 'Jake', 'Siewer', '0833055727', 'siewerjake@gmail.com'),
(21, 'Mrs', 'Brigid', 'Siewer', '0862509539', 'bsiewer@gmail.com'),
(22, 'Mr', 'Juergen', 'Siewer', '0871231975', 'carraleena@gmail.com'),
(23, 'Mr', 'John', 'Doe', '9876543210', 'jdoe@gmail.com'),
(25, 'Mr', 'John', 'Carr', '5555555555', 'jcarr@mail.com'),
(30, 'Dr', 'Asia', 'O\'Donnell', '0841234567', 'asia.odonnell@myblueemail.com'),
(32, 'Mx', 'Michael', 'Carr', '1234543211', 'mcarr@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `customeraddress`
--

CREATE TABLE `customeraddress` (
  `CustomerID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Customer Address Table';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`),
  ADD UNIQUE KEY `AddressAK1` (`EIRCODE`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerID`),
  ADD UNIQUE KEY `CustomerIDAK2` (`email`),
  ADD UNIQUE KEY `CustomerIDAK3` (`mobile`);

--
-- Indexes for table `customeraddress`
--
ALTER TABLE `customeraddress`
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `AddressID` (`AddressID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `CustomerID` FOREIGN KEY (`CustomerID`) REFERENCES `address` (`AddressID`) ON DELETE CASCADE;

--
-- Constraints for table `customeraddress`
--
ALTER TABLE `customeraddress`
  ADD CONSTRAINT `AddressIDFK` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`) ON DELETE CASCADE,
  ADD CONSTRAINT `CustomerIDFK` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
