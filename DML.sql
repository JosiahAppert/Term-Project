-- ------------------------------------------------------------------------------------
-- DML.sql
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
-- ------------------------------------------------------------------------------------

-- CREATE Events
INSERT INTO Events (visitingTeam, eventStart) 
VALUES (e_visitingTeam, e_eventStart);

-- CREATE Players
INSERT INTO Players (fName, lName, position, salary) 
VALUES (e_fName, e_lName, e_position, e_salary);

-- CREATE TicketHolders
INSERT INTO TicketHolders (fName, lName, email, phone) 
VALUES (e_fName, e_lName, e_email, e_phone);

-- CREATE PlayerEvents
INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid) 
VALUES (e_eventID, e_playerID, e_inningsPlayed, e_salaryPaid);

-- CREATE Tickets
INSERT INTO Tickets (eventID, price, ticketHolderID, seatNumber) 
VALUES (e_eventID, e_price, e_ticketHolderID, e_seatNumber);

-- UPDATE Events
UPDATE Events SET visitingTeam = e_visitingTeam, eventStart = e_eventStart WHERE eventID = e_eventID; 

-- UPDATE Players
UPDATE Players SET fName = e_fName, lName = e_lName, position = e_position, salary = e_salary WHERE playerID = e_playerID; 

-- UPDATE TicketHolders
UPDATE TicketHolders SET fName = e_fName, lName = e_lName, email = e_email, phone = e_phone WHERE ticketHolderID = e_ticketHolderID; 

-- UPDATE PlayerEvents
DECLARE v_innings INT;
DECLARE v_salary INT;

-- Fetch existing data to preserve if NULLs passed
SELECT inningsPlayed, salaryPaid
INTO v_innings, v_salary
FROM PlayerEvents
WHERE eventID = p_eventID AND playerID = p_playerID;

SET v_innings = COALESCE(p_inningsPlayed, v_innings);
SET v_salary  = COALESCE(p_salaryPaid, v_salary);

DELETE FROM PlayerEvents
WHERE eventID = p_eventID AND playerID = p_playerID;

INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid)
VALUES (p_newEventID, p_newPlayerID, v_innings, v_salary);

-- UPDATE Tickets
UPDATE Tickets SET eventID = p_eventID, price = p_price, ticketHolderID = p_ticketHolderID, seatNumber = p_seatNumber WHERE ticketID = p_ticketID;

-- DELETE Events
DELETE FROM Players WHERE playerID = e_playerID;

-- DELETE TicketHolders
DELETE FROM TicketHolders WHERE ticketHolderID = e_ticketHolderID;

-- DELETE PlayerEvents
DELETE FROM PlayerEvents WHERE eventID = e_eventID AND playerID = e_playerID;

-- DELETE Tickets
DELETE FROM Tickets WHERE ticketID = e_ticketID;