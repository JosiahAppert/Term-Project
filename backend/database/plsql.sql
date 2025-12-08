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

-- #############################
-- CREATE Events
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateEvent;

DELIMITER //
CREATE PROCEDURE sp_CreateEvent(
    IN e_visitingTeam VARCHAR(50), 
    IN e_eventStart DATETIME, 
    OUT e_eventID INT)
BEGIN
    INSERT INTO Events (visitingTeam, eventStart) 
    VALUES (e_visitingTeam, e_eventStart);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into e_eventID;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created person:
        -- CALL sp_CreateEvent('Theresa', 'Evans', 2, 48, @new_id);
        -- SELECT @new_id AS 'New Person ID';
END //
DELIMITER ;

-- #############################
-- CREATE Players
-- #############################
DROP PROCEDURE IF EXISTS sp_CreatePlayer;

DELIMITER //
CREATE PROCEDURE sp_CreatePlayer(
    IN e_fName VARCHAR(50), 
    IN e_lName VARCHAR(50),
    IN e_position VARCHAR(50),
    IN e_salary INT,
    OUT e_playerID INT)
BEGIN
    INSERT INTO Players (fName, lName, position, salary) 
    VALUES (e_fName, e_lName, e_position, e_salary);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into e_playerID;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created person:
        -- CALL sp_CreateEvent('Theresa', 'Evans', 2, 48, @new_id);
        -- SELECT @new_id AS 'New Person ID';
END //
DELIMITER ;

-- #############################
-- CREATE TicketHolders
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateTicketHolder;

DELIMITER //
CREATE PROCEDURE sp_CreateTicketHolder(
    IN e_fName VARCHAR(50), 
    IN e_lName VARCHAR(50),
    IN e_email VARCHAR(100),
    IN e_phone VARCHAR(20),
    OUT e_ticketHolderID INT)
BEGIN
    INSERT INTO TicketHolders (fName, lName, email, phone) 
    VALUES (e_fName, e_lName, e_email, e_phone);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() INTO e_ticketHolderID;
    -- Display the ID of the last inserted ticket holder.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created person:
        -- CALL sp_CreateTicketHolder('Theresa', 'Evans', tevans@gmail.com, 5555555555, @new_id);
        -- SELECT @new_id AS 'New TicketHolder ID';
END //
DELIMITER ;

-- #############################
-- CREATE PlayerEvents
-- #############################
DROP PROCEDURE IF EXISTS sp_CreatePlayerEvent;

DELIMITER //
CREATE PROCEDURE sp_CreatePlayerEvent(
    IN e_eventID INT, 
    IN e_playerID INT,
    IN e_inningsPlayed INT,
    IN e_salaryPaid INT,
    OUT e_newID INT)
BEGIN
    INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid) 
    VALUES (e_eventID, e_playerID, e_inningsPlayed, e_salaryPaid);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() INTO e_newID;
    -- Display the ID of the last inserted ticket holder.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created person:
        -- CALL sp_CreatePlayerEvent(1, 2, 7, 120000, @new_id);
        -- SELECT @new_id AS 'New PlayerEvent ID';
END //
DELIMITER ;

-- #############################
-- CREATE Tickets
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateTicket;

DELIMITER //
CREATE PROCEDURE sp_CreateTicket(
    IN e_eventID INT, 
    IN e_price DECIMAL(8,2),
    IN e_ticketHolderID INT,
    IN e_seatNumber VARCHAR(5),
    OUT e_ticketID INT)
BEGIN
    INSERT INTO Tickets (eventID, price, ticketHolderID, seatNumber) 
    VALUES (e_eventID, e_price, e_ticketHolderID, e_seatNumber);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() INTO e_ticketID;
    -- Display the ID of the last inserted ticket holder.
    SELECT LAST_INSERT_ID() AS 'ticket_id';

    -- Example of how to get the ID of the newly created person:
        -- CALL sp_CreateTicket(1, 120.00, 1, 'A12', @new_id);
        -- SELECT @new_id AS 'New Ticket ID';
END //
DELIMITER ;

-- #############################
-- UPDATE Events
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateEvent;

DELIMITER //
CREATE PROCEDURE sp_UpdateEvent(IN e_eventID INT, IN e_visitingTeam VARCHAR(50), IN e_eventStart DATETIME)

BEGIN
    UPDATE Events SET visitingTeam = e_visitingTeam, eventStart = e_eventStart WHERE eventID = e_eventID; 
END //
DELIMITER ;

-- #############################
-- UPDATE Players
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdatePlayer;

