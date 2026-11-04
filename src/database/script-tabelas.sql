-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE surftrack;

USE surftrack;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE praia (
    idPraia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2)
);	

CREATE TABLE sessaoSurf (
    idSessao INT PRIMARY KEY AUTO_INCREMENT,
    dataSessao DATE,
    duracaoMinutos INT,
    quantidadeOndas INT,
    tamanhoPrancha DECIMAL(3 , 1 ),
    notasessao INT,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario)
        REFERENCES usuario (id),
    fk_praia INT,
    FOREIGN KEY (fk_praia)
        REFERENCES praia (idPraia)
);





