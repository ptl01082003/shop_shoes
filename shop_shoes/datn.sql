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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'MLB','2024-07-26 14:37:41','2024-07-26 14:37:47'),(2,'Nike','2024-07-26 14:38:47','2024-07-26 14:38:47'),(3,'Balenciaga','2024-07-26 14:40:16','2024-07-26 14:40:16'),(4,'Adidas','2024-07-26 14:40:36','2024-07-26 14:40:36'),(5,'Puma','2024-07-26 14:41:12','2024-07-26 14:41:12'),(6,'Vans','2024-07-26 14:41:29','2024-07-26 14:41:29'),(7,'Converse','2024-07-26 14:41:50','2024-07-26 14:41:50');
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
  `productDetailId` int DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartItemId`),
  KEY `productDetailId` (`productDetailId`),
  KEY `cartId` (`cartId`),
  CONSTRAINT `cart_items_ibfk_5` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_6` FOREIGN KEY (`cartId`) REFERENCES `shopping_carts` (`cartId`) ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'public/Uploads/image-101782702335.png',144899,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(2,'public/Uploads/image-103786909402.png',144899,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(3,'public/Uploads/image-104015283175.png',144899,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(4,'public/Uploads/image-102288794353.png',144899,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(5,'public/Uploads/image-100230836917.png',144899,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(6,'public/Uploads/image-102424571109.png',108523,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(7,'public/Uploads/image-100028018849.png',108523,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(8,'public/Uploads/image-101476778084.png',108523,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(9,'public/Uploads/image-102980745474.png',108523,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(10,'public/Uploads/image-100890914585.png',108523,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(11,'public/Uploads/image-102367061241.png',180334,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(12,'public/Uploads/image-102090354840.png',180334,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(13,'public/Uploads/image-101673276163.png',180334,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(14,'public/Uploads/image-103952440163.png',180334,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(15,'public/Uploads/image-103626869852.png',180334,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(16,'public/Uploads/image-101274538924.png',185894,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(17,'public/Uploads/image-101475372763.png',185894,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(18,'public/Uploads/image-100384781114.png',185894,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(19,'public/Uploads/image-101904756198.png',185894,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(20,'public/Uploads/image-104145147323.png',185894,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(21,'public/Uploads/image-101285819479.png',169105,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(22,'public/Uploads/image-100335458980.png',169105,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(23,'public/Uploads/image-104136876144.png',169105,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(24,'public/Uploads/image-100855973034.png',169105,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(25,'public/Uploads/image-103222733154.png',169105,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(26,'public/Uploads/image-102034136012.png',111141,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(27,'public/Uploads/image-100466644028.png',111141,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(28,'public/Uploads/image-103383107448.png',111141,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(29,'public/Uploads/image-100008382961.png',111141,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(30,'public/Uploads/image-100493550365.png',111141,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(36,'public/Uploads/image-101304775249.jpeg',153469,'2024-07-26 15:57:33','2024-07-26 15:57:33'),(37,'public/Uploads/image-100358597836.jpeg',153469,'2024-07-26 15:57:33','2024-07-26 15:57:33'),(38,'public/Uploads/image-101930091041.jpeg',153469,'2024-07-26 15:57:33','2024-07-26 15:57:33'),(39,'public/Uploads/image-101934081976.jpeg',153469,'2024-07-26 15:57:33','2024-07-26 15:57:33'),(40,'public/Uploads/image-101295851503.jpeg',153469,'2024-07-26 15:57:33','2024-07-26 15:57:33'),(41,'public/Uploads/image-102144186046.jpeg',127775,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(42,'public/Uploads/image-101123251766.jpeg',127775,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(43,'public/Uploads/image-100870362583.jpeg',127775,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(44,'public/Uploads/image-103394129582.jpeg',127775,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(45,'public/Uploads/image-101655714400.jpeg',128185,'2024-07-26 16:15:43','2024-07-26 16:15:43'),(46,'public/Uploads/image-103373378441.jpeg',128185,'2024-07-26 16:15:43','2024-07-26 16:15:43'),(47,'public/Uploads/image-101873963317.jpeg',128185,'2024-07-26 16:15:43','2024-07-26 16:15:43'),(48,'public/Uploads/image-103866739011.jpeg',128185,'2024-07-26 16:15:43','2024-07-26 16:15:43'),(49,'public/Uploads/image-101506858639.jpeg',128185,'2024-07-26 16:15:43','2024-07-26 16:15:43'),(50,'public/Uploads/image-103666969008.png',160412,'2024-07-26 16:24:44','2024-07-26 16:24:44'),(51,'public/Uploads/image-100222029843.png',160412,'2024-07-26 16:24:44','2024-07-26 16:24:44'),(52,'public/Uploads/image-103084196146.png',160412,'2024-07-26 16:24:44','2024-07-26 16:24:44'),(53,'public/Uploads/image-103784803831.png',160412,'2024-07-26 16:24:44','2024-07-26 16:24:44'),(54,'public/Uploads/image-103414566170.png',160412,'2024-07-26 16:24:44','2024-07-26 16:24:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Vải dệt','2024-07-26 14:45:28','2024-07-26 14:45:28'),(2,'Lưới','2024-07-26 14:45:50','2024-07-26 14:45:50'),(3,'Da tự nhiên','2024-07-26 14:46:00','2024-07-26 14:46:00'),(4,'Da tổng hợp','2024-07-26 14:46:11','2024-07-26 14:46:11'),(5,'Da lộn','2024-07-26 14:46:23','2024-07-26 14:46:23'),(6,'Polyester tái chế','2024-07-26 14:46:35','2024-07-26 14:46:35');
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
  `productDetailId` int DEFAULT NULL,
  `orderDetailId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `productDetailId` (`productDetailId`),
  KEY `orderDetailId` (`orderDetailId`),
  CONSTRAINT `order_items_ibfk_5` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_6` FOREIGN KEY (`orderDetailId`) REFERENCES `order_details` (`orderDetailId`) ON DELETE CASCADE ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Nga','2024-07-26 14:48:00','2024-07-26 14:48:00'),(2,'Đức','2024-07-26 14:48:04','2024-07-26 14:48:04'),(3,'Việt Nam','2024-07-26 14:48:10','2024-07-26 14:48:10'),(4,'Tây Ban Nha','2024-07-26 14:48:16','2024-07-26 14:48:16'),(5,'Anh','2024-07-26 14:48:20','2024-07-26 14:48:20'),(6,'Pháp','2024-07-26 14:48:23','2024-07-26 14:48:23'),(7,'Hàn Quốc','2024-07-26 14:48:29','2024-07-26 14:48:29'),(8,'Nhật Bản','2024-07-26 14:48:35','2024-07-26 14:48:35'),(9,'Trung Quốc','2024-07-26 14:48:40','2024-07-26 14:48:40'),(10,'Mỹ','2024-07-26 14:48:49','2024-07-26 14:48:49');
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
  `sizeId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productDetailId`),
  KEY `sizeId` (`sizeId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_details_ibfk_5` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`sizeId`) ON UPDATE CASCADE,
  CONSTRAINT `product_details_ibfk_6` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,1,144899,10,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(2,9,144899,41,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(3,2,144899,20,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(4,10,144899,56,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(5,3,144899,30,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(6,11,144899,47,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(7,4,144899,85,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(8,5,144899,800,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(9,6,144899,74,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(10,7,144899,83,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(11,8,144899,56,'2024-07-26 15:03:43','2024-07-26 15:03:43'),(12,1,108523,42,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(13,6,108523,46,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(14,2,108523,57,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(15,7,108523,76,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(16,3,108523,86,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(17,8,108523,57,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(18,4,108523,72,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(19,9,108523,94,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(20,5,108523,1000,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(21,10,108523,29,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(22,5,180334,500,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(23,6,180334,60,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(24,4,185894,50,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(25,5,185894,600,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(26,6,185894,574,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(27,7,185894,475,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(28,8,185894,123,'2024-07-26 15:28:41','2024-07-26 15:28:41'),(29,1,169105,20,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(30,2,169105,70,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(31,3,169105,72,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(32,4,169105,98,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(33,5,169105,72,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(34,6,169105,64,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(35,5,111141,34,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(36,1,111141,242,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(37,2,111141,54,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(38,3,111141,24,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(39,4,111141,43,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(40,4,127775,89,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(41,5,127775,98,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(42,5,128185,56,'2024-07-26 16:15:42','2024-07-26 16:15:42'),(43,2,128185,234,'2024-07-26 16:15:42','2024-07-26 16:15:42'),(44,1,128185,42,'2024-07-26 16:15:42','2024-07-26 16:15:42'),(45,3,128185,23,'2024-07-26 16:15:42','2024-07-26 16:15:42'),(46,4,128185,432,'2024-07-26 16:15:42','2024-07-26 16:15:42'),(47,5,160412,800,'2024-07-26 16:24:44','2024-07-26 16:24:44');
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
  `description` longtext,
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
  CONSTRAINT `products_ibfk_10` FOREIGN KEY (`styleId`) REFERENCES `styles` (`styleId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_11` FOREIGN KEY (`materialId`) REFERENCES `materials` (`materialId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_12` FOREIGN KEY (`brandId`) REFERENCES `brands` (`brandId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_9` FOREIGN KEY (`originId`) REFERENCES `origins` (`originId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=185895 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (108523,'Adidas ultraboost 1.0 \"triple white\" hàng chính hãng','709D93',1990000.00,4500000.00,1,NULL,'<h3><strong>Giày Adidas Ultraboost 1.0 \"Triple White\" HQ4202&nbsp;</strong><br><br>Giày Thể Thao Adidas Ultraboost 1.0 \"Triple White\" HQ4202 là một đôi giày chạy bộ được yêu thích bởi sự thoải mái, hiệu suất và phong cách. Với phối màu trắng toàn tập cổ điển, đôi giày này dễ dàng phối hợp với nhiều trang phục khác nhau.</h3><h3><strong>Ưu điểm:</strong></h3><h3>Thiết kế ôm sát,&nbsp;hỗ trợ tốt cho bàn chân</h3><h3>Chất liệu Primeknit nhẹ nhàng và thoáng khí</h3><h3>Đế Boost êm ái cho cảm giác di chuyển nhẹ nhàng và thoải mái</h3><h3>Phù hợp cho cả tập luyện thể thao và đi chơi</h3><h3><a href=\"https://bountysneakers.com/hq4202\">Giày Thể Thao Adidas Ultraboost 1.0 \"Triple White\" HQ4202</a> là một lựa chọn tuyệt vời cho những ai đang tìm kiếm một đôi giày chạy bộ thoải mái, hiệu suất cao và phong cách. Tuy nhiên, giá thành cao có thể là một rào cản đối với một số người.<br><br><img src=\"http://localhost:5500/public/Uploads/image-103027413057.png\"></h3>',2,1,1,4,'2024-07-26 15:13:17','2024-07-26 15:13:17'),(111141,'Chunky Classic Heel Dia Monogram \"Black/White\" chính hãng ','82E878',1050000.00,3790000.00,1,NULL,'<h2><br><strong>Chunky Classic Heel Dia Monogram \"Black/White\" chính hãng&nbsp;</strong><br><br>Chất liệu: Da tổng hợp&nbsp;</h2><ul><li>Kiểu dáng giày sneaker đế cao chunky thời trang</li><li>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</li><li>Cộng hưởng cùng chi tiết chữ logo bóng chày với họa tiết monogram&nbsp;in sắc nét</li><li>Lớp lót êm ái, nâng dáng bước chân</li><li>Đế cao su với độ bền cao, chắc chắn mang lại độ ma sát tốt</li><li>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</li><li>Xuất xứ thương hiệu: Hàn Quốc<br><br><img src=\"http://localhost:5500/public/Uploads/image-103774601109.png\"></li></ul>',7,1,5,1,'2024-07-26 15:42:50','2024-07-26 15:42:50'),(127775,'Balenciaga Triple S Sneaker ‘White Metal Grey’ ','18213F',556100.00,26900000.00,1,NULL,'<p><a href=\"https://www.farfetch.com/vn/shopping/men/balenciaga/items.aspx\"><strong>Balenciaga</strong></a></p><p>&nbsp;</p><p><strong>Triple S low-top sneakers</strong></p><p>Một trong những kiểu dáng được thèm muốn nhất của hãng, giày thể thao Triple S đại diện cho phong cách giày dép đầy sáng tạo và lấy cảm hứng từ thời trang dạo phố của Balenciaga. Nằm trên phần đế đúc dễ nhận biết, phiên bản màu trắng kem này được hoàn thiện với các điểm nhấn bằng lưới ở phía trên và nhãn hiệu ở lưỡi giày.<br><br>&nbsp;</p><figure class=\"image image-style-side\"><img src=\"http://localhost:5500/public/Uploads/image-103880809867.jpeg\"></figure><p><img src=\"http://localhost:5500/public/Uploads/image-103259765291.jpeg\"></p>',4,1,4,3,'2024-07-26 16:09:00','2024-07-26 16:09:00'),(128185,'Run Star Legacy \'Pink/White\'  ','99F959',500000.00,2900000.00,1,NULL,'<h3><strong>Run Star Legacy</strong></h3><figure class=\"image image-style-side\"><img src=\"http://localhost:5500/public/Uploads/image-103140096822.jpeg\"></figure><h3><br><br>Nâng tầm diện mạo của bạn chưa bao giờ dễ dàng hơn thế. Lấy cảm hứng từ sự tinh tế thường ngày của áo blazer, những đôi giày cao gót này kết hợp phong cách All Star không thể nhầm lẫn với những cập nhật tinh tế. Chất liệu hỗn hợp sang trọng và các tông màu đa dạng kết hợp với các chi tiết được khâu tinh tế để mang lại vẻ ngoài cao cấp, dễ dàng. Tính năng và lợi ích Thân giày bằng vải dệt bền bỉ, với kiểu dáng Chucks cổ điển Đệm xốp CX giúp mang lại sự thoải mái ở mức độ tiếp theo Da và đường khâu trang trí công phu tạo thêm điểm nhấn tinh tế Cản trước bằng cao su dạng sọc giúp tạo kiểu dáng và chức năng dễ tháo lắp Miếng dán mắt cá chân mang tính biểu tượng của Chuck Taylor và nhãn hiệu ngôi sao ở gót chân 3D 49mm Có thể có chênh lệch 1-2 cm về số đo tùy thuộc vào quá trình phát triển và sản xuất. Tuyên bố từ chối trách nhiệm về màu sắc: Màu sắc thực tế có thể khác nhau. Điều này là do mỗi màn hình máy tính có khả năng hiển thị màu sắc khác nhau, chúng tôi không thể đảm bảo rằng màu sắc bạn nhìn thấy phản ánh chính xác màu sắc thực của sản phẩm.</h3>',9,3,6,7,'2024-07-26 16:15:41','2024-07-26 16:15:41'),(144899,'Adidas samba og \"cloud white\" hàng chính hãng','A5A062',1850000.00,5000000.00,1,NULL,'<h2><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Giày Adidas Samba OG \"Cloud White\" B75806</strong><br><br><a href=\"https://bountysneakers.com/b75806\">Adidas Samba OG \"Cloud White\" B75806</a> là một đôi giày sneaker cổ điển được yêu thích bởi phong cách đơn giản và linh hoạt. Đôi giày này được làm bằng da cao cấp với phần trên màu trắng và các điểm nhấn màu đen. Nó có đế ngoài bằng cao su màu nâu gum mang lại độ bám và độ bền.&nbsp;<br>Giày Adidas Samba OG \"Cloud White\" B75806 là một lựa chọn tuyệt vời cho trang phục bình thường. Chúng có thể được mang với quần jean, quần short hoặc váy. Chúng cũng đủ thoải mái để mang cả ngày.<br><img src=\"http://localhost:5500/public/Uploads/image-103114938635.png\"><br>&nbsp;</h2>',2,1,4,4,'2024-07-26 15:03:42','2024-07-26 15:03:42'),(153469,' Balenciaga Speed ‘Black’ ','C4F878',18000000.00,22520000.00,1,NULL,'<p><a href=\"http://www.giaygoo.vn/products/giay-balenciaga-speed-trainer-den-trang\"><strong>GIÀY BALENCIAGA ĐEN&nbsp;TRẮNG SPEED&nbsp;</strong></a><br>Thiết kế theo dạng \"<strong>Giày Vớ</strong>\" <strong>cổ cao</strong>, có form dáng đi khá ôm chân bởi chi tiết thun co giãn phần cổ giày. Trong khi đó, phần đế trắng với những đường rãnh cắt to có nhiệm vụ làm cho đế giày linh hoạt khi bẻ cong và cũng là điểm nhấn ấn tượng khiến đôi giày trong bắt mắt từ xa. Đầu giày thon và gọn tôn lên vẻ đẹp tinh tế nhưng không kém phần năng động so với chính dòng giày sneaker vốn có.Thiết kế&nbsp;<strong>giày balenciaga đen trắng</strong>&nbsp;là mẫu giày khiến cả nam lẫn nữ say mê. \"Con cưng\" của giám đốc sáng tạo Demna Gvasalia nhà Balenciaga có dáng vẻ độc đáo và mạnh mẽ. Thiết kế kết hợp giày thể thao, tất cao cổ và bộ giảm xóc. Balenciaga Speed Trainers có ba phiên bản: đen, trắng và đỏ, nặng 240 gram.<br><br><img src=\"http://localhost:5500/public/Uploads/image-101850992028.jpeg\"><br>&nbsp;</p>',4,3,1,3,'2024-07-26 15:57:01','2024-07-26 15:57:33'),(160412,'CLASSIC SK8-HI BLACK/WHITE','A7EC2F',600000.00,1950000.00,1,NULL,'<p><i><strong>VANS&nbsp;</strong></i><a href=\"https://vans-news.com/vans-sk8\"><strong>SK8</strong>&nbsp;</a><br>xuất hiện lần đầu năm 1978 với tên gọi <i>\"Style 38\"</i> với thiết kế cao qua mắt cá chân, bảo vệ phần quan trọng nơi mà các vận động viên trượt ván lạm dụng nhiều để có những&nbsp;<i>Tricks</i> độc đáo, và đồng thời&nbsp;<strong>Sk8</strong> cũng mang lại phong cách thời trang đặc biệt điểm màu cho công viên thời bấy giờ.&nbsp;<br>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-103111590414.png\"></figure><p>Phiên bản <i><strong>VANS&nbsp;Classic Sk8 Black/White</strong></i> là một trong style kinh điển của <strong>VANS</strong> và đã mang lại lợi nhuận khổng lồ cho hãng khi luôn&nbsp;nằm trong mục <i>Best Seller</i> của <strong>VANS</strong>. Tông màu đen đơn giản dễ phối đồ cùng cổ cao kinh điển sẽ là sản phẩm tuyệt vời cho các fan yêu thời trang.<br><br><br>&nbsp;</p>',3,2,2,6,'2024-07-26 16:24:44','2024-07-26 16:24:44'),(169105,'Bigball Chunky Pastel \"Hồng\" - chính hãng ','C32CE1',1500000.00,3290000.00,1,NULL,'<h2><br><strong>Bigball Chunky Pastel \"Hồng\" - chính hãng&nbsp;</strong><br><br>Đắm chìm trong sự ngọt ngào và cá tính cùng đôi giày sneakers Bigball Chunky Pastel đến từ MLB. Với thiết kế phom dáng đặc trưng nhưng được biến tấu đầy ngọt ngào cùng các gam màu pastel tinh tế, item này sẵn sàng cùng bạn tự tin thể hiện cá tính và phong cách riêng.</h2><p>Thương hiệu: MLB<br>Xuất xứ: Hàn Quốc<br>Giới tính: Unisex<br>Kiểu dáng: Giày sneakers cổ thấp<br>Màu sắc: Pink, Purple<br>Chất liệu: Da tổng hợp<br>Đế: EVA<br>Thiết kế:</p><ul><li>Kiểu dáng giày sneaker đế cao thời trang</li><li>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</li><li>Cộng hưởng cùng chi tiết chữ logo bóng chày nổi bật ở má ngoài</li><li>Đế cao su với độ bền cao, chắc chắn mang lại độ ma sát tốt</li><li>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</li></ul><p>Logo: Được in trên lót trong &nbsp;<br>Mũi giày: Tròn<br>Dây quai: Dây buộc tròn, có thể điều chỉnh dễ dàng &nbsp;&nbsp;<br>Thoáng khí: Có lớp lót thoáng khí &nbsp;<br>Thích hợp dùng trong các dịp: Đi làm, đi chơi,...<br>Xu hướng theo mùa: Sử dụng được tất cả các mùa trong năm<br><br><img src=\"http://localhost:5500/public/Uploads/image-104153844582.png\"></p>',7,1,4,1,'2024-07-26 15:34:00','2024-07-26 15:34:00'),(180334,'J Balvin x Air Jordan 1 High','95E13F',8000000.00,12550000.00,1,NULL,'<h2><strong>J Balvin x Air Jordan 1 High</strong><br><br>Ban đầu được ra mắt trong một buổi biểu diễn giữa giờ trên sân khấu lớn nhất của giải bóng bầu dục Mỹ, đôi AJ1 độc quyền này sử dụng sự kết hợp chiết trung của màu sắc, họa tiết và đồ họa để tái hiện hình bóng cổ điển theo hình ảnh của nghệ sĩ thu âm người Colombia J Balvin. Các lớp phủ được may thô làm mờ các đường nét thiết kế sắc nét thường thấy của thiết kế, trong khi quang phổ màu neon thổi vào diện mạo một luồng năng lượng mạnh mẽ. Đồ họa có thể tùy chỉnh (bao gồm cả khuôn mặt cười đặc trưng của Balvin) tạo nên nét độc đáo cho lưỡi gà, với hình ảnh tương tự trang trí đế giày và gót giày. Buộc dây giày và tiến bước theo nhịp trống của riêng bạn trong bộ sưu tập đầy màu sắc và được mong đợi từ lâu này.</h2><p>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-101678174524.png\"></figure>',10,3,5,2,'2024-07-26 15:21:08','2024-07-26 15:21:08'),(185894,'Nike Pegasus 41 Electric ','888555',2000000.00,20109000.00,1,NULL,'<h2><br><strong>Nike Pegasus 41 Electric</strong><br><br>Đệm phản hồi trong Pegasus mang đến một chuyến đi tràn đầy năng lượng cho việc chạy bộ trên đường hàng ngày. Trải nghiệm khả năng phục hồi năng lượng nhẹ hơn với hai bộ phận Air Zoom và đế giữa bằng bọt ReactX. Thêm vào đó, lưới kỹ thuật cải tiến ở phần trên giúp giảm trọng lượng và tăng khả năng thoáng khí.</h2><p>Các tính năng chính<br>Phần trên bằng lưới kỹ thuật thoáng khí được nâng cấp<br>Đế giữa bằng bọt ReactX bao quanh các bộ phận Air Zoom ở bàn chân trước và gót chân để mang đến một chuyến đi tràn đầy năng lượng.<br>Đế ngoài bằng cao su lấy cảm hứng từ bánh quế đặc trưng để tạo lực kéo và độ linh hoạt<br>Cổ áo, lưỡi giày và lót giày sang trọng để vừa vặn và thoải mái<br>Có gì mới? Đế giữa bằng bọt ReactX hoàn toàn mới phản hồi nhanh hơn 13% so với công nghệ React trước đây.<br>Được chế tạo để mang lại hiệu suất và bảo vệ môi trường, bọt ReactX được thiết kế để giảm lượng khí thải carbon ít nhất 43% trong một đôi đế giữa do giảm năng lượng trong quá trình sản xuất so với bọt React trước đây. Lượng khí thải carbon của ReactX dựa trên đánh giá từ lúc bắt đầu đến khi ra mắt do PRé Sustainability B.V. và Intertek China xem xét. Các thành phần đế giữa khác như túi khí, tấm đế hoặc các công thức bọt khác không được xem xét.<br>Chi tiết sản phẩm<br>Trọng lượng: Xấp xỉ 297g (cỡ nam 9)<br>Độ chênh lệch từ gót chân đến mũi chân: 10mm<br>MR-10 cuối cùng—vừa vặn nhất và nhất quán nhất của chúng tôi (giống như Pegasus 40)<br>Không dùng làm thiết bị bảo vệ cá nhân (PPE)<br>Chi tiết sản phẩm<br>Màu sắc hiển thị: Nhiều màu/Nhiều màu<br>Kiểu dáng: FV2229-900<br>Quốc gia/Khu vực xuất xứ: Trung Quốc<br><br><img src=\"http://localhost:5500/public/Uploads/image-101602833851.png\"><br>&nbsp;</p>',10,1,1,2,'2024-07-26 15:28:41','2024-07-26 15:28:41');
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
INSERT INTO `roles` VALUES (1,'USER','2024-07-26 14:36:29','2024-07-26 14:36:29'),(2,'MEMBERSHIP','2024-07-26 14:36:29','2024-07-26 14:36:29'),(3,'ADMIN','2024-07-26 14:36:29','2024-07-26 14:36:29');
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
INSERT INTO `sizes` VALUES (1,36,'2024-07-26 14:47:20','2024-07-26 14:47:20'),(2,37,'2024-07-26 14:47:24','2024-07-26 14:47:24'),(3,38,'2024-07-26 14:47:27','2024-07-26 14:47:27'),(4,39,'2024-07-26 14:47:30','2024-07-26 14:47:30'),(5,40,'2024-07-26 14:47:33','2024-07-26 14:47:33'),(6,41,'2024-07-26 14:47:36','2024-07-26 14:47:36'),(7,42,'2024-07-26 14:47:39','2024-07-26 14:47:39'),(8,43,'2024-07-26 14:47:42','2024-07-26 14:47:42'),(9,44,'2024-07-26 14:47:45','2024-07-26 14:47:45'),(10,45,'2024-07-26 14:47:48','2024-07-26 14:47:48'),(11,46,'2024-07-26 14:47:51','2024-07-26 14:47:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'Low-top','2024-07-26 14:43:18','2024-07-26 14:43:18'),(2,'Mid-top','2024-07-26 14:43:30','2024-07-26 14:43:30'),(3,'High-top','2024-07-26 14:43:45','2024-07-26 14:43:45');
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
INSERT INTO `users` VALUES (1160752695,'admin',NULL,NULL,'$2b$10$FU/RW8RcwLg3j.w11HFn7.mSDxyDMpiXCUYVmBU9p.aHwB7k67uAW',NULL,NULL,3,'2024-07-26 14:36:29','2024-07-26 14:36:29');
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

-- Dump completed on 2024-07-26 16:26:54