DELIMITER //
CREATE PROCEDURE sp_UpdatePlayer(IN e_playerID INT, IN e_fName VARCHAR(50), IN e_lName VARCHAR(50), IN e_position VARCHAR(50), IN e_salary INT)

BEGIN
    UPDATE Players SET fName = e_fName, lName = e_lName, position = e_position, salary = e_salary WHERE playerID = e_playerID; 
END //
DELIMITER ;

-- #############################
-- UPDATE TicketHolders
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateTicketHolder;

DELIMITER //
CREATE PROCEDURE sp_UpdateTicketHolder(IN e_ticketHolderID INT, IN e_fName VARCHAR(50), IN e_lName VARCHAR(50), IN e_email VARCHAR(100), IN e_phone VARCHAR(20))

BEGIN
    UPDATE TicketHolders SET fName = e_fName, lName = e_lName, email = e_email, phone = e_phone WHERE ticketHolderID = e_ticketHolderID; 
END //
DELIMITER ;

-- #############################
-- UPDATE PlayerEvents
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdatePlayerEvent;
DELIMITER //

CREATE PROCEDURE sp_UpdatePlayerEvent (
  IN p_eventID INT,
  IN p_playerID INT,
  IN p_newEventID INT,
  IN p_newPlayerID INT,
  IN p_inningsPlayed INT,
  IN p_salaryPaid INT
)
BEGIN
  DECLARE v_innings INT;
  DECLARE v_salary INT;

  -- Fetch existing data to preserve if NULLs passed
  SELECT inningsPlayed, salaryPaid
    INTO v_innings, v_salary
  FROM PlayerEvents
  WHERE eventID = p_eventID AND playerID = p_playerID;

  SET v_innings = COALESCE(p_inningsPlayed, v_innings);
  SET v_salary  = COALESCE(p_salaryPaid, v_salary);

  START TRANSACTION;
    -- Delete old row
    DELETE FROM PlayerEvents
    WHERE eventID = p_eventID AND playerID = p_playerID;

    -- Insert new row with new key and preserved/updated data
    INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid)
    VALUES (p_newEventID, p_newPlayerID, v_innings, v_salary);
  COMMIT;

  SELECT 1 AS rows_affected, 'Updated' AS message;
END//

DELIMITER ;

-- #############################
-- UPDATE Tickets
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateTicket;
DELIMITER //

CREATE PROCEDURE sp_UpdateTicket (
  IN p_ticketID INT,
  IN p_eventID INT,
  IN p_price DECIMAL(8,2),
  IN p_ticketHolderID INT,
  IN p_seatNumber VARCHAR(5)
)
BEGIN
  UPDATE Tickets SET eventID = p_eventID, price = p_price, ticketHolderID = p_ticketHolderID, seatNumber = p_seatNumber WHERE ticketID = p_ticketID;
END//

DELIMITER ;

-- #############################
-- DELETE Events
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteEvent;

DELIMITER //
CREATE PROCEDURE sp_DeleteEvent(IN e_eventID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Deleting corresponding row from Events table
        DELETE FROM Events WHERE eventID = e_eventID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Events for eventID: ', e_eventID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Players
-- #############################
DROP PROCEDURE IF EXISTS sp_DeletePlayer;

DELIMITER //
CREATE PROCEDURE sp_DeletePlayer(IN e_playerID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Deleting corresponding row from Players table
        DELETE FROM Players WHERE playerID = e_playerID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Players for playerID: ', e_playerID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE TicketHolders
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteTicketHolder;

DELIMITER //
CREATE PROCEDURE sp_DeleteTicketHolder(IN e_ticketHolderID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Deleting corresponding row from TicketHolders table
        DELETE FROM TicketHolders WHERE ticketHolderID = e_ticketHolderID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in TicketHolders for ticketHolderID: ', e_ticketHolderID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE PlayerEvents
-- #############################
DROP PROCEDURE IF EXISTS sp_DeletePlayerEvent;

DELIMITER //
CREATE PROCEDURE sp_DeletePlayerEvent(IN e_eventID INT, IN e_playerID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Deleting corresponding row from PlayerEvents table
        DELETE FROM PlayerEvents WHERE eventID = e_eventID AND playerID = e_playerID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in PlayerEvents for eventID: ', e_eventID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Tickets
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteTicket;

DELIMITER //
CREATE PROCEDURE sp_DeleteTicket(IN e_ticketID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Deleting corresponding row from Tickets table
        DELETE FROM Tickets WHERE ticketID = e_ticketID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Tickets for ticketID: ', e_ticketID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;