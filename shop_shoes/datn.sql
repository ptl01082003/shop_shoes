-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datn
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `addressCityCode` int DEFAULT NULL,
  `addressWardCode` int DEFAULT NULL,
  `addressDistrictCode` int DEFAULT NULL,
  `addressCityName` varchar(255) DEFAULT NULL,
  `addressWardName` varchar(255) DEFAULT NULL,
  `addressDistrictName` varchar(255) DEFAULT NULL,
  `addressEmail` varchar(255) DEFAULT NULL,
  `addressPhoneNumber` int DEFAULT NULL,
  `addresRecipientName` varchar(255) DEFAULT NULL,
  `addresDefault` varchar(255) DEFAULT NULL,
  `customersID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addressID`),
  KEY `customersID` (`customersID`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customersID`) REFERENCES `customers` (`customerId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brandID` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`brandID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Converse','2024-07-11 01:32:22','2024-07-11 01:33:49'),(2,'Adiddas','2024-07-11 01:33:06','2024-07-11 01:33:06'),(3,'Vans','2024-07-11 01:35:57','2024-07-11 01:35:57'),(4,'Nikes','2024-07-11 01:36:05','2024-07-11 01:36:05'),(5,'Puma','2024-07-11 01:36:12','2024-07-11 01:36:12');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cartItemsId` int NOT NULL AUTO_INCREMENT,
  `cartId` int DEFAULT NULL,
  `productsID` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartItemsId`),
  KEY `productsID` (`productsID`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`productsID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `cartQuantity` int DEFAULT NULL,
  `productDetailsID` int DEFAULT NULL,
  `customerID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartID`),
  KEY `productDetailsID` (`productDetailsID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `product_details` (`pDetailID`) ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `colorId` int NOT NULL AUTO_INCREMENT,
  `colorName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`colorId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Trắng','2024-07-10 13:57:50','2024-07-11 01:42:54'),(2,'Đen','2024-07-10 14:11:57','2024-07-11 01:43:00'),(3,'Đỏ','2024-07-11 01:18:51','2024-07-11 01:43:08'),(4,'Tím','2024-07-11 01:18:51','2024-07-11 01:43:44'),(5,'Hồng','2024-07-11 01:18:53','2024-07-11 01:44:15');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `customerName` varchar(255) DEFAULT NULL,
  `customerDateOfBirth` datetime DEFAULT NULL,
  `customerSex` tinyint(1) DEFAULT NULL,
  `customerPhoneNumber` int DEFAULT NULL,
  `customerEmail` varchar(255) DEFAULT NULL,
  `customerImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employeesId` int NOT NULL AUTO_INCREMENT,
  `employeesName` varchar(255) DEFAULT NULL,
  `employeesDateOfBirth` datetime DEFAULT NULL,
  `employeesSex` tinyint(1) DEFAULT NULL,
  `employeesPhoneNumber` int DEFAULT NULL,
  `employeesEmail` varchar(255) DEFAULT NULL,
  `employeesImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`employeesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites_list`
--

DROP TABLE IF EXISTS `favorites_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `customerID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `favorites_list_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE,
  CONSTRAINT `favorites_list_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites_list`
--

LOCK TABLES `favorites_list` WRITE;
/*!40000 ALTER TABLE `favorites_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `productID` (`productID`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialId` int NOT NULL AUTO_INCREMENT,
  `materialName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`materialId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Da','2024-07-11 01:46:53','2024-07-11 01:46:53'),(2,'Vai','2024-07-11 01:47:18','2024-07-11 01:47:18'),(3,'Sợi','2024-07-11 01:48:01','2024-07-11 01:48:01'),(4,'Perlite','2024-07-11 01:48:19','2024-07-11 01:48:19'),(5,'Cao Su','2024-07-11 01:48:33','2024-07-11 01:48:33');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origins`
--

DROP TABLE IF EXISTS `origins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origins` (
  `originId` int NOT NULL AUTO_INCREMENT,
  `originName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`originId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Việt Nam','2024-07-11 01:29:55','2024-07-11 01:29:55'),(2,'Nhật Bản','2024-07-11 01:30:06','2024-07-11 01:30:06'),(3,'Mỹ','2024-07-11 01:30:14','2024-07-11 01:30:14'),(4,'Đức','2024-07-11 01:30:56','2024-07-11 01:30:56'),(5,'Anh','2024-07-11 01:31:01','2024-07-11 01:31:01');
/*!40000 ALTER TABLE `origins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palettes`
--

DROP TABLE IF EXISTS `palettes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `palettes` (
  `colorCode` varchar(255) NOT NULL,
  `colorName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`colorCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palettes`
--

LOCK TABLES `palettes` WRITE;
/*!40000 ALTER TABLE `palettes` DISABLE KEYS */;
/*!40000 ALTER TABLE `palettes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `pDetailID` int NOT NULL AUTO_INCREMENT,
  `pDetailQuantity` int DEFAULT NULL,
  `pDetailStatus` tinyint(1) DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pDetailID`),
  KEY `productID` (`productID`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,NULL,1,120695,'2024-07-11 02:01:33','2024-07-11 02:01:33'),(2,NULL,1,140970,'2024-07-11 02:01:41','2024-07-11 02:01:41'),(3,NULL,1,165111,'2024-07-11 02:01:51','2024-07-11 02:01:51'),(4,NULL,1,169900,'2024-07-11 02:01:57','2024-07-11 02:01:57'),(5,NULL,1,169937,'2024-07-11 02:02:03','2024-07-11 02:02:03');
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_lines`
--

DROP TABLE IF EXISTS `product_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_lines` (
  `productLineID` int NOT NULL AUTO_INCREMENT,
  `productLineName` varchar(255) DEFAULT NULL,
  `brandID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productLineID`),
  KEY `brandID` (`brandID`),
  CONSTRAINT `product_lines_ibfk_1` FOREIGN KEY (`brandID`) REFERENCES `brands` (`brandID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_lines`
--

LOCK TABLES `product_lines` WRITE;
/*!40000 ALTER TABLE `product_lines` DISABLE KEYS */;
INSERT INTO `product_lines` VALUES (1,'Puma attack 2k',5,'2024-07-11 01:38:14','2024-07-11 01:38:49'),(2,'Adiddas Tonicross Euro',2,'2024-07-11 01:39:38','2024-07-11 01:39:38'),(3,'Converse Long ',1,'2024-07-11 01:40:55','2024-07-11 01:40:55'),(4,'Vans VIP',3,'2024-07-11 01:41:23','2024-07-11 01:41:23'),(5,'Nike Cristiano Ronaldo',4,'2024-07-11 01:42:04','2024-07-11 01:42:04');
/*!40000 ALTER TABLE `product_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promotion`
--

DROP TABLE IF EXISTS `product_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_promotion` (
  `productID` int NOT NULL,
  `promotionID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productID`,`promotionID`),
  KEY `promotionID` (`promotionID`),
  CONSTRAINT `product_promotion_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE,
  CONSTRAINT `product_promotion_ibfk_2` FOREIGN KEY (`promotionID`) REFERENCES `promotions` (`promotionId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_promotion`
--

LOCK TABLES `product_promotion` WRITE;
/*!40000 ALTER TABLE `product_promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productsID` int NOT NULL AUTO_INCREMENT,
  `productsName` varchar(255) DEFAULT NULL,
  `productImportPrice` decimal(16,2) DEFAULT NULL,
  `productPrice` decimal(16,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `display` tinyint(1) DEFAULT NULL,
  `productLineID` int DEFAULT NULL,
  `originID` int DEFAULT NULL,
  `styleID` int DEFAULT NULL,
  `materialID` int DEFAULT NULL,
  `colorID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productsID`),
  KEY `productLineID` (`productLineID`),
  KEY `originID` (`originID`),
  KEY `styleID` (`styleID`),
  KEY `materialID` (`materialID`),
  KEY `colorID` (`colorID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLineID`) REFERENCES `product_lines` (`productLineID`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`originID`) REFERENCES `origins` (`originId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`styleID`) REFERENCES `styles` (`styleID`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_5` FOREIGN KEY (`colorID`) REFERENCES `colors` (`colorId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169938 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (120695,'Giày Sancker Nike',50.00,75.00,1,1,3,2,3,2,4,'2024-07-11 01:50:35','2024-07-11 01:51:38'),(140970,'Giày thể thao Adidas',50.00,75.00,1,1,3,2,2,2,2,'2024-07-11 01:49:57','2024-07-11 01:49:57'),(165111,'Giày Ván nấm lùn',50.00,75.00,1,1,2,1,3,4,5,'2024-07-11 01:49:28','2024-07-11 01:58:27'),(169900,'Giày thể thao Adidas',50.00,75.00,1,1,1,1,1,1,1,'2024-07-11 01:48:52','2024-07-11 01:48:52'),(169937,'Giày thể thao Puma Neymar',50.00,75.00,1,1,NULL,NULL,NULL,NULL,1,'2024-07-10 14:01:22','2024-07-11 01:59:42');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotionId` int NOT NULL AUTO_INCREMENT,
  `promotionName` varchar(255) DEFAULT NULL,
  `promotionDiscount` double DEFAULT NULL,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`promotionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `totals` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `sizeID` int NOT NULL AUTO_INCREMENT,
  `sizeName` varchar(255) DEFAULT NULL,
  `sizeQuantity` int DEFAULT NULL,
  `productDetailID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeID`),
  KEY `productDetailID` (`productDetailID`),
  CONSTRAINT `sizes_ibfk_1` FOREIGN KEY (`productDetailID`) REFERENCES `product_details` (`pDetailID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'36',25,1,'2024-07-11 02:03:13','2024-07-11 02:03:13'),(2,'37',30,2,'2024-07-11 02:03:25','2024-07-11 02:03:25'),(3,'38',35,3,'2024-07-11 02:03:39','2024-07-11 02:03:39'),(4,'39',40,4,'2024-07-11 02:04:19','2024-07-11 02:04:19'),(5,'40',45,5,'2024-07-11 02:04:27','2024-07-11 02:04:27');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `styles` (
  `styleID` int NOT NULL AUTO_INCREMENT,
  `styleName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`styleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'Cổ cao','2024-07-11 01:25:10','2024-07-11 01:28:29'),(2,'Cổ thấp','2024-07-11 01:25:30','2024-07-11 01:28:21'),(3,'Độn đế','2024-07-11 01:28:44','2024-07-11 01:28:44');
/*!40000 ALTER TABLE `styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rolesId` varchar(255) DEFAULT '1',
  `fullName` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1669243149,'longpt','tuyenbeat@gmail.com','0358091695','$2b$10$7lSj6iiA6BjMIC9Y1.wP5ee1d2Gh6nJmjMT010OBra7hpzR440ziq','1','Long',NULL,'2024-07-10 13:39:58','2024-07-10 13:39:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher_customer`
--

DROP TABLE IF EXISTS `voucher_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher_customer` (
  `voucherId` int NOT NULL,
  `customerId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`voucherId`,`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher_customer`
--

LOCK TABLES `voucher_customer` WRITE;
/*!40000 ALTER TABLE `voucher_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucherId` int NOT NULL AUTO_INCREMENT,
  `voucherDescribe` varchar(255) DEFAULT NULL,
  `voucherDiscountType` varchar(255) DEFAULT NULL,
  `voucherDiscount` double DEFAULT NULL,
  `voucherValueOder` decimal(12,2) DEFAULT NULL,
  `voucherDiscountMax` decimal(12,2) DEFAULT NULL,
  `voucherStartDay` datetime DEFAULT NULL,
  `voucherEndDay` datetime DEFAULT NULL,
  `voucherQuantity` int DEFAULT NULL,
  `voucherStatusDelete` tinyint(1) DEFAULT NULL,
  `voucherFormPay` int DEFAULT NULL,
  `voucherStatus` int DEFAULT NULL,
  `voucherObjectuUse` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`voucherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-11  9:24:10
