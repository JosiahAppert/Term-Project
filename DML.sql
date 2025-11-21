-- Step 3 – Data Manipulation Queries
-- Variables are denoted with @variableName (@eventID, @fName)

/* =======EVENTS TABLE======= */

-- INSERT: Add a new event
INSERT INTO Events (visitingTeam, eventStart)
VALUES (@visitingTeam, @eventStart);

-- SELECT: View all events
SELECT eventID, visitingTeam, eventStart
FROM Events
ORDER BY eventStart ASC;

-- SELECT BY ID
SELECT eventID, visitingTeam, eventStart
FROM Events
WHERE eventID = @eventID;

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

-- DELETE: Remove an event
DELETE FROM Events
WHERE eventID = @eventID;

/* ===========TICKETHOLDERS TABLE======= */

-- INSERT: Add a new ticket holder
INSERT INTO TicketHolders (fName, lName, email, phone)
VALUES (@fName, @lName, @email, @phone);

-- SELECT: View all ticket holders
SELECT ticketHolderID, fName, lName, email, phone
FROM TicketHolders
ORDER BY lName, fName;

--  SELECT BY ID
SELECT ticketHolderID, fName, lName, email, phone
FROM TicketHolders
WHERE ticketHolderID = @ticketHolderID;

-- UPDATE: Edit ticket holder information
UPDATE TicketHolders
SET fName = @fName,
    lName = @lName,
    email = @email,
    phone = @phone
WHERE ticketHolderID = @ticketHolderID;

-- DELETE: Remove a ticket holder
DELETE FROM TicketHolders
WHERE ticketHolderID = @ticketHolderID;

/*========PLAYERS TABLE========= */

-- INSERT: Add a new player
INSERT INTO Players (fName, lName, position, salary)
VALUES (@fName, @lName, @position, @salary);

-- SELECT: View all players
SELECT playerID, fName, lName, position, salary
FROM Players
ORDER BY lName, fName;

-- SELECT BY ID
SELECT playerID, fName, lName, position, salary
FROM Players
WHERE playerID = @playerID;

-- UPDATE: Edit player data
UPDATE Players
SET fName = @fName,
    lName = @lName,
    position = @position,
    salary = @salary
WHERE playerID = @playerID;

-- DELETE: Remove a player
DELETE FROM Players
WHERE playerID = @playerID;

/* ==========TICKETS TABLE========== */

-- INSERT: Add a new ticket
INSERT INTO Tickets (eventID, price, ticketHolderID, seatNumber)
VALUES (@eventID, @price, @ticketHolderID, @seatNumber);

--  SELECT: View all tickets with event and holder info
SELECT T.ticketID,
    E.visitingTeam,
    E.eventStart,
    CONCAT(TH.fName, ' ', TH.lName) AS ticketHolder,
    T.price,
    T.seatNumber
FROM Tickets T
JOIN Events E ON T.eventID = E.eventID
LEFT JOIN TicketHolders TH ON T.ticketHolderID = TH.ticketHolderID
ORDER BY E.eventStart ASC;

-- SELECT BY ID
SELECT ticketID, eventID, price, ticketHolderID, seatNumber
FROM Tickets
WHERE ticketID = @ticketID;

-- UPDATE: Modify ticket details
UPDATE Tickets
SET eventID = @eventID,
    price = @price,
    ticketHolderID = @ticketHolderID,
    seatNumber = @seatNumber
WHERE ticketID = @ticketID;

-- DELETE: Remove a ticket
DELETE FROM Tickets
WHERE ticketID = @ticketID;

/* ========PLAYEREVENTS TABLE======= */

-- INSERT: Record a player’s performance in an event
INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid)
VALUES (@eventID, @playerID, @inningsPlayed, @salaryPaid);

-- SELECT: View all player performances (joined with Events and Players)
SELECT PE.eventID,
    E.visitingTeam,
    E.eventStart,
    PE.playerID,
    CONCAT(P.fName, ' ', P.lName) AS playerName,
    P.position,
    PE.inningsPlayed,
    PE.salaryPaid
FROM PlayerEvents PE
JOIN Events E ON PE.eventID = E.eventID
JOIN Players P ON PE.playerID = P.playerID
ORDER BY E.eventStart ASC;

-- SELECT BY EVENT AND PLAYER ID
SELECT eventID, playerID, inningsPlayed, salaryPaid
FROM PlayerEvents
WHERE eventID = @eventID AND playerID = @playerID;

-- UPDATE: Edit performance data
UPDATE PlayerEvents
SET inningsPlayed = @inningsPlayed,
    salaryPaid = @salaryPaid
WHERE eventID = @eventID AND playerID = @playerID;

-- DELETE: Remove a performance record
DELETE FROM PlayerEvents
WHERE eventID = @eventID AND playerID = @playerID;