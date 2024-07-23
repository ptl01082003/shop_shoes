-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datn
-- ------------------------------------------------------
-- Server version	8.0.38

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'public/Uploads/image-100624076076.jpeg',178456,'2024-07-23 12:56:06','2024-07-23 12:56:06'),(2,'public/Uploads/image-102181999438.png',149129,'2024-07-23 12:57:19','2024-07-23 12:57:19'),(3,'public/Uploads/image-100916260923.png',149129,'2024-07-23 12:57:19','2024-07-23 12:57:19'),(4,'public/Uploads/image-102181999438.png',123365,'2024-07-23 12:57:49','2024-07-23 12:57:49'),(5,'public/Uploads/image-100916260923.png',123365,'2024-07-23 12:57:49','2024-07-23 12:57:49'),(6,'public/Uploads/image-100662132055.png',179951,'2024-07-23 12:59:30','2024-07-23 12:59:30'),(7,'public/Uploads/image-103110020693.png',175125,'2024-07-23 14:40:30','2024-07-23 14:40:30'),(8,'public/Uploads/image-100485766113.png',154812,'2024-07-23 15:23:21','2024-07-23 15:23:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetails`
--

LOCK TABLES `productdetails` WRITE;
/*!40000 ALTER TABLE `productdetails` DISABLE KEYS */;
INSERT INTO `productdetails` VALUES (1,NULL,'<p>wowwwww<img src=\"http://localhost:5500/public/Uploads/image-102530124734.jpeg\"></p>',178456,'2024-07-23 12:56:06','2024-07-23 12:56:06'),(3,NULL,'<p>đẹp <img src=\"http://localhost:5500/public/Uploads/image-103255716735.png\"></p>',149129,'2024-07-23 12:57:19','2024-07-23 12:57:19'),(4,NULL,'<p>đẹp <img src=\"http://localhost:5500/public/Uploads/image-103255716735.png\"></p>',123365,'2024-07-23 12:57:49','2024-07-23 12:57:49'),(5,NULL,'<blockquote><p>ádfasdf<img src=\"http://localhost:5500/public/Uploads/image-104054080166.png\"></p></blockquote>',179951,'2024-07-23 12:59:30','2024-07-23 12:59:30'),(13,NULL,'<figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-104199305586.png\"></figure>',154812,'2024-07-23 15:23:21','2024-07-23 15:23:21');
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
INSERT INTO `products` VALUES (111983,'aaaaaaaaa','F8175E',234.00,234234.00,1,NULL,1,1,2,1,'2024-07-23 14:51:02','2024-07-23 14:51:02'),(123365,'Neymar Puma','7032A5',5000.00,70000.00,1,NULL,2,2,5,3,'2024-07-23 12:57:49','2024-07-23 12:57:49'),(135271,'rrrrrrrrrrrrrrrrr','5445A6',1.00,223423.00,NULL,NULL,1,2,2,2,'2024-07-23 15:09:06','2024-07-23 15:09:06'),(137623,'ádf','CC4ABB',234243.00,2.00,NULL,NULL,1,1,1,2,'2024-07-23 14:53:35','2024-07-23 14:53:35'),(149129,'Cristiano Ronaldo Nike ','05A609',5800.00,680000.00,1,NULL,2,2,2,2,'2024-07-23 12:57:19','2024-07-23 12:57:19'),(154812,'vvvvvvvvvvvvv','F5F7F3',35443.00,453454.00,1,NULL,2,2,2,2,'2024-07-23 15:23:21','2024-07-23 15:23:21'),(175125,'sdsdsd','DFF04E',32423.00,23423.00,1,NULL,1,1,1,1,'2024-07-23 14:40:30','2024-07-23 14:40:30'),(178456,'ToniKroos Euro 2024','E33870',3000.00,300000.00,1,NULL,2,1,2,2,'2024-07-23 12:56:06','2024-07-23 12:56:06'),(179951,'Pogba Doping','C7A2FC',28800.00,10000000.00,1,NULL,3,2,2,2,'2024-07-23 12:59:30','2024-07-23 12:59:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER','2024-07-23 12:27:52','2024-07-23 12:27:52'),(2,'MEMBERSHIP','2024-07-23 12:27:52','2024-07-23 12:27:52'),(3,'ADMIN','2024-07-23 12:27:52','2024-07-23 12:27:52'),(4,'USER','2024-07-23 12:50:44','2024-07-23 12:50:44'),(5,'MEMBERSHIP','2024-07-23 12:50:44','2024-07-23 12:50:44'),(6,'ADMIN','2024-07-23 12:50:44','2024-07-23 12:50:44'),(7,'USER','2024-07-23 13:53:17','2024-07-23 13:53:17'),(8,'MEMBERSHIP','2024-07-23 13:53:17','2024-07-23 13:53:17'),(9,'ADMIN','2024-07-23 13:53:17','2024-07-23 13:53:17'),(10,'USER','2024-07-23 14:50:03','2024-07-23 14:50:03'),(11,'MEMBERSHIP','2024-07-23 14:50:03','2024-07-23 14:50:03'),(12,'ADMIN','2024-07-23 14:50:03','2024-07-23 14:50:03'),(13,'USER','2024-07-23 15:19:10','2024-07-23 15:19:10'),(14,'MEMBERSHIP','2024-07-23 15:19:10','2024-07-23 15:19:10'),(15,'ADMIN','2024-07-23 15:19:10','2024-07-23 15:19:10'),(16,'USER','2024-07-23 15:21:43','2024-07-23 15:21:43'),(17,'MEMBERSHIP','2024-07-23 15:21:43','2024-07-23 15:21:43'),(18,'ADMIN','2024-07-23 15:21:43','2024-07-23 15:21:43');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_product_details`
--

LOCK TABLES `size_product_details` WRITE;
/*!40000 ALTER TABLE `size_product_details` DISABLE KEYS */;
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
INSERT INTO `users` VALUES (1102497741,'admin',NULL,NULL,'$2b$10$0D2UXG6iX5jt1BTjJnih9OiRe75NLz3qYc.WAdzUfgDuCAhobf6GG',NULL,NULL,3,'2024-07-23 12:50:44','2024-07-23 12:50:44'),(1258743611,'admin',NULL,NULL,'$2b$10$DtxHsMF5dkNQNVgOfYXXtOk9PyCCBYyT5lbnhGoSO1RQSUe8HWe5.',NULL,NULL,3,'2024-07-23 15:21:43','2024-07-23 15:21:43'),(1409795300,'admin',NULL,NULL,'$2b$10$.RQqbBmu.xH11dGd1ZZ8ieW8i1ZLHmbIL9ewQEmGoflE0j9hbED12',NULL,NULL,3,'2024-07-23 12:27:52','2024-07-23 12:27:52'),(1468022091,'admin',NULL,NULL,'$2b$10$roy2lDTWWh72DVV9OqgV.uboJCxakHe7kDOj/QrPE9Z672hxB2ik2',NULL,NULL,3,'2024-07-23 15:19:10','2024-07-23 15:19:10'),(1530202385,'admin',NULL,NULL,'$2b$10$KIULR4L9njiqNHqGv4vShu97DWUPc.YCu.7vN1Ab.P3TgSL6uzYJm',NULL,NULL,3,'2024-07-23 14:50:03','2024-07-23 14:50:03'),(1794933101,'admin',NULL,NULL,'$2b$10$Xqma5OxcQyHnfikEGcFQJ.QTwFnnW/DZ2a/tZ/l.LLSFrNrVweXT2',NULL,NULL,3,'2024-07-23 13:53:17','2024-07-23 13:53:17');
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

-- Dump completed on 2024-07-23 15:57:04
