-- ------------------------------------------------------------------------------------
-- PL.sql
-- Citations for the following code:
--    Adapted from the following sources:
--    1. Exploration - MySQL Cascade
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-mysql-
--          cascade
--    2. Bulk Data Loading for InnoDB Tables
--       https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-
--          loading.html
--    3. Exploration - Creating ER Diagram MySQL Workbench
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-creating-
--          er-diagram-mysql-workbench
--    4. Exploration: PL/SQL Quick Start Guide
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-
--          quick-start-guide?module_item_id=25842917
--    5. Exploration: PL/SQL part 1, SP, View and Function
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-
--          part-1-sp-view-and-function?module_item_id=25645140
--    6. Exploration: PL/SQL part 2, Stored Procedures for CUD
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-
--          part-2-stored-procedures-for-cud?module_item_id=25645141
--    7. Exploration - Implementing CUD operations in your app
--       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-
--          cud-operations-in-your-app?module_item_id=25645149
-- ------------------------------------------------------------------------------------
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