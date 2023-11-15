-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: coffee_db
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `coffee`
--

DROP TABLE IF EXISTS `coffee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coffee` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_percentage` int(11) DEFAULT NULL,
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `new_price` float DEFAULT NULL,
  `old_price` float DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `r_аvailability` int(11) DEFAULT NULL,
  `rating_sum` int(11) DEFAULT NULL,
  `times_rated` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `аvailability` int(11) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL,
  `img4` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coffee`
--

LOCK TABLES `coffee` WRITE;
/*!40000 ALTER TABLE `coffee` DISABLE KEYS */;
INSERT INTO `coffee` VALUES (13,'Кафето illy Espresso Medium Roast е направено от висък квалитет сорт 100% Арабика. Това кафе е с хармоничен вкус, аромат и плътност. Индивидуална паковка от 131 г',0,'https://i.ibb.co/b77N06f/illy-cialda-classico-550x688h.jpg','https://i.ibb.co/K7HHpkk/illy-ese-pods-medium-roast-200.jpg',0,'illy®- E.S.E. Classico',12.99,15,'131g',35,204,57,1,100,'https://www.illy.com/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dw395b4b8e/products/Coffee/Coffee-ESE-Pods/9976_coffee_ese-pods_classico-lungo-roast/2020_ESE_18-PODS-CLASSICO-LUNGO-FRONT-WITH-SACHET_HD.png','https://e-horeca.mk/wp-content/uploads/2020/05/illy-coffee-beans.png'),(24,'Само за истински любители на еспресо',0,'https://coffee.bg/image/cache/catalog/illy%20cialda%20intenso-550x688h.jpg','https://www.mycoffeeshop.com.au/WebRoot/ecshared01/Shops/mycoffeeshop/5BEC/D269/3E6E/F4ED/08AD/AC10/0043/031B/illy-ese-pods-intenso-dark-roast-18.jpg',0,'illy®- E.S.E. Intenso',15.99,17,'131g',7,83,23,1,29,'https://www.illy.com/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dw331d3b65/products/Coffee/Coffee-ESE-Pods/7999_coffee_ese-pods_intenso-roast/2020_ESE_18-PODS-INTENSO-FRONT-WITH-POD_HD.png','https://e-horeca.mk/wp-content/uploads/2020/05/illy-intenso.png'),(25,'След първия опит на това кафе, желанието остава завинаги',0,'https://coffee.bg/image/cache/catalog/dek-ese-illy_LI-550x688h.jpg','https://www.illy.com/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dw034849b6/products/Coffee/Coffee-ESE-Pods/7997_coffee_ese-pods_decaf/7759ST_2020_ESE_18-PODS-DECAF-FRONT-WITH-SACHET_HD.png',0,'illy® E.S.E. DEK',16.99,19,'131g',0,3,1,1,100,'https://www.illy.com/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dw2282bc73/products/Coffee/Coffee-ESE-Pods/7997_coffee_ese-pods_decaf/7759ST_2020_ESE_18-PODS-DECAF-FRONT_HD.png','https://e-horeca.mk/wp-content/uploads/2021/01/illy-decaf-meleno-kafe.jpg'),(26,'Кафе което се познава след първата глътка',0,'https://coffee.bg/image/cache/catalog/forte-550x688h.jpg','https://www.carrefour.it/on/demandware.static/-/Sites-carrefour-master-catalog-IT/default/dw1dda3bfa/large/CREMAGUSTOGFORTEX2LAVAZZA-8000070038424-1.png',0,'Lavazza Crema e Gusto',18.99,20,'405g',6,24,6,0,305,'https://e-horeca.mk/wp-content/uploads/2021/06/lavazza-cream-e-gusto-forte.gif','https://www.gedap.it/wp-content/uploads/2020/05/gedap-espresso-crema-e-gusto-forte-lavazza-firma-capsula.jpg'),(27,'Едно од най-хубавите кафета на света',0,'https://italiashop.bg/image/cache/catalog/2020/12.2020/1971-746x746.jpg','https://m.media-amazon.com/images/I/71kCVJCbvDL._AC_SX679_.jpg',0,'Lavazza Oro Altura',24.9,30,'90g',6,13,4,0,16,'https://content.dambros.it/uploads/2019/09/12142913/0000202168.jpg','https://www.parmaaffari.it/gestlab/products/1017/big_Schermata%202019-10-20%20alle%2010.55.17.png'),(31,'Само за истинските любители на кафе',0,'https://drinklink.bg/media/catalog/product/cache/0cc767f59c27dbeed5e68c3e8381e2b6/image/4700f3bc/lavazza-amm-divino-kapsula-arabika-i-robusta.jpg','https://m.media-amazon.com/images/I/71pKu1XBzRL._AC_SL1500_.jpg',0,'Lavazza Divino',17.49,19.6,'90g',11,36,10,0,19,'https://m.media-amazon.com/images/I/81esriRbKRL._AC_SL1500_.jpg','https://m.media-amazon.com/images/I/7113gSB1K9L._AC_SL1500_.jpg'),(32,'Кафето е култура. С този вид може да деня да стане по-хубав.',0,'https://coffee.bg/image/cache/catalog/VergnanoCremosoDolceGusto-550x688h.jpg','https://espressimo.bg/image/cache/catalog/Caffe%20Vergnano/vergnano-lavazza-blue-arabica-400x400.jpg',0,'Dolce Gusto Cremoso',7.95,10,'130g',0,14,3,0,31,'https://www.italian-coffee.biz/media/catalog/product/cache/1/image/x400/602f0fa2c1f0d1ba5e241f914e856ff9/c/r/cremoso-12-capsule-caffe-vergnano-compatibili-nescafe-dolce-gusto.jpg','https://www.cialdeweb.it/wp-content/uploads/2020/10/products-dolcegusto-pack-cremoso-600x600.jpg'),(33,'Истинско кафе, за истински хора',0,'https://coffee.bg/image/cache/catalog/VergnanoIntensoDolceGusto-550x688h.jpg','https://d31xv78q8gnfco.cloudfront.net/media/image_clips/5923faec9f9a4fdbad000d41/original.jpg',0,'Dolce Gusto Intenso',6.99,13,'131g',13,21,5,0,31,'https://www.italian-coffee.biz/media/catalog/product/cache/1/image/x400/602f0fa2c1f0d1ba5e241f914e856ff9/i/n/intenso-12-capsule-caffe-vergnano-compatibili-nescafe-dolce-gusto.jpg','https://kapsuli.mk/wp-content/uploads/2021/06/Vergnano_DG_Intenso_12-2.jpg'),(34,'Оригинал кафе оt Наполи, Италија',0,'https://coffee.bg/image/cache/catalog/VergnanoNapoliDolceGusto-550x688h.jpg','https://d31xv78q8gnfco.cloudfront.net/media/image_clips/5923faec9f9a4fdbad000d41/original.jpg',0,'Dolce Gusto Napoli',5.55,7.5,'150g',0,7,2,0,30,'https://www.italian-coffee.biz/media/catalog/product/cache/1/image/x400/602f0fa2c1f0d1ba5e241f914e856ff9/n/a/napoli-12-capsule-caffe-vergnano-compatibili-nescafe-dolce-gusto.jpg','https://www.capsuleandcoffee.com/wp-content/uploads/2020/04/2espressonapoli_2.jpg');
/*!40000 ALTER TABLE `coffee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `coffee_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8omq0tc18jd43bu5tjh6jvraq` (`user_id`),
  KEY `FKbmylco3yce1lrlnnmiw36qg52` (`coffee_id`),
  CONSTRAINT `FK8omq0tc18jd43bu5tjh6jvraq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKbmylco3yce1lrlnnmiw36qg52` FOREIGN KEY (`coffee_id`) REFERENCES `coffee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (280,'2021-12-31 20:52:22',0,'dasdasqew',24,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(281,'2021-12-31 20:57:29',0,'ewqewq',24,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(282,'2021-12-31 20:57:35',0,'adssadadsqew',13,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(293,'2022-01-09 06:03:48',1,'dadsa',25,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(433,'2022-01-20 16:45:42',0,'my comment',25,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(438,'2022-01-24 03:32:46',0,'дсадсадс',26,'190b19cc-f592-40e1-b67a-5d41e5536e90'),(446,'2022-01-24 06:14:20',1,'Това кафе е наистина много хубаво!',31,'190b19cc-f592-40e1-b67a-5d41e5536e90');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (452),(452);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` varchar(255) NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe4guax66lb963pf27kvm7ikik` (`comment_id`),
  KEY `FKnvx9seeqqyy71bij291pwiwrg` (`user_id`),
  CONSTRAINT `FKe4guax66lb963pf27kvm7ikik` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKnvx9seeqqyy71bij291pwiwrg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('9597fb9c-2280-4ae2-bec8-f80dd1f6bd06',293,'190b19cc-f592-40e1-b67a-5d41e5536e90'),('a2b4ddba-8121-403a-b208-7324812d9255',446,'32ba2ef8-7421-4247-9e29-f4b540e60f5a');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `operation` varchar(255) DEFAULT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES ('57d3b71f-480e-4fd2-a920-bab818e8a152','25/01/2022 22:00:36','Delete','Users','peco'),('af1661db-0048-4115-8c24-e887b5cb66df','25/01/2022 22:00:30','Delete','Users','peco'),('c8bda05f-d8d2-4d56-993a-324ad34efc95','25/01/2022 22:00:39','Delete','Users','peco'),('e4051a30-9cdd-4b95-9f20-939b4d86e956','25/01/2022 22:00:43','Delete','Users','peco');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `delivered` bit(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `coffee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdawlxx8ys7ddlfnb2ynpsveqv` (`coffee_id`),
  CONSTRAINT `FKdawlxx8ys7ddlfnb2ynpsveqv` FOREIGN KEY (`coffee_id`) REFERENCES `coffee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (108,'Tsarigradsko shose','Sofia',_binary '','222@g','ddqwd','0988234987',2,26),(287,'Tsarigradsko shose','Sofia',_binary '','eqw@g','Dimitar Avramov','0988234987',2,24),(288,'Tsarigradsko shose','Sofia',_binary '','eqw@g','Dimitar Avramov','0988234987',2,24),(289,'Petro prlickov','Kavadarci',_binary '\0','dam@gmai.com','Risto Najdov','09782231',2,24),(290,'Petre prlicko','Negotino',_binary '','km@gmail.com','Petko peter','093282828',1,13),(291,'Peter k k q ','Marena',_binary '','d2mm@gmail.com','risto risticko ','092133455',1,13),(292,'kobb@gmail.com','Gostivar',_binary '\0','ddqq@gmail.com','Mona monik','09853821',1,13),(294,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',17,26),(295,'Tsarigradsko shose','Sofia',_binary '\0','dam@gmai.com','Dimitar Avramov','0988234987',2,24),(296,'Tsarigradsko shose','Sofia',_binary '\0','dimi2@gmail.com','dwqdwqdwqqwd','0988234987',1,13),(297,'Tsarigradsko shose','Sofia',_binary '\0','dimi2@gmail.com','dwqdwqdwqqwd','0988234987',1,13),(298,'Tsarigradsko shose','Sofia',_binary '\0','km@gmail.com','zxfhhjhhhh','0988234987',1,13),(299,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,24),(300,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',1,13),(301,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',1,13),(302,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,27),(303,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,27),(304,'Tsarigradsko shose','Sofia',_binary '\0','ff@g','Dimitar Avramov','0988234987',1,24),(305,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,27),(306,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,27),(307,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,27),(308,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,34),(309,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,34),(310,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,34),(311,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,31),(312,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,31),(313,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,31),(314,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,27),(315,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,27),(316,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,32),(317,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,32),(318,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,32),(319,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,32),(320,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,32),(321,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,32),(322,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(323,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(324,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(325,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(326,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(327,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(328,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(329,'peco bika','Tirana',_binary '\0','davramov@yahoo.com','petko ramadanov','2654987',1,32),(330,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,33),(331,'Tsarigradsko shose','Sofia',_binary '\0','intervju57@gmail.com','rewq','0988234987',1,25),(332,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,25),(333,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,25),(334,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(335,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(336,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(337,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(338,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(339,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(340,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(341,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(342,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(343,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(344,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(345,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(346,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(347,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',1,25),(348,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,25),(349,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(350,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,25),(351,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,25),(352,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,25),(353,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,25),(354,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,33),(355,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,33),(356,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,33),(357,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',2,33),(358,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',2,33),(359,'Tsarigradsko shose','Sofia',_binary '\0','davramo1@visteon.com','Dimitar Avramov','0988234987',2,33),(360,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,33),(361,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,31),(362,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(363,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(364,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(365,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(366,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(367,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(368,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(369,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(370,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(371,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(372,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,34),(373,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,31),(374,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,33),(375,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(376,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(377,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(378,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(379,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(380,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(381,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(382,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,31),(383,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,34),(384,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,34),(385,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(386,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(387,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(388,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(389,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(390,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(391,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(392,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(393,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(394,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(395,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(396,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(398,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(399,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(400,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(401,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(402,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(405,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(406,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(407,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(408,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(409,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(410,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(411,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(413,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(414,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(415,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(416,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(417,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(418,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(419,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(420,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(421,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(422,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(423,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(424,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(425,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(426,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(427,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(428,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(429,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(430,'Tsarigradsko shose','Sofia',_binary '\0','ristanka@gmail.com','Dimitar Avramov','0988234987',1,13),(431,'Tsarigradsko shose','Sofia',_binary '\0','davramov@yahoo.com','Dimitar Avramov','0988234987',1,13),(432,'Tsarigradsko shose','Sofia',_binary '\0','r@gmail.com','Dimitar Avramov','0988234987',1,13),(434,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,13),(435,'Tsarigradsko shose','Sofia',_binary '\0','david@visteon.com','Dimitar Avramov','0988234987',1,13),(436,'Tsarigradsko shose','Sofia',_binary '\0','d@gmail.com','Dimitar Avramov','0988234987',1,13),(447,'Mladost 2','Sofia',_binary '\0','petar.bunev@gmail.com','Petar','0988234987',3,24),(448,'Mladost 2','Sofia',_binary '\0','petar.bunev@gmail.com','Petar','0988234987',3,24),(449,'Mladost 2','Sofia',_binary '\0','petar.bunev@gmail.com','Petar','0988234987',1,24),(450,'Tsarigradsko shose','Sofia',_binary '\0','dimitar@gmail.com','Dimitar Avramov','0988234987',1,26),(451,'Tsarigradsko shose','Sofia',_binary '\0','dimitar@gmail.com','Dimitar Avramov','0988234987',3,26);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_order`
--

DROP TABLE IF EXISTS `saved_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_order` (
  `id` varchar(255) NOT NULL,
  `coffee_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb58qusdyd4i8j04fikjej7126` (`user_id`),
  KEY `FKriewgs68jo5q9a17k80vp1hvg` (`coffee_id`),
  CONSTRAINT `FKb58qusdyd4i8j04fikjej7126` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKriewgs68jo5q9a17k80vp1hvg` FOREIGN KEY (`coffee_id`) REFERENCES `coffee` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_order`
--

LOCK TABLES `saved_order` WRITE;
/*!40000 ALTER TABLE `saved_order` DISABLE KEYS */;
INSERT INTO `saved_order` VALUES ('19f56247-8055-4d6a-99ba-2de3eb127f48',24,'8caea316-9cf6-4c8d-9ed3-a8260d1686c4',0),('4a35d2bf-af6b-4ca3-8503-b148edb6cb5f',31,'32ba2ef8-7421-4247-9e29-f4b540e60f5a',2),('648628ed-22ce-4675-841a-ce4861f7fb93',24,'ff306784-c5a3-436b-857b-8ac97f2dedae',0),('67d85c0e-de7a-414c-afd8-3ce086d7ae8d',33,'32ba2ef8-7421-4247-9e29-f4b540e60f5a',1),('9f5fd9cd-2f31-411c-aca5-f5c25ee80f38',24,'190b19cc-f592-40e1-b67a-5d41e5536e90',0),('b4e79ac9-6e54-4177-ac82-f9ceba97fe15',24,'32ba2ef8-7421-4247-9e29-f4b540e60f5a',4),('b8a8eecf-af2c-4481-871c-afa894dfde06',24,'8caea316-9cf6-4c8d-9ed3-a8260d1686c4',0),('bdb7c575-b4e5-434b-8b62-c455e4231449',13,'190b19cc-f592-40e1-b67a-5d41e5536e90',6),('dc54fd2a-2c87-427b-a68c-171f5d4a3ade',24,'8caea316-9cf6-4c8d-9ed3-a8260d1686c4',0),('e19dd3d3-934f-4a98-9392-20d7b2241a16',24,'8caea316-9cf6-4c8d-9ed3-a8260d1686c4',0);
/*!40000 ALTER TABLE `saved_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` varchar(255) NOT NULL,
  `authority` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('52b0e028-b34d-4bfa-a2a5-7c821ad95f5f','ADMIN'),('560020e7-b12e-4ffd-ab30-8c6a7442ec81','MODERATOR'),('5617ace3-1179-46b6-be13-746c3d8bdcbe','ROOT-ADMIN'),('a95789c2-d2a5-40fc-935a-bb4016f6f538','ROLE_USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `account_non_expired` bit(1) NOT NULL,
  `account_non_locked` bit(1) NOT NULL,
  `birth_date` datetime DEFAULT NULL,
  `credentials_non_expired` bit(1) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('00301548-6534-44e3-bebb-fe4bafd82422',_binary '',_binary '','2022-01-02 01:00:00',_binary '','davramov@yahoo.com',_binary '','Dimitar','Avramov','$2a$10$COCUSYgT18uiJDlz8Lkt..bMjTVfL9DH/o.IJgc3Im6TJ75WXlh6S','tijana',NULL),('190b19cc-f592-40e1-b67a-5d41e5536e90',_binary '',_binary '','2021-10-31 23:00:00',_binary '','davramov@yahoo.com',_binary '','Dimitar','Avramov','$2a$10$PHmpFX5poGMHAVSPSGss0OAEIVEBuzzl02EO.qPA7DME7ub4FPK6e','dimitaravramov','https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png'),('32ba2ef8-7421-4247-9e29-f4b540e60f5a',_binary '',_binary '','1997-01-11 01:00:00',_binary '','petar.gonev@gmail.com',_binary '','Petar','Gonev','$2a$10$cVkzLmyPq72CYAXMqt6Er.QjogwR1WNnPLNz6F5hBm/wpGvVyYate','petar','https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png'),('8caea316-9cf6-4c8d-9ed3-a8260d1686c4',_binary '',_binary '','2021-12-23 00:00:00',_binary '','davramov@yahoo.com',_binary '','Dimitar','Avramov','$2a$10$iCuSrk/CC3mYOmWLXLogeO2a..2x5t2DWJOJnWoN8ZyNitDtAmshS','Dimitar Avramov',NULL),('b8887db4-3acd-41a7-9968-3644989c6a8b',_binary '',_binary '','1998-08-25 01:00:00',_binary '','gggeorgi@gmail.com',_binary '','Georgi','Lazov','$2a$10$y06GP1SZXwvfiS40BK0/8O8BkNFD74OaVuUmhFsOYizsp/5xvtKiO','georgi.g',NULL),('e1e9468a-d8e7-4079-9825-54445db0d893',_binary '',_binary '','2021-12-30 00:00:00',_binary '','davramov@yahoo.com',_binary '','Dimitar','Avramov','$2a$10$pUizLPnbqsfTCzDrY4jKou1YfcQAfwsDq7Nru3.AImsD52Cr11Gg6','petko',NULL),('ff306784-c5a3-436b-857b-8ac97f2dedae',_binary '',_binary '','2021-12-21 00:00:00',_binary '','davramov@yahoo.com',_binary '','Dimitar','Avramov','$2a$10$qU9tBhW0OKynDKQp99eC7O1rInAgpnsImurVoX3UbAwDWRuGPSSm6','peco','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VdjdnMqVgiA2TZQjmEXEoCSdyih_XBUkMQ&usqp=CAU');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` varchar(255) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKfivrl5i32jkvd1w39y4h2vn90` (`role_id`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfivrl5i32jkvd1w39y4h2vn90` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES ('190b19cc-f592-40e1-b67a-5d41e5536e90','52b0e028-b34d-4bfa-a2a5-7c821ad95f5f'),('32ba2ef8-7421-4247-9e29-f4b540e60f5a','52b0e028-b34d-4bfa-a2a5-7c821ad95f5f'),('8caea316-9cf6-4c8d-9ed3-a8260d1686c4','52b0e028-b34d-4bfa-a2a5-7c821ad95f5f'),('ff306784-c5a3-436b-857b-8ac97f2dedae','52b0e028-b34d-4bfa-a2a5-7c821ad95f5f'),('190b19cc-f592-40e1-b67a-5d41e5536e90','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('32ba2ef8-7421-4247-9e29-f4b540e60f5a','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('8caea316-9cf6-4c8d-9ed3-a8260d1686c4','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('b8887db4-3acd-41a7-9968-3644989c6a8b','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('e1e9468a-d8e7-4079-9825-54445db0d893','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('ff306784-c5a3-436b-857b-8ac97f2dedae','560020e7-b12e-4ffd-ab30-8c6a7442ec81'),('190b19cc-f592-40e1-b67a-5d41e5536e90','5617ace3-1179-46b6-be13-746c3d8bdcbe'),('00301548-6534-44e3-bebb-fe4bafd82422','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('190b19cc-f592-40e1-b67a-5d41e5536e90','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('32ba2ef8-7421-4247-9e29-f4b540e60f5a','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('8caea316-9cf6-4c8d-9ed3-a8260d1686c4','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('b8887db4-3acd-41a7-9968-3644989c6a8b','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('e1e9468a-d8e7-4079-9825-54445db0d893','a95789c2-d2a5-40fc-935a-bb4016f6f538'),('ff306784-c5a3-436b-857b-8ac97f2dedae','a95789c2-d2a5-40fc-935a-bb4016f6f538');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-26  1:20:09
