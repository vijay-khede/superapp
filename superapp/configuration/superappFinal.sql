-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: generatedapps
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `HOSTING_DETAILS`
--

DROP TABLE IF EXISTS `HOSTING_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HOSTING_DETAILS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DELETED` tinyint(1) NOT NULL DEFAULT '0',
  `CUSTOMER_ID` int DEFAULT NULL,
  `APP_ID` int DEFAULT NULL,
  `ENVIRONMENT` varchar(50) DEFAULT NULL,
  `DOMAIN` varchar(255) DEFAULT NULL,
  `SSL_CERTIFICATE` longtext,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKg2w2qqgqmlcsjtc3o4ggyc1uo` (`APP_ID`),
  KEY `FKckd7lq06qidl4fy1syxcrrnck` (`CREATOR`),
  KEY `FKegtv735p379my5gncyi2c1nqu` (`LAST_MODIFIER`),
  CONSTRAINT `FKckd7lq06qidl4fy1syxcrrnck` FOREIGN KEY (`CREATOR`) REFERENCES `User` (`userid_pk`),
  CONSTRAINT `FKegtv735p379my5gncyi2c1nqu` FOREIGN KEY (`LAST_MODIFIER`) REFERENCES `User` (`userid_pk`),
  CONSTRAINT `FKg2w2qqgqmlcsjtc3o4ggyc1uo` FOREIGN KEY (`APP_ID`) REFERENCES `MINIAPP_DETAILS` (`ID`),
  CONSTRAINT `HOSTING_DETAILS_ibfk_1` FOREIGN KEY (`APP_ID`) REFERENCES `MINIAPP_DETAILS` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOSTING_DETAILS`
--

