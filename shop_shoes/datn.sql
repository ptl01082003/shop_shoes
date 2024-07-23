-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: localhost    Database: datn
-- ------------------------------------------------------
-- Server version	9.0.0

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
INSERT INTO `brands` VALUES (1,'Adidas','2024-07-23 12:51:40','2024-07-23 12:51:40'),(2,'Convers','2024-07-23 12:51:44','2024-07-23 12:51:44'),(3,'Puma','2024-07-23 12:51:47','2024-07-23 12:51:47'),(4,'Nike','2024-07-23 12:51:51','2024-07-23 12:51:51'),(5,'Vans','2024-07-23 12:52:01','2024-07-23 12:52:01');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cartItemsID` int NOT NULL AUTO_INCREMENT,
  `productsID` int DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartItemsID`),
  KEY `productsID` (`productsID`),
  KEY `cartId` (`cartId`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`productsID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `shopping_carts` (`cartId`) ON UPDATE CASCADE
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
  `imageID` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageID`),
  KEY `productID` (`productID`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (16,'public/Uploads/image-100919599558.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(17,'public/Uploads/image-102060034051.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(18,'public/Uploads/image-100893349606.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(19,'public/Uploads/image-101931096973.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(20,'public/Uploads/image-103104992378.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(21,'public/Uploads/image-102413366080.png',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialID` int NOT NULL AUTO_INCREMENT,
  `materialName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`materialID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Da cá sấu','2024-07-23 12:53:12','2024-07-23 12:53:12'),(2,'Vải','2024-07-23 12:53:37','2024-07-23 12:53:37'),(3,'Sợi','2024-07-23 12:53:40','2024-07-23 12:53:40'),(4,'Nhựa','2024-07-23 12:53:46','2024-07-23 12:53:46'),(5,'Da tổng hợp','2024-07-23 12:53:52','2024-07-23 12:53:52');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `orderDetailsID` int NOT NULL AUTO_INCREMENT,
  `totals` int DEFAULT NULL,
  `orderCode` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderDetailsID`),
  KEY `userId` (`userId`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `orderItemsID` int NOT NULL AUTO_INCREMENT,
  `quanity` int DEFAULT NULL,
  `productsID` int DEFAULT NULL,
  `orderDetailsID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderItemsID`),
  KEY `productsID` (`productsID`),
  KEY `orderDetailsID` (`orderDetailsID`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`productsID`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`orderDetailsID`) REFERENCES `order_details` (`orderDetailsID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origins`
--

DROP TABLE IF EXISTS `origins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origins` (
  `originID` int NOT NULL AUTO_INCREMENT,
  `originName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`originID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Nga','2024-07-23 12:54:56','2024-07-23 12:54:56'),(2,'Việt Nam','2024-07-23 12:55:01','2024-07-23 12:55:01'),(3,'Trung Quốc','2024-07-23 12:55:06','2024-07-23 12:55:06');
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
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_details` (
  `paymentDetailsId` int NOT NULL AUTO_INCREMENT,
  `orderDetailsId` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'IDLE',
  `amount` int DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`paymentDetailsId`),
  KEY `orderDetailsId` (`orderDetailsId`),
  CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`orderDetailsId`) REFERENCES `order_details` (`orderDetailsID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_details`
--

LOCK TABLES `payment_details` WRITE;
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;
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
  CONSTRAINT `product_promotion_ibfk_2` FOREIGN KEY (`promotionID`) REFERENCES `promotions` (`promotionID`) ON UPDATE CASCADE
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
-- Table structure for table `productdetails`
--

DROP TABLE IF EXISTS `productdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productdetails` (
  `productDetailid` int NOT NULL AUTO_INCREMENT,
  `productDetailname` varchar(255) DEFAULT NULL,
  `productDetaildescription` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productDetailid`),
  KEY `productId` (`productId`),
  CONSTRAINT `productdetails_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productsID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetails`
--

LOCK TABLES `productdetails` WRITE;
/*!40000 ALTER TABLE `productdetails` DISABLE KEYS */;
INSERT INTO `productdetails` VALUES (15,NULL,'<p>dxfdfdfd</p>',169478,'2024-07-23 17:40:54','2024-07-23 17:40:54');
/*!40000 ALTER TABLE `productdetails` ENABLE KEYS */;
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
  `productCode` varchar(6) DEFAULT NULL,
  `productImportPrice` decimal(16,2) DEFAULT NULL,
  `productPrice` decimal(16,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `display` tinyint(1) DEFAULT NULL,
  `originID` int DEFAULT NULL,
  `styleID` int DEFAULT NULL,
  `materialID` int DEFAULT NULL,
  `brandID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productsID`),
  KEY `originID` (`originID`),
  KEY `styleID` (`styleID`),
  KEY `materialID` (`materialID`),
  KEY `brandID` (`brandID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`originID`) REFERENCES `origins` (`originID`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`styleID`) REFERENCES `styles` (`styleID`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`brandID`) REFERENCES `brands` (`brandID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=179952 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (169478,'MLB - Giày sneakers unisex cổ thấp Chunky Wide Strike','3C4CFC',1200000.00,1200000.00,1,NULL,2,4,5,1,'2024-07-23 17:40:54','2024-07-23 17:40:54');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotionID` int NOT NULL AUTO_INCREMENT,
  `promotionName` varchar(255) DEFAULT NULL,
  `promotionDiscount` double DEFAULT NULL,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`promotionID`)
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
  `rolesId` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`rolesId`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER','2024-07-23 12:27:52','2024-07-23 12:27:52'),(2,'MEMBERSHIP','2024-07-23 12:27:52','2024-07-23 12:27:52'),(3,'ADMIN','2024-07-23 12:27:52','2024-07-23 12:27:52'),(19,'USER','2024-07-23 16:06:59','2024-07-23 16:06:59'),(20,'MEMBERSHIP','2024-07-23 16:06:59','2024-07-23 16:06:59'),(21,'ADMIN','2024-07-23 16:06:59','2024-07-23 16:06:59'),(22,'USER','2024-07-23 16:23:02','2024-07-23 16:23:02'),(23,'MEMBERSHIP','2024-07-23 16:23:02','2024-07-23 16:23:02'),(24,'ADMIN','2024-07-23 16:23:02','2024-07-23 16:23:02'),(25,'USER','2024-07-23 16:25:11','2024-07-23 16:25:11'),(26,'MEMBERSHIP','2024-07-23 16:25:11','2024-07-23 16:25:11'),(27,'ADMIN','2024-07-23 16:25:11','2024-07-23 16:25:11'),(28,'USER','2024-07-23 16:25:58','2024-07-23 16:25:58'),(29,'MEMBERSHIP','2024-07-23 16:25:58','2024-07-23 16:25:58'),(30,'ADMIN','2024-07-23 16:25:58','2024-07-23 16:25:58'),(31,'USER','2024-07-23 16:29:28','2024-07-23 16:29:28'),(32,'MEMBERSHIP','2024-07-23 16:29:28','2024-07-23 16:29:28'),(33,'ADMIN','2024-07-23 16:29:28','2024-07-23 16:29:28'),(34,'USER','2024-07-23 16:31:15','2024-07-23 16:31:15'),(35,'MEMBERSHIP','2024-07-23 16:31:15','2024-07-23 16:31:15'),(36,'ADMIN','2024-07-23 16:31:15','2024-07-23 16:31:15'),(37,'USER','2024-07-23 16:32:34','2024-07-23 16:32:34'),(38,'MEMBERSHIP','2024-07-23 16:32:34','2024-07-23 16:32:34'),(39,'ADMIN','2024-07-23 16:32:34','2024-07-23 16:32:34'),(40,'USER','2024-07-23 16:32:51','2024-07-23 16:32:51'),(41,'MEMBERSHIP','2024-07-23 16:32:51','2024-07-23 16:32:51'),(42,'ADMIN','2024-07-23 16:32:51','2024-07-23 16:32:51'),(43,'USER','2024-07-23 16:34:50','2024-07-23 16:34:50'),(44,'MEMBERSHIP','2024-07-23 16:34:50','2024-07-23 16:34:50'),(45,'ADMIN','2024-07-23 16:34:50','2024-07-23 16:34:50'),(46,'USER','2024-07-23 16:36:03','2024-07-23 16:36:03'),(47,'MEMBERSHIP','2024-07-23 16:36:04','2024-07-23 16:36:04'),(48,'ADMIN','2024-07-23 16:36:04','2024-07-23 16:36:04'),(49,'USER','2024-07-23 16:36:07','2024-07-23 16:36:07'),(50,'MEMBERSHIP','2024-07-23 16:36:07','2024-07-23 16:36:07'),(51,'ADMIN','2024-07-23 16:36:07','2024-07-23 16:36:07'),(52,'USER','2024-07-23 16:36:22','2024-07-23 16:36:22'),(53,'MEMBERSHIP','2024-07-23 16:36:22','2024-07-23 16:36:22'),(54,'ADMIN','2024-07-23 16:36:22','2024-07-23 16:36:22'),(55,'USER','2024-07-23 16:37:14','2024-07-23 16:37:14'),(56,'MEMBERSHIP','2024-07-23 16:37:14','2024-07-23 16:37:14'),(57,'ADMIN','2024-07-23 16:37:14','2024-07-23 16:37:14'),(58,'USER','2024-07-23 16:38:00','2024-07-23 16:38:00'),(59,'MEMBERSHIP','2024-07-23 16:38:00','2024-07-23 16:38:00'),(60,'ADMIN','2024-07-23 16:38:00','2024-07-23 16:38:00'),(61,'USER','2024-07-23 16:38:12','2024-07-23 16:38:12'),(62,'MEMBERSHIP','2024-07-23 16:38:12','2024-07-23 16:38:12'),(63,'ADMIN','2024-07-23 16:38:12','2024-07-23 16:38:12'),(64,'USER','2024-07-23 16:40:27','2024-07-23 16:40:27'),(65,'MEMBERSHIP','2024-07-23 16:40:27','2024-07-23 16:40:27'),(66,'ADMIN','2024-07-23 16:40:27','2024-07-23 16:40:27'),(67,'USER','2024-07-23 16:40:31','2024-07-23 16:40:31'),(68,'MEMBERSHIP','2024-07-23 16:40:31','2024-07-23 16:40:31'),(69,'ADMIN','2024-07-23 16:40:31','2024-07-23 16:40:31'),(70,'USER','2024-07-23 16:40:38','2024-07-23 16:40:38'),(71,'MEMBERSHIP','2024-07-23 16:40:38','2024-07-23 16:40:38'),(72,'ADMIN','2024-07-23 16:40:38','2024-07-23 16:40:38'),(73,'USER','2024-07-23 16:41:10','2024-07-23 16:41:10'),(74,'MEMBERSHIP','2024-07-23 16:41:10','2024-07-23 16:41:10'),(75,'ADMIN','2024-07-23 16:41:10','2024-07-23 16:41:10'),(76,'USER','2024-07-23 17:14:59','2024-07-23 17:14:59'),(77,'MEMBERSHIP','2024-07-23 17:14:59','2024-07-23 17:14:59'),(78,'ADMIN','2024-07-23 17:14:59','2024-07-23 17:14:59'),(79,'USER','2024-07-23 17:15:18','2024-07-23 17:15:18'),(80,'MEMBERSHIP','2024-07-23 17:15:18','2024-07-23 17:15:18'),(81,'ADMIN','2024-07-23 17:15:18','2024-07-23 17:15:18'),(82,'USER','2024-07-23 17:15:51','2024-07-23 17:15:51'),(83,'MEMBERSHIP','2024-07-23 17:15:51','2024-07-23 17:15:51'),(84,'ADMIN','2024-07-23 17:15:51','2024-07-23 17:15:51'),(85,'USER','2024-07-23 17:20:01','2024-07-23 17:20:01'),(86,'MEMBERSHIP','2024-07-23 17:20:01','2024-07-23 17:20:01'),(87,'ADMIN','2024-07-23 17:20:01','2024-07-23 17:20:01'),(88,'USER','2024-07-23 17:31:24','2024-07-23 17:31:24'),(89,'MEMBERSHIP','2024-07-23 17:31:24','2024-07-23 17:31:24'),(90,'ADMIN','2024-07-23 17:31:24','2024-07-23 17:31:24'),(91,'USER','2024-07-23 17:31:51','2024-07-23 17:31:51'),(92,'MEMBERSHIP','2024-07-23 17:31:51','2024-07-23 17:31:51'),(93,'ADMIN','2024-07-23 17:31:51','2024-07-23 17:31:51'),(94,'USER','2024-07-23 17:32:07','2024-07-23 17:32:07'),(95,'MEMBERSHIP','2024-07-23 17:32:07','2024-07-23 17:32:07'),(96,'ADMIN','2024-07-23 17:32:07','2024-07-23 17:32:07'),(97,'USER','2024-07-23 17:32:40','2024-07-23 17:32:40'),(98,'MEMBERSHIP','2024-07-23 17:32:40','2024-07-23 17:32:40'),(99,'ADMIN','2024-07-23 17:32:40','2024-07-23 17:32:40'),(100,'USER','2024-07-23 17:34:45','2024-07-23 17:34:45'),(101,'MEMBERSHIP','2024-07-23 17:34:45','2024-07-23 17:34:45'),(102,'ADMIN','2024-07-23 17:34:45','2024-07-23 17:34:45'),(103,'USER','2024-07-23 17:34:50','2024-07-23 17:34:50'),(104,'MEMBERSHIP','2024-07-23 17:34:50','2024-07-23 17:34:50'),(105,'ADMIN','2024-07-23 17:34:50','2024-07-23 17:34:50'),(106,'USER','2024-07-23 17:35:22','2024-07-23 17:35:22'),(107,'MEMBERSHIP','2024-07-23 17:35:22','2024-07-23 17:35:22'),(108,'ADMIN','2024-07-23 17:35:22','2024-07-23 17:35:22'),(109,'USER','2024-07-23 17:37:51','2024-07-23 17:37:51'),(110,'MEMBERSHIP','2024-07-23 17:37:51','2024-07-23 17:37:51'),(111,'ADMIN','2024-07-23 17:37:51','2024-07-23 17:37:51'),(112,'USER','2024-07-23 17:38:01','2024-07-23 17:38:01'),(113,'MEMBERSHIP','2024-07-23 17:38:01','2024-07-23 17:38:01'),(114,'ADMIN','2024-07-23 17:38:01','2024-07-23 17:38:01'),(115,'USER','2024-07-23 17:38:39','2024-07-23 17:38:39'),(116,'MEMBERSHIP','2024-07-23 17:38:39','2024-07-23 17:38:39'),(117,'ADMIN','2024-07-23 17:38:39','2024-07-23 17:38:39'),(118,'USER','2024-07-23 17:38:42','2024-07-23 17:38:42'),(119,'MEMBERSHIP','2024-07-23 17:38:42','2024-07-23 17:38:42'),(120,'ADMIN','2024-07-23 17:38:42','2024-07-23 17:38:42'),(121,'USER','2024-07-23 17:39:54','2024-07-23 17:39:54'),(122,'MEMBERSHIP','2024-07-23 17:39:54','2024-07-23 17:39:54'),(123,'ADMIN','2024-07-23 17:39:54','2024-07-23 17:39:54');
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
  `totals` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `userId` (`userId`),
  CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
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
  `id` int NOT NULL AUTO_INCREMENT,
  `sizeId` int DEFAULT NULL,
  `productDetailId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sizeId` (`sizeId`),
  KEY `productDetailId` (`productDetailId`),
  CONSTRAINT `size_product_details_ibfk_1` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`sizeID`) ON UPDATE CASCADE,
  CONSTRAINT `size_product_details_ibfk_2` FOREIGN KEY (`productDetailId`) REFERENCES `productdetails` (`productDetailid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_product_details`
--

LOCK TABLES `size_product_details` WRITE;
/*!40000 ALTER TABLE `size_product_details` DISABLE KEYS */;
INSERT INTO `size_product_details` VALUES (4,NULL,15,12,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(5,NULL,15,12,'2024-07-23 17:40:54','2024-07-23 17:40:54'),(6,NULL,15,12,'2024-07-23 17:40:54','2024-07-23 17:40:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,36,'2024-07-23 12:52:19','2024-07-23 12:52:19'),(2,37,'2024-07-23 12:52:23','2024-07-23 12:52:23'),(3,38,'2024-07-23 12:52:27','2024-07-23 12:52:27'),(4,39,'2024-07-23 12:52:32','2024-07-23 12:52:32'),(5,40,'2024-07-23 12:52:36','2024-07-23 12:52:36');
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
INSERT INTO `styles` VALUES (1,'Cổ cao','2024-07-23 12:54:00','2024-07-23 12:54:00'),(2,'Cổ thấp','2024-07-23 12:54:02','2024-07-23 12:54:02'),(3,'Đế cao ','2024-07-23 12:54:06','2024-07-23 12:54:06'),(4,'Đế thấp','2024-07-23 12:54:06','2024-07-23 12:54:06');
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
  `birth` datetime DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `rolesId` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `rolesId` (`rolesId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`rolesId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1037083420,'admin',NULL,NULL,'$2b$10$6sZanuPXHRewR87Dmco7peSMYCe3DQ4//fTeu/lQ28rU9aRTYmF16',NULL,NULL,3,'2024-07-23 16:29:28','2024-07-23 16:29:28'),(1042538462,'admin',NULL,NULL,'$2b$10$zgAchlRlRbLTxbUeFOfNu.JorqDBouR5mh.oSjrYHClXJB9agtcsy',NULL,NULL,3,'2024-07-23 16:40:38','2024-07-23 16:40:38'),(1054460258,'admin',NULL,NULL,'$2b$10$X/3Mtridqvl8uwnKDDJb3.b8.fOWZdc5VrY8XA0Oo4IyyCK4yxuT6',NULL,NULL,3,'2024-07-23 17:37:51','2024-07-23 17:37:51'),(1055355369,'admin',NULL,NULL,'$2b$10$sLVj0GT7X1KUviHfFBiQq.F3cniEtiKBCxddbEnIYY1Kp57OEbstW',NULL,NULL,3,'2024-07-23 17:32:40','2024-07-23 17:32:40'),(1070102674,'admin',NULL,NULL,'$2b$10$z2mdijUAMobTYwdXjURuwu14SXYl89MnAlyT.sh.s5igeKZ6amRKC',NULL,NULL,3,'2024-07-23 16:40:31','2024-07-23 16:40:31'),(1087052350,'admin',NULL,NULL,'$2b$10$xbisIPzQP7OfBVI5eoQ1DOi59l9tYajb3wv6thSetm9AcILknDH3W',NULL,NULL,3,'2024-07-23 17:38:01','2024-07-23 17:38:01'),(1102497741,'admin',NULL,NULL,'$2b$10$0D2UXG6iX5jt1BTjJnih9OiRe75NLz3qYc.WAdzUfgDuCAhobf6GG',NULL,NULL,3,'2024-07-23 12:50:44','2024-07-23 12:50:44'),(1115287132,'admin',NULL,NULL,'$2b$10$VGGxtn5dXpZ.6TKTTYWSxOaBisnA9hvEA00LplL4aIDMAUTrTfBRy',NULL,NULL,3,'2024-07-23 16:06:59','2024-07-23 16:06:59'),(1128715233,'admin',NULL,NULL,'$2b$10$E6B/t9Tf6taiUoTmJNWx7.Is.vX9ELCat8OhbglBGrKfLScpc.vWe',NULL,NULL,3,'2024-07-23 17:38:42','2024-07-23 17:38:42'),(1155702947,'admin',NULL,NULL,'$2b$10$Lr.QMci2eVtumuGQBm9EQuTTems/cLt7yCPtPH4WMU0RZpRL0jaFW',NULL,NULL,3,'2024-07-23 17:35:23','2024-07-23 17:35:23'),(1162216484,'admin',NULL,NULL,'$2b$10$bRfuVY6b8v.KgHEyS43.Se.MK.K.8VZnRtnWhiTqP5KeSN5nYojGC',NULL,NULL,3,'2024-07-23 17:34:50','2024-07-23 17:34:50'),(1164001148,'admin',NULL,NULL,'$2b$10$997DuXYZR/TI5dtTUNaVg.ivx2dHSdPs5o65Q2hIM8u2AA1AlQkgS',NULL,NULL,3,'2024-07-23 16:36:07','2024-07-23 16:36:07'),(1252765199,'admin',NULL,NULL,'$2b$10$D6BeivEUNb0NC.c//amse.Bxhmp2RtEueyl493DzZkQ.HA9GOlBwa',NULL,NULL,3,'2024-07-23 17:32:07','2024-07-23 17:32:07'),(1310768606,'admin',NULL,NULL,'$2b$10$B0GFkYR1ppHZZFJxnwXxYeweWLfu.bePHqpdvmnuqxDoQ/FCOa7g.',NULL,NULL,3,'2024-07-23 17:14:59','2024-07-23 17:14:59'),(1346449271,'admin',NULL,NULL,'$2b$10$GqAGnQjykh8RgLzkN0NDweqGeobuXcoTgCsghZMqWHEyZdhigUpdS',NULL,NULL,3,'2024-07-23 16:31:15','2024-07-23 16:31:15'),(1348668573,'admin',NULL,NULL,'$2b$10$S1dQar71I9BZMrr/PJgeQ./PC9tBq00y.T9G/NhTTBb/Ypw2piO0G',NULL,NULL,3,'2024-07-23 16:34:50','2024-07-23 16:34:50'),(1396959715,'admin',NULL,NULL,'$2b$10$tGSLFixlia5QhA2/zEucz.6nanhPSqRnJN.gStZbwoyCMF8oabJFC',NULL,NULL,3,'2024-07-23 16:25:58','2024-07-23 16:25:58'),(1402262632,'admin',NULL,NULL,'$2b$10$KQ6FQUYSd7bI2WJbh8njyODBTfWVRWrxHL9lXY/eWmFpH1m5t0CEe',NULL,NULL,3,'2024-07-23 17:15:51','2024-07-23 17:15:51'),(1410485633,'admin',NULL,NULL,'$2b$10$cjgiLYQgEkZ9ob6xB2tsGOqmUgQyMXFvkDKppYM5X8nEHn9W76OO6',NULL,NULL,3,'2024-07-23 17:34:45','2024-07-23 17:34:45'),(1414441580,'admin',NULL,NULL,'$2b$10$XkoW31XWPB8UcLn9Pt3cleLL6Ie575vDy42yFEeDGfuOe5pWZBcLK',NULL,NULL,3,'2024-07-23 16:38:12','2024-07-23 16:38:12'),(1461799066,'admin',NULL,NULL,'$2b$10$tT0UYcP.BNvgwXpgEGU/beDMxeO.tPjvNxFxfQN5PWASXwJFFfBea',NULL,NULL,3,'2024-07-23 16:25:11','2024-07-23 16:25:11'),(1480390931,'admin',NULL,NULL,'$2b$10$3k7EBT3K/LZGP9NTqM1XeeMRc0z7XgIj7ngGIwDRvwl59mZwD6Vby',NULL,NULL,3,'2024-07-23 17:20:01','2024-07-23 17:20:01'),(1634520991,'admin',NULL,NULL,'$2b$10$LJKNhtHNsO.bqSrzkLXHO.glrCUd9Yz7WLDe/k.OYue40F5kAgr.K',NULL,NULL,3,'2024-07-23 17:15:18','2024-07-23 17:15:18'),(1635444164,'admin',NULL,NULL,'$2b$10$VZnvB/vbyeyVZrd4WfQDkeVQLcX2OrPWxELfcEdVnSv4/hcd4rR7.',NULL,NULL,3,'2024-07-23 16:41:10','2024-07-23 16:41:10'),(1656312628,'admin',NULL,NULL,'$2b$10$BzJegPfZVqtqe13ak8Yhw.fgm2C2ijMzKnVrisNndYRiFRSaj1MKq',NULL,NULL,3,'2024-07-23 16:32:34','2024-07-23 16:32:34'),(1659770326,'admin',NULL,NULL,'$2b$10$adQM08PVii/.QQY1eV0x6uhdniOk95M1Fo4fhF/Cn.9fNunExdCAS',NULL,NULL,3,'2024-07-23 16:32:51','2024-07-23 16:32:51'),(1666190654,'admin',NULL,NULL,'$2b$10$18DrbwGYobEWiiUyrE/BO.6VF65BzgOjz99gKHBDj8yVyyuH7mlDu',NULL,NULL,3,'2024-07-23 17:31:51','2024-07-23 17:31:51'),(1714929279,'admin',NULL,NULL,'$2b$10$kNOkZ8Fj9on2DJsMXTXH0.qhSDghxBaCbEiG/Y0CxPXNfTjpVn2dW',NULL,NULL,3,'2024-07-23 16:37:14','2024-07-23 16:37:14'),(1728376774,'admin',NULL,NULL,'$2b$10$pPYSZkTAHd0hGefesa8FXuJjk69ZeBWAE.Awt6A6nE1xtlFbDoG2G',NULL,NULL,3,'2024-07-23 17:39:54','2024-07-23 17:39:54'),(1823880977,'admin',NULL,NULL,'$2b$10$iNZT4n7DlgR1JqD1SV/CIuL2NLTxjZa5um60mYM.RXlzF4K2Rpb5K',NULL,NULL,3,'2024-07-23 17:38:39','2024-07-23 17:38:39'),(1843315348,'admin',NULL,NULL,'$2b$10$kAvCxWRSIapZJkdjUCZ1KeINPUYzAC97WTQ.GF/6SSBfjqiyASrqS',NULL,NULL,3,'2024-07-23 16:36:23','2024-07-23 16:36:23'),(1871354481,'admin',NULL,NULL,'$2b$10$2TRU6eR29d3p1xkIou3Xee7mm8a8sgIr.8QaXlAJD2DhSVOW1uMY.',NULL,NULL,3,'2024-07-23 17:31:24','2024-07-23 17:31:24'),(1883738823,'admin',NULL,NULL,'$2b$10$PAdzNHtMBHKLb.CG02tvIucpfSVRCvCDoDib/x3dHloR4esXX2T1a',NULL,NULL,3,'2024-07-23 16:23:02','2024-07-23 16:23:02'),(1933596621,'admin',NULL,NULL,'$2b$10$Bdhq5ne.AFjbz/m0rAyuyOQ9aD020WAoxtAojDzn4m.yO3PS/SsVC',NULL,NULL,3,'2024-07-23 16:36:04','2024-07-23 16:36:04'),(1950142331,'admin',NULL,NULL,'$2b$10$xMne8BQWJiEDtu2JI0105OM6FQf7rBZcx638ivkkR2wqsFRfXonAq',NULL,NULL,3,'2024-07-23 16:38:01','2024-07-23 16:38:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucherID` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`voucherID`)
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

-- Dump completed on 2024-07-23 17:47:35
