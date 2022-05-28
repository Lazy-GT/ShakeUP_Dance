CREATE DATABASE  IF NOT EXISTS `ssafy_dance` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ssafy_dance`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 52.78.97.122    Database: ssafy_dance
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `bid` int NOT NULL AUTO_INCREMENT,
  `category` int NOT NULL,
  `uid` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`bid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boardcomment`
--

DROP TABLE IF EXISTS `boardcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boardcomment` (
  `vcid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `bid` int NOT NULL,
  `content` varchar(200) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`vcid`),
  KEY `uid_idx` (`uid`),
  KEY `bid00_idx` (`bid`),
  CONSTRAINT `board_comment_bid` FOREIGN KEY (`bid`) REFERENCES `board` (`bid`),
  CONSTRAINT `board_comment_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boardcomment`
--

LOCK TABLES `boardcomment` WRITE;
/*!40000 ALTER TABLE `boardcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `boardcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `copy_video`
--

DROP TABLE IF EXISTS `copy_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `copy_video` (
  `copyid` int NOT NULL AUTO_INCREMENT,
  `original_vid` int NOT NULL,
  `copy_vid` int NOT NULL,
  `origin_name` varchar(255) DEFAULT NULL,
  `origin_profile` varchar(255) DEFAULT NULL,
  `uid` int NOT NULL,
  PRIMARY KEY (`copyid`),
  KEY `original_vid_idx` (`original_vid`),
  KEY `copy_vid_idx` (`copy_vid`),
  CONSTRAINT `copy_vid` FOREIGN KEY (`copy_vid`) REFERENCES `videos` (`vid`),
  CONSTRAINT `original_vid` FOREIGN KEY (`original_vid`) REFERENCES `videos` (`vid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `copy_video`
--

LOCK TABLES `copy_video` WRITE;
/*!40000 ALTER TABLE `copy_video` DISABLE KEYS */;
INSERT INTO `copy_video` VALUES (1,2,16,NULL,NULL,2),(2,2,17,NULL,NULL,8),(3,3,18,NULL,NULL,2),(4,4,24,NULL,NULL,6),(5,19,25,NULL,NULL,6);
/*!40000 ALTER TABLE `copy_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupcomment`
--

DROP TABLE IF EXISTS `cupcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupcomment` (
  `vcid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `vid` int NOT NULL,
  `content` varchar(45) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`vcid`),
  KEY `uid_idx` (`uid`),
  KEY `vid0_idx` (`vid`),
  CONSTRAINT `cup_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `cup_vid` FOREIGN KEY (`vid`) REFERENCES `videos` (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupcomment`
--

LOCK TABLES `cupcomment` WRITE;
/*!40000 ALTER TABLE `cupcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `cupcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe`
--

DROP TABLE IF EXISTS `subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribe` (
  `ssid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `subid` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`ssid`),
  KEY `uid_idx` (`uid`),
  KEY `subid_idx` (`subid`),
  CONSTRAINT `subid` FOREIGN KEY (`subid`) REFERENCES `users` (`uid`),
  CONSTRAINT `subuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe`
--

LOCK TABLES `subscribe` WRITE;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
INSERT INTO `subscribe` VALUES (1,11,2,'2022-02-14 15:15:43'),(2,11,8,'2022-02-14 15:15:52'),(4,11,3,'2022-02-15 01:50:13'),(6,1,2,'2022-02-15 10:41:29'),(23,10,5,'2022-02-15 13:53:12'),(34,10,4,'2022-02-15 15:11:42'),(35,8,10,'2022-02-15 15:46:32'),(45,6,2,'2022-02-17 11:39:59');
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `vid` int NOT NULL,
  `tname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `vid_idx` (`vid`),
  CONSTRAINT `tag_vid` FOREIGN KEY (`vid`) REFERENCES `videos` (`vid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (2,2,'string'),(3,3,'string'),(4,4,'string'),(5,5,'string'),(6,6,'string'),(7,7,'string'),(8,8,'string'),(9,9,'string'),(10,10,'string'),(11,11,'string'),(12,12,'string'),(13,13,'string'),(14,14,'string'),(15,15,'string'),(16,16,'string'),(17,17,'string'),(18,18,'string'),(19,19,'string'),(20,20,'string'),(21,21,'string'),(22,22,'string'),(23,23,'string'),(24,24,'string'),(25,25,'string'),(26,26,'string'),(27,27,'string'),(28,28,'댄따'),(29,28,'롤린'),(30,28,'개잘춤'),(31,29,'string');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlike`
--

DROP TABLE IF EXISTS `userlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlike` (
  `ulid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `vid` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`ulid`),
  KEY `uid_idx` (`uid`),
  KEY `like_vid` (`vid`),
  CONSTRAINT `like_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `like_vid` FOREIGN KEY (`vid`) REFERENCES `videos` (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlike`
--

LOCK TABLES `userlike` WRITE;
/*!40000 ALTER TABLE `userlike` DISABLE KEYS */;
/*!40000 ALTER TABLE `userlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `id` varchar(45) NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `profile` varchar(500) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT 'USER',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ssafy','{noop}U6WELPN2DC','ssafy@ssafy.com','김싸피','no profile','2022-02-14 02:04:44','USER'),(2,'seoyoung','{noop}seoyoung12','seoyoung@gmail.com','서영','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/images%2Fprofile.png?alt=media&token=2254d6ec-18ae-45ab-886d-dc9bca4bc354','2022-02-14 11:22:43',NULL),(3,'leejung','{noop}lj1234','leejung@gmail.com','리정','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644807140363?alt=media&token=7ee5b732-8f3b-46aa-8522-8ee1cfdf7718','2022-02-14 11:52:51',NULL),(4,'honeyj','{noop}hj1234','honeyj@gmail.com','허니제이','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644807530732?alt=media&token=d0cb0dd9-4fe8-46af-b104-5db6617adad2','2022-02-14 11:59:47',NULL),(5,'yeri','{noop}yeri1234','yeri@gmail.com','예리','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644807631965?alt=media&token=c3990ae3-5fda-483d-aae4-dd1a7b853645','2022-02-14 12:00:42',NULL),(6,'seongseok','{noop}ss1234','seongseok@gmail.com','성석','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/images%2FFQop2zU8ZEC9PyzRXbJs?alt=media&token=9a9b17e0-c1dd-4a09-82da-a3488a32174e','2022-02-14 15:54:10',NULL),(7,'gitae','{noop}gitae1234','gitae@gmail.com','기태','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821951633?alt=media&token=5daa89e7-6a7e-41c6-8d91-abba4fc0107b','2022-02-14 15:59:31',NULL),(8,'ms','{noop}ms1234','ms@gmail.com','명성','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822484642?alt=media&token=de3311b3-d52c-4ae3-a011-273e2b88f3e2','2022-02-14 16:08:22',NULL),(9,'seunguan','{noop}sg1234','sg@gmail.com','승관','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644827130678?alt=media&token=91206f9e-64c4-4dd7-a8b7-a57bd302cbc9','2022-02-14 17:25:50',NULL),(10,'junyeong','{noop}jy1234','jy@gmail.com','준영','https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644827250565?alt=media&token=bf6c33ff-8b85-4280-afaf-f8dc3286ef67','2022-02-14 17:27:44',NULL),(11,'daeun','{noop}daeun','ekdms42132@gmail.com','김다은',NULL,'2022-02-14 11:46:28','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `users_uid` int NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKlacxqimynr1l5om9jtb15cuo1` (`users_uid`),
  CONSTRAINT `FKlacxqimynr1l5om9jtb15cuo1` FOREIGN KEY (`users_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videocomment`
--

DROP TABLE IF EXISTS `videocomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videocomment` (
  `vcid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `vid` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`vcid`),
  KEY `uid_idx` (`uid`),
  KEY `vid_idx` (`vid`),
  CONSTRAINT `comment_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `comment_vid` FOREIGN KEY (`vid`) REFERENCES `videos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videocomment`
--

LOCK TABLES `videocomment` WRITE;
/*!40000 ALTER TABLE `videocomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `videocomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `vid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `likecnt` int DEFAULT '0',
  `views` int DEFAULT '0',
  `url` varchar(500) NOT NULL,
  `isshow` tinyint(1) NOT NULL DEFAULT '0',
  `category` int NOT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `comment` tinyint(1) NOT NULL DEFAULT '0',
  `score` int DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `isscore` tinyint NOT NULL DEFAULT '0',
  `iscomment` tinyint NOT NULL DEFAULT '0',
  `exposecnt` int DEFAULT '0',
  `clickcnt` int DEFAULT '0',
  `t_url` varchar(500) DEFAULT NULL,
  `islike` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `videos_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (2,2,'피치스',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644628771425?alt=media&token=11872f38-890f-4c3e-8ba0-b938aed11a42',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644814636614?alt=media&token=23df2856-3f6f-45d0-b18e-216e6e917732','2022-02-14 14:32:37',0,0,'피치스',1,1,0,0,NULL,_binary '\0','unknown'),(3,2,'아이솔레이션',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644500263394?alt=media&token=b922bd00-e620-40ff-ad79-7817e0d19a12',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644815382887?alt=media&token=a544c2ca-ac81-43ab-b338-057006ccfe31','2022-02-14 14:34:43',0,0,'아이솔레이션',1,1,0,0,NULL,_binary '\0','unknown'),(4,2,'바운스',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F12345.mp4?alt=media&token=b2d33474-a957-49b1-946c-a699cc9f6209',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/images%2Fdancethumbnail.png?alt=media&token=d4cdca3d-73f0-424a-9d41-00105783b793','2022-02-14 14:42:15',0,0,'바운스',1,1,0,0,NULL,_binary '\0','unknown'),(5,3,'넥스트레벨',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644628887913?alt=media&token=353a4404-0b62-405c-b2f7-6fa7b0c77b66',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644503038148?alt=media&token=088e7130-e582-48c7-b4c9-08ec01194064','2022-02-14 14:49:24',0,0,'넥스트레벨',1,1,0,0,NULL,_binary '\0','unknown'),(6,4,'허니제이힙합',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644629343168?alt=media&token=fd565c13-cefd-4262-abfa-3b581ad3aa22',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644503018564?alt=media&token=ca6dfc7e-e6a3-4b70-919b-870341a9d7cc','2022-02-14 14:55:01',0,0,'허니제이힙합',1,1,0,0,NULL,_binary '\0','unknown'),(7,5,'비보잉댄스',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F12345.mp4?alt=media&token=b2d33474-a957-49b1-946c-a699cc9f6209',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644502978671?alt=media&token=6d5dec3f-f41c-4122-bcd9-f5a94d494947','2022-02-14 14:57:21',0,0,'비보잉댄스',1,1,0,0,NULL,_binary '\0','unknown'),(8,6,'크로마키',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821327931?alt=media&token=cb5938db-bccd-4221-9c1a-5266c6c06c60',1,1,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041217760?alt=media&token=f2adb88d-7358-4c26-8fc4-b544487caa7f','2022-02-14 15:55:48',0,0,'성석1',1,1,29,12,NULL,_binary '\0','unknown'),(9,6,'제로투',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821348701?alt=media&token=03e62954-bbea-4fb7-bf18-4ee55106a73d',1,1,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041297665?alt=media&token=2df1087e-ea66-4e54-b3fa-74ef89ba298b','2022-02-14 15:56:33',0,0,'성석2',1,1,24,11,NULL,_binary '\0','unknown'),(10,7,'마돈나',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821340649?alt=media&token=b27e0677-17e5-413b-92d9-e34a3edeb705',1,1,'string','2022-02-14 16:00:41',0,0,'기태1',1,1,123,43,NULL,_binary '\0','unknown'),(11,8,'내가제일잘나가',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822899260?alt=media&token=032e7091-ab06-4389-ac21-67982d7dec21',1,1,'string','2022-02-14 16:15:27',0,0,'명성1',1,1,123,63,NULL,_binary '\0','unknown'),(12,8,'바카바카',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822937658?alt=media&token=7ece4b3c-ea50-429e-9936-d26e93c8faf1',1,1,'string','2022-02-14 16:16:10',0,0,'명성2',1,1,134,51,NULL,_binary '\0','unknown'),(13,8,'젠틀멘',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822978054?alt=media&token=b75cb15f-83cc-40a6-9f3e-616808b18ba21',1,1,'string','2022-02-14 16:17:13',0,0,'명성3',1,1,117,48,NULL,_binary '\0','unknown'),(14,10,'준영 친구 춤',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821374799?alt=media&token=7d8c07ca-ccd6-454e-a702-e552a74623aa',1,1,'string','2022-02-14 17:30:50',0,0,'준영 춤',1,1,129,50,NULL,_binary '\0','unknown'),(15,9,'승관 망치춤',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644821367242?alt=media&token=2e4c771e-20ce-4658-9261-fa3a08e13a65',1,1,'string','2022-02-14 17:32:33',0,0,'승관 춤',1,1,136,67,NULL,_binary '\0','unknown'),(16,2,'댄따 더미데이터',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822899260?alt=media&token=032e7091-ab06-4389-ac21-67982d7dec21',1,0,'string','2022-02-15 15:24:52',0,1,'댄따 테스트',1,1,0,0,NULL,_binary '\0','unknown'),(17,8,'댄따 더미데이터',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644822899260?alt=media&token=032e7091-ab06-4389-ac21-67982d7dec21',1,1,'string','2022-02-15 15:30:28',0,1,'댄따 테스트',1,1,53,15,NULL,_binary '\0','unknown'),(18,2,'댄따더미데이터2',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1643951677970?alt=media&token=7ec8fea1-0c5e-42c7-a490-c2e8796ceaa3',1,2,'string','2022-02-16 12:56:18',0,0,'댄따 더미데이터2',1,1,0,0,NULL,_binary '\0','unknown'),(19,10,'롤린',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644998233663?alt=media&token=10bed505-a4bd-4f9a-850a-a099eed5555e',1,1,'string','2022-02-16 16:58:24',0,0,'롤린',1,1,54,25,NULL,_binary '\0','unknown'),(20,10,'롤린_책상_위태로움',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644998313708?alt=media&token=62c282fc-0e44-4e95-b812-6ba5d339de4d',1,1,'string','2022-02-16 16:59:25',0,0,'롤린_책상_살려줘',1,1,61,31,NULL,_binary '\0','unknown'),(21,10,'코난스릴숔서스펜스',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644998382344?alt=media&token=be7dec36-f104-4223-8100-9941cc1e8947',1,1,'string','2022-02-16 17:01:39',0,0,'코난춤',1,1,62,32,NULL,_binary '\0','unknown'),(22,11,'PPAP',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645018262845?alt=media&token=d69bb7b4-3300-479a-91a8-8359c38d62a3',1,1,'string','2022-02-16 22:33:01',0,0,'ppap',1,1,40,17,NULL,_binary '\0','unknown'),(23,11,'외계인춤',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645018397010?alt=media&token=d7c5f330-bb4d-4f8b-a631-ef0e14003baa',1,1,'string','2022-02-16 22:34:07',0,0,'외계인춤',1,1,41,21,NULL,_binary '\0','unknown'),(24,6,'바운스 댄따',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644994349871.mp4?alt=media&token=47d4fc3f-c28e-413b-b01e-d021d4a3010d',1,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645040500710?alt=media&token=7037ded0-b3f3-4dc5-abd3-dc400427c4ea','2022-02-17 04:42:27',0,0,'바운스 댄따',1,1,0,0,NULL,_binary '\0','unknown'),(25,6,'롤린 댄따',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644996324845.mp4?alt=media&token=2f2bee84-4430-4593-a51f-d7f6a070090f',1,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645040788868?alt=media&token=bb0ee7c1-3d85-40f8-a6a0-3a1f26959384','2022-02-17 04:46:48',0,0,'롤린',1,1,0,0,NULL,_binary '\0','unknown'),(26,6,'저게뭐야멋있어',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041597036?alt=media&token=366cfd90-e5b3-40de-8cd9-d8acfc42634f',1,1,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041696095?alt=media&token=da94b34b-7cd2-4fac-b70b-24b7abe76fd1','2022-02-17 05:02:27',0,0,'저게뭐야멋있어',1,1,22,7,NULL,_binary '\0','unknown'),(27,6,'댄싱나잇',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041757275?alt=media&token=08412ba8-b0db-439e-bc99-3f7938090ac7',1,1,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645041837129?alt=media&token=5d04b856-ee7a-4d1d-be14-7b3dd00aa976','2022-02-17 05:04:17',0,0,'댄싱나잇',1,1,14,4,NULL,_binary '\0','unknown'),(28,6,'테스트시도1',0,0,'new_vid_url',0,0,'테스트시도1','2022-02-17 11:22:44',0,100,'롤린 개잘춤',1,1,0,0,NULL,_binary '\0','unknown'),(29,2,'롤린 댄따 원본',0,0,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F%EB%A1%A4%EB%A6%B0.mp4?alt=media&token=c9ddc95f-a1e3-4c39-b751-870bbd02f8db',1,2,'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645064652859?alt=media&token=fa7980be-0911-4455-a529-250ef746930a','2022-02-17 11:27:45',0,0,'롤린 댄따 원본',1,1,0,0,NULL,_binary '\0','unknown');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worldcup_ranking`
--

DROP TABLE IF EXISTS `worldcup_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worldcup_ranking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vid` int NOT NULL,
  `cup_id` int DEFAULT NULL,
  `cup_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cup_vid_idx` (`vid`),
  CONSTRAINT `worldcup_vid` FOREIGN KEY (`vid`) REFERENCES `videos` (`vid`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worldcup_ranking`
--

LOCK TABLES `worldcup_ranking` WRITE;
/*!40000 ALTER TABLE `worldcup_ranking` DISABLE KEYS */;
INSERT INTO `worldcup_ranking` VALUES (1,8,1,'코믹댄스 최강자, 나야나'),(2,9,1,'코믹댄스 최강자, 나야나'),(3,10,1,'코믹댄스 최강자, 나야나'),(4,11,1,'코믹댄스 최강자, 나야나'),(5,12,1,'코믹댄스 최강자, 나야나'),(6,13,1,'코믹댄스 최강자, 나야나'),(7,14,1,'코믹댄스 최강자, 나야나'),(8,15,1,'코믹댄스 최강자, 나야나'),(28,19,1,'코믹댄스 최강자, 나야나'),(29,20,1,'코믹댄스 최강자, 나야나'),(30,21,1,'코믹댄스 최강자, 나야나'),(31,17,1,'코믹댄스 최강자, 나야나!'),(38,22,1,'코믹댄스 최강자, 나야나'),(39,23,1,'코믹댄스 최강자, 나야나'),(40,18,1,'코믹댄스 최강자, 나야나!'),(50,27,1,'코믹댄스 최강자, 나야나!'),(51,26,1,'코믹댄스 최강자, 나야나!');
/*!40000 ALTER TABLE `worldcup_ranking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 13:31:00