LOCK TABLES `HOSTING_DETAILS` WRITE;
/*!40000 ALTER TABLE `HOSTING_DETAILS` DISABLE KEYS */;
INSERT INTO `HOSTING_DETAILS` VALUES (1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `HOSTING_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HOSTING_DETAILS_AUD`
--

DROP TABLE IF EXISTS `HOSTING_DETAILS_AUD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HOSTING_DETAILS_AUD` (
  `id` int NOT NULL,
  `REV` int NOT NULL,
  `REVTYPE` tinyint DEFAULT NULL,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `CUSTOMER_ID` int DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `environment` varchar(50) DEFAULT NULL,
  `SSL_CERTIFICATE` longtext,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  `APP_ID` int DEFAULT NULL,
  PRIMARY KEY (`REV`,`id`),
  CONSTRAINT `FK19civg94fie2yw4673faic0sm` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOSTING_DETAILS_AUD`
--

LOCK TABLES `HOSTING_DETAILS_AUD` WRITE;
/*!40000 ALTER TABLE `HOSTING_DETAILS_AUD` DISABLE KEYS */;
INSERT INTO `HOSTING_DETAILS_AUD` VALUES (1,1,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(2,2,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(3,3,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(4,4,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(5,5,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(6,6,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(7,7,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(8,8,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(9,9,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(10,10,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(11,11,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(12,12,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(13,13,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(14,14,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(15,15,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(16,16,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(17,17,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(18,18,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(19,19,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(20,20,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(21,21,0,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `HOSTING_DETAILS_AUD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MINIAPP_BUILD_DETAILS`
--

DROP TABLE IF EXISTS `MINIAPP_BUILD_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MINIAPP_BUILD_DETAILS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DELETED` tinyint(1) NOT NULL DEFAULT '0',
  `CUSTOMER_ID` int DEFAULT NULL,
  `APP_ID` int DEFAULT NULL,
  `SOURCE_CODE_URL` varchar(255) DEFAULT NULL,
  `COMPILED_FILE_URL` varchar(255) DEFAULT NULL,
  `SOURCE_CODE_PATH` varchar(255) DEFAULT NULL,
  `STATUS` enum('NEW','PASS','FAIL') DEFAULT NULL,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKow8aoxe7gy5xbfume2ieiayyj` (`APP_ID`),
  KEY `FKghi1hpuuseae8nl3pary6vf6a` (`CREATOR`),
  KEY `FKja3p00t9un1sgg2hhcb2k3dmb` (`LAST_MODIFIER`),
  CONSTRAINT `FKghi1hpuuseae8nl3pary6vf6a` FOREIGN KEY (`CREATOR`) REFERENCES `User` (`userid_pk`),
  CONSTRAINT `FKja3p00t9un1sgg2hhcb2k3dmb` FOREIGN KEY (`LAST_MODIFIER`) REFERENCES `User` (`userid_pk`),
  CONSTRAINT `FKow8aoxe7gy5xbfume2ieiayyj` FOREIGN KEY (`APP_ID`) REFERENCES `MINIAPP_DETAILS` (`ID`),
  CONSTRAINT `MINIAPP_BUILD_DETAILS_ibfk_1` FOREIGN KEY (`APP_ID`) REFERENCES `MINIAPP_DETAILS` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MINIAPP_BUILD_DETAILS`
--

LOCK TABLES `MINIAPP_BUILD_DETAILS` WRITE;
/*!40000 ALTER TABLE `MINIAPP_BUILD_DETAILS` DISABLE KEYS */;
INSERT INTO `MINIAPP_BUILD_DETAILS` VALUES (1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `MINIAPP_BUILD_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MINIAPP_BUILD_DETAILS_AUD`
--

DROP TABLE IF EXISTS `MINIAPP_BUILD_DETAILS_AUD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MINIAPP_BUILD_DETAILS_AUD` (
  `id` int NOT NULL,
  `REV` int NOT NULL,
  `REVTYPE` tinyint DEFAULT NULL,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `COMPILED_FILE_URL` varchar(255) DEFAULT NULL,
  `CUSTOMER_ID` int DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `SOURCE_CODE_PATH` varchar(255) DEFAULT NULL,
  `SOURCE_CODE_URL` varchar(255) DEFAULT NULL,
  `STATUS` enum('NEW','PASS','FAIL') DEFAULT NULL,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  `APP_ID` int DEFAULT NULL,
  PRIMARY KEY (`REV`,`id`),
  CONSTRAINT `FKfcdc2vmh04r7cjemfhklai14y` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MINIAPP_BUILD_DETAILS_AUD`
--

LOCK TABLES `MINIAPP_BUILD_DETAILS_AUD` WRITE;
/*!40000 ALTER TABLE `MINIAPP_BUILD_DETAILS_AUD` DISABLE KEYS */;
INSERT INTO `MINIAPP_BUILD_DETAILS_AUD` VALUES (1,22,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(2,23,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(3,24,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(4,25,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(5,26,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(6,27,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(7,28,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(8,29,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(9,30,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(10,31,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(11,32,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(12,33,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(13,34,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(14,35,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(15,36,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(16,37,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(17,38,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(18,39,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(19,40,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(20,41,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(21,42,0,NULL,NULL,NULL,NULL,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `MINIAPP_BUILD_DETAILS_AUD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MINIAPP_DETAILS`
--

DROP TABLE IF EXISTS `MINIAPP_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MINIAPP_DETAILS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DELETED` tinyint(1) NOT NULL DEFAULT '0',
  `CUSTOMER_ID` int DEFAULT NULL,
  `NAME` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `ICON_URL` varchar(255) DEFAULT NULL,
  `VERSION` varchar(15) DEFAULT NULL,
  `APPLICATION_KEY` varchar(100) NOT NULL,
  `TAGGING` varchar(30) DEFAULT NULL,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKs4ckgdvrfue5pg05952003bk5` (`CREATOR`),
  KEY `FKjs5tb275lkte77ia98hgjp6t` (`LAST_MODIFIER`),
  CONSTRAINT `FKjs5tb275lkte77ia98hgjp6t` FOREIGN KEY (`LAST_MODIFIER`) REFERENCES `User` (`userid_pk`),
  CONSTRAINT `FKs4ckgdvrfue5pg05952003bk5` FOREIGN KEY (`CREATOR`) REFERENCES `User` (`userid_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MINIAPP_DETAILS`
--

LOCK TABLES `MINIAPP_DETAILS` WRITE;
/*!40000 ALTER TABLE `MINIAPP_DETAILS` DISABLE KEYS */;
/*!40000 ALTER TABLE `MINIAPP_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MINIAPP_DETAILS_AUD`
--

DROP TABLE IF EXISTS `MINIAPP_DETAILS_AUD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MINIAPP_DETAILS_AUD` (
  `id` int NOT NULL,
  `REV` int NOT NULL,
  `REVTYPE` tinyint DEFAULT NULL,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `APPLICATION_KEY` varchar(100) DEFAULT NULL,
  `CUSTOMER_ID` int DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ICON_URL` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `tagging` varchar(30) DEFAULT NULL,
  `version` varchar(15) DEFAULT NULL,
  `CREATOR` int DEFAULT NULL,
  `LAST_MODIFIER` int DEFAULT NULL,
  PRIMARY KEY (`REV`,`id`),
  CONSTRAINT `FKfvwesy57s3tnhhrxeltl4p04g` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MINIAPP_DETAILS_AUD`
--

LOCK TABLES `MINIAPP_DETAILS_AUD` WRITE;
/*!40000 ALTER TABLE `MINIAPP_DETAILS_AUD` DISABLE KEYS */;
/*!40000 ALTER TABLE `MINIAPP_DETAILS_AUD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESOURCE_FIELD_AUDIT`
--

DROP TABLE IF EXISTS `RESOURCE_FIELD_AUDIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESOURCE_FIELD_AUDIT` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `CREATOR_FK` int DEFAULT NULL,
  `CREATOR_NAME` varchar(100) DEFAULT NULL,
  `MODIFIER_FK` int DEFAULT NULL,
  `MODIFIER_NAME` varchar(100) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `USER_NAME` varchar(100) DEFAULT NULL,
  `ACTION` varchar(255) DEFAULT NULL,
  `APPLICATION_NAME` varchar(255) DEFAULT NULL,
  `COLUMN_NAME` varchar(255) DEFAULT NULL,
  `ENTITY_ID` varchar(255) DEFAULT NULL,
  `ENTITY_NAME` varchar(255) DEFAULT NULL,
  `ENTITY_TYPE` varchar(255) DEFAULT NULL,
  `FIELD_KEY` varchar(255) DEFAULT NULL,
  `FIELD_TYPE` varchar(255) DEFAULT NULL,
  `IDENTIFIER1` varchar(255) DEFAULT NULL,
  `IDENTIFIER2` varchar(255) DEFAULT NULL,
  `IDENTIFIER3` varchar(255) DEFAULT NULL,
  `IDENTIFIER4` varchar(255) DEFAULT NULL,
  `LABEL` varchar(255) DEFAULT NULL,
  `NEW_VALUE` varchar(255) DEFAULT NULL,
  `OLD_VALUE` varchar(255) DEFAULT NULL,
  `RESOURCE_NAME` varchar(255) DEFAULT NULL,
  `SEQUENCE` varchar(255) DEFAULT NULL,
  `TASK_CODE` varchar(255) DEFAULT NULL,
  `VIEW_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESOURCE_FIELD_AUDIT`
--

LOCK TABLES `RESOURCE_FIELD_AUDIT` WRITE;
/*!40000 ALTER TABLE `RESOURCE_FIELD_AUDIT` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESOURCE_FIELD_AUDIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESOURCE_JSON_AUDIT`
--

DROP TABLE IF EXISTS `RESOURCE_JSON_AUDIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESOURCE_JSON_AUDIT` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CREATED_TIME` datetime(6) DEFAULT NULL,
  `CREATOR_FK` int DEFAULT NULL,
  `CREATOR_NAME` varchar(100) DEFAULT NULL,
  `MODIFIER_FK` int DEFAULT NULL,
  `MODIFIER_NAME` varchar(100) DEFAULT NULL,
  `MODIFIED_TIME` datetime(6) DEFAULT NULL,
  `USER_NAME` varchar(100) DEFAULT NULL,
  `ACTION_TYPE` varchar(255) DEFAULT NULL,
  `CONTEXT_JSON` varchar(255) DEFAULT NULL,
  `PROCESS` bit(1) DEFAULT NULL,
  `VIEW_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESOURCE_JSON_AUDIT`
--

LOCK TABLES `RESOURCE_JSON_AUDIT` WRITE;
/*!40000 ALTER TABLE `RESOURCE_JSON_AUDIT` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESOURCE_JSON_AUDIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVINFO`
--

DROP TABLE IF EXISTS `REVINFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVINFO` (
  `REV` int NOT NULL AUTO_INCREMENT,
  `REVTSTMP` bigint DEFAULT NULL,
  PRIMARY KEY (`REV`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVINFO`
--

LOCK TABLES `REVINFO` WRITE;
/*!40000 ALTER TABLE `REVINFO` DISABLE KEYS */;
INSERT INTO `REVINFO` VALUES (1,1718609838794),(2,1718609839077),(3,1718609839568),(4,1718609840139),(5,1718609840701),(6,1718609841391),(7,1718609841847),(8,1718609842347),(9,1718609842956),(10,1718609843155),(11,1718609843775),(12,1718609844380),(13,1718609845025),(14,1718609845405),(15,1718609846010),(16,1718609846679),(17,1718609847149),(18,1718609847590),(19,1718609848158),(20,1718609848170),(21,1718609848193),(22,1718609848224),(23,1718609848229),(24,1718609848233),(25,1718609848237),(26,1718609848240),(27,1718609848244),(28,1718609848247),(29,1718609848249),(30,1718609848252),(31,1718609848255),(32,1718609848258),(33,1718609848260),(34,1718609848263),(35,1718609848265),(36,1718609848268),(37,1718609848271),(38,1718609848276),(39,1718609848281),(40,1718609848283),(41,1718609848286),(42,1718609848300);
/*!40000 ALTER TABLE `REVINFO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `userid_pk` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`userid_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_AUD`
--

DROP TABLE IF EXISTS `User_AUD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_AUD` (
  `userid_pk` int NOT NULL,
  `REV` int NOT NULL,
  `REVTYPE` tinyint DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`REV`,`userid_pk`),
  CONSTRAINT `FKilft2rdosb65jocpcoan7xnjq` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_AUD`
--

LOCK TABLES `User_AUD` WRITE;
/*!40000 ALTER TABLE `User_AUD` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_AUD` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-17 13:08:42
