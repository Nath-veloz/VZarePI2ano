-- MySQL Workbench Synchronization
-- Generated: 2023-12-10 23:51
-- Model: New Model
-- Version: 1.0
-- Project: PIA
-- Author: Nathan

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `tabela_doacoes` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `tabela_doacoes`.`doador` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `tabela_doacoes`.`doacao` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_doador` INT(11) NOT NULL,
  `id_campanha` INT(11) NOT NULL,
  `valor` DECIMAL(7,2) NOT NULL,
  `data_doacao` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_doacao_doador_idx` (`id_doador` ASC),
  INDEX `fk_doacao_campanha_idx` (`id_campanha` ASC),
  CONSTRAINT `fk_doacao_doador`
    FOREIGN KEY (`id_doador`)
    REFERENCES `tabela_doacoes`.`doador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doacao_campanha`
    FOREIGN KEY (`id_campanha`)
    REFERENCES `tabela_doacoes`.`campanha` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `tabela_doacoes`.`campanha` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(450) NOT NULL,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_campanha_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_campanha_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tabela_doacoes`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `tabela_doacoes`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
