create database listaTelefonica;
use listaTelefonica;

CREATE TABLE `numeros` (
 
  `id` int NOT NULL AUTO_INCREMENT, 
  `nome` varchar(25),
  `tel_residencial` varchar(15),
  `tel_celular` varchar(15),
  `email` varchar(40),
  `rede_social` varchar(20),
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `numeros` VALUES (1,'otavio','3432661512','34998709248','otaviofaria30@gmail.com','faria.otavio');


select * from numeros