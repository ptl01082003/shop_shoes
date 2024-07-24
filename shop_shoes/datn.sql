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
  `addressId` int NOT NULL AUTO_INCREMENT,
  `cityCode` int DEFAULT NULL,
  `wardCode` int DEFAULT NULL,
  `districtCode` int DEFAULT NULL,
  `cityName` varchar(255) DEFAULT NULL,
  `wardName` varchar(255) DEFAULT NULL,
  `districtName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `recipientName` varchar(255) DEFAULT NULL,
  `defaults` varchar(255) DEFAULT NULL,
  `customerID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
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
  `brandId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Biti’s','2024-07-24 10:55:55','2024-07-24 19:08:45'),(2,'ADIDAS','2024-07-24 10:55:59','2024-07-24 19:09:27'),(3,'VANS','2024-07-24 10:56:02','2024-07-24 19:10:04'),(4,'NEW BALANCE','2024-07-24 10:56:08','2024-07-24 19:09:53'),(5,'NIKE','2024-07-24 10:56:17','2024-07-24 19:09:37'),(6,' CONVERSE','2024-07-24 19:50:04','2024-07-24 19:50:04'),(7,'BALENCIAGA','2024-07-24 20:32:18','2024-07-24 20:32:29'),(8,'MLB Korea','2024-07-24 20:44:10','2024-07-24 20:44:10');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cartItemId` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartItemId`),
  KEY `productId` (`productId`),
  KEY `cartId` (`cartId`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE,
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
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `favorites_list_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
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
  `path` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `productId` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (5,'public/Uploads/image-100633629570.jpeg',186974,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(6,'public/Uploads/image-101740050592.jpeg',186974,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(7,'public/Uploads/image-102153315436.jpeg',173381,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(8,'public/Uploads/image-102083224814.jpeg',173381,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(9,'public/Uploads/image-101733926750.jpeg',143500,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(10,'public/Uploads/image-101778265094.jpeg',143500,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(11,'public/Uploads/image-103991448014.jpeg',174796,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(12,'public/Uploads/image-100197505038.jpeg',174796,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(13,'public/Uploads/image-102210424452.jpeg',183437,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(14,'public/Uploads/image-104290211516.jpeg',183437,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(15,'public/Uploads/image-100950561772.jpeg',183808,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(16,'public/Uploads/image-101002572109.jpeg',183808,'2024-07-24 20:41:28','2024-07-24 20:41:28');
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
  `name` varchar(255) DEFAULT NULL,
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
INSERT INTO `materials` VALUES (1,'Vải mềm cao cấp','2024-07-24 10:57:23','2024-07-24 10:57:23'),(2,' Cao su non','2024-07-24 10:57:36','2024-07-24 10:57:36'),(3,'Xốp và nhựa tổng hợp','2024-07-24 10:57:42','2024-07-24 10:57:42'),(4,'Da thuộc cao cấp','2024-07-24 10:57:46','2024-07-24 10:57:46'),(5,'100% da thật','2024-07-24 10:57:50','2024-07-24 10:57:50');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `orderDetailId` int NOT NULL AUTO_INCREMENT,
  `totals` int DEFAULT NULL,
  `orderCode` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderDetailId`),
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
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `quanity` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `orderDetailId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `productId` (`productId`),
  KEY `orderDetailId` (`orderDetailId`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`orderDetailId`) REFERENCES `order_details` (`orderDetailId`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `originId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`originId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Nga','2024-07-24 10:58:20','2024-07-24 10:58:20'),(2,'Việt Nam','2024-07-24 10:58:27','2024-07-24 10:58:27'),(3,'Anh','2024-07-24 10:58:33','2024-07-24 10:58:33'),(4,'Mỹ','2024-07-24 10:58:35','2024-07-24 10:58:35'),(5,'Trung Quốc','2024-07-24 10:58:42','2024-07-24 10:58:42'),(6,'Hàn Quốc','2024-07-24 19:23:51','2024-07-24 19:23:51'),(7,'Nhật Bản','2024-07-24 19:24:00','2024-07-24 19:24:00'),(8,'Ấn Độ','2024-07-24 19:24:13','2024-07-24 19:24:13');
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
  `name` varchar(255) DEFAULT NULL,
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
  `paymentDetailId` int NOT NULL AUTO_INCREMENT,
  `orderDetailId` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'IDLE',
  `amount` int DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`paymentDetailId`),
  KEY `orderDetailId` (`orderDetailId`),
  CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`orderDetailId`) REFERENCES `order_details` (`orderDetailId`) ON UPDATE CASCADE
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
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `productDetailId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productDetailId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (10,NULL,'<p>WWOWW</p><blockquote><p>dành cho người thích đẹp và thích màu đỏ&nbsp;<br>&nbsp;</p></blockquote><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-100201014390.jpeg\"></figure>',186974,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(11,NULL,'<p>Phù hợp cho mọi người <img src=\"http://localhost:5500/public/Uploads/image-102580369895.jpeg\"></p>',173381,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(12,NULL,'<p>Giày phù hợp với học sinh , sinh viên &nbsp;<img src=\"http://localhost:5500/public/Uploads/image-100995813619.jpeg\"></p>',143500,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(13,NULL,'<p>Giày siêu phẩm dành cho những người yêu thích kiểu giày không dây cổ cao <img src=\"http://localhost:5500/public/Uploads/image-100697419054.jpeg\"></p>',174796,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(14,NULL,'<p>Vans Classic đánh nát con tim</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-104220993368.jpeg\"></figure>',183437,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(15,NULL,'<p>Hàng Việt Nam chất lượng cao&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-103497458360.jpeg\"></figure><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>',183808,'2024-07-24 20:41:28','2024-07-24 20:41:28');
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promotion`
--

DROP TABLE IF EXISTS `product_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_promotion` (
  `productId` int NOT NULL,
  `promotionId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`promotionId`),
  KEY `promotionId` (`promotionId`),
  CONSTRAINT `product_promotion_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE,
  CONSTRAINT `product_promotion_ibfk_2` FOREIGN KEY (`promotionId`) REFERENCES `promotions` (`promotionId`) ON UPDATE CASCADE
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
  `productId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `importPrice` decimal(16,2) DEFAULT NULL,
  `price` decimal(16,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `display` tinyint(1) DEFAULT NULL,
  `originId` int DEFAULT NULL,
  `styleId` int DEFAULT NULL,
  `materialId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `originId` (`originId`),
  KEY `styleId` (`styleId`),
  KEY `materialId` (`materialId`),
  KEY `brandId` (`brandId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`originId`) REFERENCES `origins` (`originId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`styleId`) REFERENCES `styles` (`styleId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`materialId`) REFERENCES `materials` (`materialId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`brandId`) REFERENCES `brands` (`brandId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186975 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (143500,'Classic Chucks','2F316C',700000.00,1300000.00,1,NULL,2,3,1,6,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(173381,'Yeezy 350','8AAC8E',3400000.00,8000000.00,1,NULL,3,1,1,2,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(174796,'Balenciaga Speed','7E4828',10000000.00,18000000.00,NULL,NULL,2,3,1,4,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(183437,'Vans Classic Black','89D09C',200000.00,1000000.00,1,NULL,4,1,3,3,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(183808,'Hunter Street Go For Love 2K24 HSM006500','7CCC66',200000.00,100000.00,1,NULL,2,2,2,1,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(186974,' Nike Air Jordan 1','AB0553',5000000.00,15000000.00,1,NULL,4,1,3,5,'2024-07-24 19:35:58','2024-07-24 19:35:58');
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
  `name` varchar(255) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
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
  `roleId` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER','2024-07-24 10:54:46','2024-07-24 10:54:46'),(2,'MEMBERSHIP','2024-07-24 10:54:46','2024-07-24 10:54:46'),(3,'ADMIN','2024-07-24 10:54:46','2024-07-24 10:54:46');
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
  `sizeProductDetailId` int NOT NULL AUTO_INCREMENT,
  `sizeId` int DEFAULT NULL,
  `productDetailId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeProductDetailId`),
  KEY `sizeId` (`sizeId`),
  KEY `productDetailId` (`productDetailId`),
  CONSTRAINT `size_product_details_ibfk_1` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`sizeId`) ON UPDATE CASCADE,
  CONSTRAINT `size_product_details_ibfk_2` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_product_details`
--

LOCK TABLES `size_product_details` WRITE;
/*!40000 ALTER TABLE `size_product_details` DISABLE KEYS */;
INSERT INTO `size_product_details` VALUES (9,1,10,10,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(10,2,10,20,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(11,3,10,30,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(12,4,10,40,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(13,5,10,500,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(14,6,10,50,'2024-07-24 19:35:58','2024-07-24 19:35:58'),(15,1,11,10,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(16,2,11,20,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(17,3,11,30,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(18,4,11,40,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(19,5,11,800,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(20,6,11,50,'2024-07-24 19:48:53','2024-07-24 19:48:53'),(21,1,12,30,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(22,2,12,20,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(23,3,12,60,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(24,4,12,80,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(25,5,12,1000,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(26,6,12,20,'2024-07-24 19:57:28','2024-07-24 19:57:28'),(27,1,13,20,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(28,2,13,34,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(29,3,13,50,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(30,4,13,38,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(31,5,13,500,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(32,6,13,67,'2024-07-24 20:05:23','2024-07-24 20:05:23'),(33,1,14,10,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(34,4,14,10,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(35,2,14,30,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(36,5,14,600,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(37,3,14,74,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(38,6,14,62,'2024-07-24 20:31:58','2024-07-24 20:31:58'),(39,1,15,10,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(40,4,15,20,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(41,2,15,30,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(42,5,15,700,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(43,3,15,30,'2024-07-24 20:41:28','2024-07-24 20:41:28'),(44,6,15,70,'2024-07-24 20:41:28','2024-07-24 20:41:28');
/*!40000 ALTER TABLE `size_product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `sizeId` int NOT NULL AUTO_INCREMENT,
  `name` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,36,'2024-07-24 10:57:55','2024-07-24 10:57:55'),(2,37,'2024-07-24 10:57:58','2024-07-24 10:57:58'),(3,38,'2024-07-24 10:58:01','2024-07-24 10:58:01'),(4,39,'2024-07-24 10:58:03','2024-07-24 10:58:03'),(5,40,'2024-07-24 10:58:06','2024-07-24 10:58:06'),(6,41,'2024-07-24 19:22:57','2024-07-24 19:22:57'),(7,42,'2024-07-24 19:23:03','2024-07-24 19:23:03'),(8,43,'2024-07-24 19:23:08','2024-07-24 19:23:08'),(9,44,'2024-07-24 19:23:18','2024-07-24 19:23:18'),(10,45,'2024-07-24 19:23:26','2024-07-24 19:23:26'),(11,46,'2024-07-24 19:23:33','2024-07-24 19:23:33');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `styles` (
  `styleId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`styleId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'Low-top','2024-07-24 10:56:26','2024-07-24 10:56:26'),(2,'Mid-top','2024-07-24 10:56:31','2024-07-24 10:56:31'),(3,'High-top','2024-07-24 10:56:34','2024-07-24 10:56:34');
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
  `roleId` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1022313941,'long18','lbeephamthanhlong@gmail.com','0369232003','$2b$10$XvYKBKxEhpRNuZmdN4PCDuS0gSa1vkj4HqwiI/WknpMqDCf8JFS8S',NULL,'LongPham',1,'2024-07-24 19:00:50','2024-07-24 19:00:50'),(1476002226,'admin',NULL,NULL,'$2b$10$6dk95rDdMYqsBVzVn4txdeHHd/4iBn4G7nZDNT5X.PJ.oAFtOaxNa',NULL,NULL,3,'2024-07-24 10:54:46','2024-07-24 10:54:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `vouchersId` int NOT NULL AUTO_INCREMENT,
  `describe` varchar(255) DEFAULT NULL,
  `discountType` varchar(255) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `valueOder` decimal(12,2) DEFAULT NULL,
  `discountMax` decimal(12,2) DEFAULT NULL,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `statusDelete` tinyint(1) DEFAULT NULL,
  `formPay` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `objectuUse` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`vouchersId`)
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

-- Dump completed on 2024-07-24 20:54:56
