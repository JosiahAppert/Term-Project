-- ------------------------------------------------------------------------------------
-- DDL.sql
-- Citations for the following code:
--    Adapted from the following sources:
--    1. Exploration - MySQL Cascade
--       Date: October 30, 2025
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-mysql-
--          cascade
--    2. Bulk Data Loading for InnoDB Tables
--       Date: October 30, 2025
--       https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-
--          loading.html
--    3. Exploration - Creating ER Diagram MySQL Workbench
--       Date: October 10, 2025
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-creating-
--          er-diagram-mysql-workbench
--    4. Exploration: PL/SQL Quick Start Guide
--       Date: November 12, 2025
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-
--          quick-start-guide?module_item_id=25842917
--    5. Exploration: PL/SQL part 1, SP, View and Function
--       Date: November 12, 2025
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-
--          part-1-sp-view-and-function?module_item_id=25645140
-- ------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_load_teamdb;
DELIMITER //
CREATE PROCEDURE sp_load_teamdb()
BEGIN
  SET FOREIGN_KEY_CHECKS=0;
  -- -----------------------------------------------------
  -- Table `PlayerEvents`
  -- -----------------------------------------------------
  DROP TABLE IF EXISTS `PlayerEvents`;
  CREATE TABLE IF NOT EXISTS `PlayerEvents` (
    `eventID` INT NOT NULL,
    `playerID` INT NOT NULL,
    `inningsPlayed` INT,
    `salaryPaid` INT,
    PRIMARY KEY (`eventID`, `playerID`),
    CONSTRAINT `fk_pe_event` FOREIGN KEY (`eventID`)
      REFERENCES `Events`(`eventID`)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT `fk_pe_player` FOREIGN KEY (`playerID`)
      REFERENCES `Players`(`playerID`)
      ON UPDATE CASCADE
      ON DELETE CASCADE
  ) ENGINE = InnoDB;
  -- Insert data into PlayerEvents table
  INSERT INTO `PlayerEvents` (`eventID`, `playerID`, `inningsPlayed`, `salaryPaid`)
  VALUES
  (1, 1, 6, 50000),
  (1, 2, 6, 55000),
  (2, 3, 7, 70000),
  (3, 4, 8, 80000),
  (3, 5, 8, 85000);
  -- -----------------------------------------------------
  -- Table `Tickets`
  -- -----------------------------------------------------
  DROP TABLE IF EXISTS `Tickets`;
  CREATE TABLE IF NOT EXISTS `Tickets` (
    `ticketID` INT AUTO_INCREMENT PRIMARY KEY,
    `eventID` INT NOT NULL,
    `price` DECIMAL(8,2) NOT NULL,
    `ticketHolderID` INT,
    `seatNumber` VARCHAR(5) NOT NULL,
    CONSTRAINT `uq_event_seat` UNIQUE (`eventID`, `seatNumber`),
    CONSTRAINT `fk_tickets_event` FOREIGN KEY (`eventID`)
      REFERENCES `Events`(`eventID`)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT `fk_tickets_holder` FOREIGN KEY (`ticketHolderID`)
      REFERENCES `TicketHolders`(`ticketHolderID`)
      ON UPDATE CASCADE
      ON DELETE SET NULL
  ) ENGINE = InnoDB AUTO_INCREMENT = 27;
  -- Insert data into Tickets table
  INSERT INTO `Tickets` (`eventID`, `price`, `ticketHolderID`, `seatNumber`) VALUES
  (1, 120.00, 1, 'A12'),
  (1, 95.00, 2, 'A13'),
  (2, 150.00, 1, 'B27'),
  (3, 110.00, 3, 'C9'),
  (3, 110.00, 4, 'C10');
  -- -----------------------------------------------------
  -- Table `Players`
  -- -----------------------------------------------------
  DROP TABLE IF EXISTS `Players`;
  CREATE TABLE IF NOT EXISTS `Players` (
    `playerID` INT AUTO_INCREMENT PRIMARY KEY,
    `fName` VARCHAR(50) NOT NULL,
    `lName` VARCHAR(50) NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `salary` INT NOT NULL
  ) ENGINE = InnoDB;
  -- Insert data into Players table
  INSERT INTO `Players` (`fName`, `lName`, `position`, `salary`) VALUES
  ('Marcus', 'Jones', 'Pitcher', 1250000),
  ('Julio', 'Romero', 'First Base', 800000),
  ('Jordan', 'Lee', 'Catcher', 750000),
  ('Caleb', 'Michaelson', 'Pitcher', 1000000),
  ('Ryan', 'Howard', 'Shortstop', 900000);
  -- -----------------------------------------------------
  -- Table `TicketHolders`
  -- -----------------------------------------------------
  DROP TABLE IF EXISTS `TicketHolders`;
  CREATE TABLE IF NOT EXISTS `TicketHolders` (
    `ticketHolderID` INT AUTO_INCREMENT PRIMARY KEY,
    `fName` VARCHAR(50) NOT NULL,
    `lName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(20)
  ) ENGINE = InnoDB;
  -- Insert data into TicketHolders table
  INSERT INTO `TicketHolders` (`fName`, `lName`, `email`, `phone`)
  VALUES
  ('John', 'Doe', 'johnDoe@gmail.com', '555-555-5555'),
  ('Alice', 'Carter', 'aliceCarter@gmail.com', '555-555-5556'),
  ('Matt', 'Johnson', 'mattJohnson@gmail.com', '555-555-5557'),
  ('Amanda', 'James', 'amandaJames@gmail.com', '555-555-5558');
  -- -----------------------------------------------------
  -- Table `Events`
  -- -----------------------------------------------------
  DROP TABLE IF EXISTS `Events`;
  CREATE TABLE IF NOT EXISTS `Events` (
    `eventID` INT AUTO_INCREMENT PRIMARY KEY,
    `visitingTeam` VARCHAR(50) NOT NULL,
    `eventStart` DATETIME NOT NULL
  ) ENGINE = InnoDB;
  -- Insert data into Events table
  INSERT INTO `Events` (`visitingTeam`, `eventStart`) VALUES
  ('Seattle Mariners', '2024-05-12 19:00:00'),
  ('San Diego Padres', '2024-06-19 19:10:00'),
  ('Chicago Cubs', '2024-09-04 18:00:00'),
  ('New York Mets', '2025-03-30 19:30:00'),
  ('Toronto Blue Jays', '2025-05-15 19:00:00');
  SET FOREIGN_KEY_CHECKS=1;
END //
DELIMITER ;
-- Use the following statement to call SP to load the movies database.
-- This will reset the schema back to the original state.
-- CALL sp_load_teamdb();

/* Citations */
-- No citations were used in this file.