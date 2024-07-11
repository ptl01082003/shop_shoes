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
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customersID`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
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
INSERT INTO `brands` VALUES (1,'Adiddas','2024-07-11 09:37:51','2024-07-11 09:37:51'),(2,'Vans','2024-07-11 09:37:55','2024-07-11 09:37:55'),(3,'Convers','2024-07-11 09:38:00','2024-07-11 09:38:00'),(4,'Puma','2024-07-11 09:38:07','2024-07-11 09:38:07'),(5,'Thượng Đình','2024-07-11 09:38:15','2024-07-11 09:38:15');
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartID`),
  KEY `productDetailsID` (`productDetailsID`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `product_details` (`productDetailID`) ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Trắng','2024-07-11 09:37:12','2024-07-11 09:37:12'),(2,'Đen','2024-07-11 09:37:15','2024-07-11 09:37:15'),(3,'Đỏ','2024-07-11 09:37:18','2024-07-11 09:37:18'),(4,'Cam','2024-07-11 09:37:22','2024-07-11 09:37:22'),(5,'Xanh','2024-07-11 09:37:25','2024-07-11 09:37:25'),(6,'Tím','2024-07-11 09:37:28','2024-07-11 09:37:28');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  CONSTRAINT `favorites_list_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
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
INSERT INTO `materials` VALUES (1,'Da cá xấu','2024-07-11 09:35:17','2024-07-11 09:35:41'),(2,'Vải','2024-07-11 09:35:59','2024-07-11 09:35:59'),(3,'Nhựa','2024-07-11 09:36:03','2024-07-11 09:36:03'),(4,'Sợi','2024-07-11 09:36:07','2024-07-11 09:36:07'),(5,'Chỉ','2024-07-11 09:36:25','2024-07-11 09:36:25');
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
INSERT INTO `origins` VALUES (1,'Nga','2024-07-11 09:34:19','2024-07-11 09:34:19'),(2,'Việt Nam','2024-07-11 09:34:30','2024-07-11 09:34:30'),(3,'Trung Quốc ','2024-07-11 09:34:39','2024-07-11 09:34:39'),(4,'Ấn Độ','2024-07-11 09:34:48','2024-07-11 09:34:48'),(5,'Irans','2024-07-11 09:34:58','2024-07-11 09:34:58');
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
  `productDetailID` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productDetailID`),
  KEY `productID` (`productID`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,121859,'2024-07-11 09:44:32','2024-07-11 09:44:32'),(2,116971,'2024-07-11 09:44:57','2024-07-11 09:44:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_lines`
--

LOCK TABLES `product_lines` WRITE;
/*!40000 ALTER TABLE `product_lines` DISABLE KEYS */;
INSERT INTO `product_lines` VALUES (4,NULL,NULL,'2024-07-11 09:41:32','2024-07-11 09:41:32'),(5,NULL,NULL,'2024-07-11 09:41:44','2024-07-11 09:41:44'),(6,NULL,NULL,'2024-07-11 09:42:21','2024-07-11 09:42:21'),(7,NULL,NULL,'2024-07-11 09:42:33','2024-07-11 09:42:33'),(8,NULL,NULL,'2024-07-11 09:42:50','2024-07-11 09:42:50');
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
  `productsID` int NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (116365,'Giày Nike Air Max ',200.00,300.00,1,1,8,1,1,1,1,'2024-07-11 09:43:48','2024-07-11 09:43:48'),(116971,'Giày Air Jordan',200.00,300.00,1,1,8,1,1,1,1,'2024-07-11 09:43:56','2024-07-11 09:43:56'),(121859,'Giày Nike Running ',200.00,300.00,1,1,8,3,2,4,5,'2024-07-11 09:44:20','2024-07-11 09:44:20'),(165938,'Giày Nike Air Force',200.00,300.00,1,1,8,1,1,1,1,'2024-07-11 09:43:38','2024-07-11 09:43:38');
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
-- Table structure for table `size_product_details`
--

DROP TABLE IF EXISTS `size_product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_product_details` (
  `sizeProductDetailID` int NOT NULL AUTO_INCREMENT,
  `sizeID` int DEFAULT NULL,
  `productDetailID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeProductDetailID`),
  KEY `sizeID` (`sizeID`),
  KEY `productDetailID` (`productDetailID`),
  CONSTRAINT `size_product_details_ibfk_1` FOREIGN KEY (`sizeID`) REFERENCES `sizes` (`sizeID`) ON UPDATE CASCADE,
  CONSTRAINT `size_product_details_ibfk_2` FOREIGN KEY (`productDetailID`) REFERENCES `product_details` (`productDetailID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_product_details`
--

LOCK TABLES `size_product_details` WRITE;
/*!40000 ALTER TABLE `size_product_details` DISABLE KEYS */;
INSERT INTO `size_product_details` VALUES (1,1,1,100,'2024-07-11 09:45:05','2024-07-11 09:45:05'),(2,1,2,100,'2024-07-11 09:45:11','2024-07-11 09:45:11'),(3,2,1,100,'2024-07-11 09:45:15','2024-07-11 09:45:15');
/*!40000 ALTER TABLE `size_product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `sizeID` int NOT NULL AUTO_INCREMENT,
  `sizeName` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,36,'2024-07-11 09:33:34','2024-07-11 09:33:34'),(2,37,'2024-07-11 09:33:39','2024-07-11 09:33:39'),(3,38,'2024-07-11 09:33:42','2024-07-11 09:33:42'),(4,39,'2024-07-11 09:33:44','2024-07-11 09:33:44'),(5,40,'2024-07-11 09:33:47','2024-07-11 09:33:47'),(6,41,'2024-07-11 09:33:50','2024-07-11 09:33:50'),(7,42,'2024-07-11 09:33:52','2024-07-11 09:33:52'),(8,43,'2024-07-11 09:33:55','2024-07-11 09:33:55'),(9,44,'2024-07-11 09:33:57','2024-07-11 09:33:57'),(10,45,'2024-07-11 09:33:59','2024-07-11 09:33:59'),(11,46,'2024-07-11 09:34:01','2024-07-11 09:34:01');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'Cổ cao','2024-07-11 09:36:43','2024-07-11 09:36:43'),(2,'Cổ thấp','2024-07-11 09:36:46','2024-07-11 09:36:46'),(3,'Đế thấp','2024-07-11 09:36:49','2024-07-11 09:36:49'),(4,'Đế cao','2024-07-11 09:36:52','2024-07-11 09:36:52');
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
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2024-07-11 16:46:07
