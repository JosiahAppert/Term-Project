SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

DROP TABLE IF EXISTS PlayerEvents;
DROP TABLE IF EXISTS Tickets;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS TicketHolders;
DROP TABLE IF EXISTS Events;

-- Table: Events
CREATE TABLE Events (
  eventID INT AUTO_INCREMENT PRIMARY KEY,
  visitingTeam VARCHAR(50) NOT NULL,
  eventStart DATETIME NOT NULL
) ENGINE=InnoDB;

-- Table: TicketHolders
CREATE TABLE TicketHolders (
  ticketHolderID INT AUTO_INCREMENT PRIMARY KEY,
  fName VARCHAR(50) NOT NULL,
  lName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20)
) ENGINE=InnoDB;

-- Table: Players
CREATE TABLE Players (
  playerID INT AUTO_INCREMENT PRIMARY KEY,
  fName VARCHAR(50) NOT NULL,
  lName VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL,
  salary INT NOT NULL
) ENGINE=InnoDB;

-- Table: Tickets
CREATE TABLE Tickets (
  ticketID INT AUTO_INCREMENT PRIMARY KEY,
  eventID INT NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  ticketHolderID INT,
  seatNumber VARCHAR(5) NOT NULL,
  CONSTRAINT uq_event_seat UNIQUE (eventID, seatNumber),
  CONSTRAINT fk_tickets_event FOREIGN KEY (eventID)
      REFERENCES Events(eventID)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT fk_tickets_holder FOREIGN KEY (ticketHolderID)
      REFERENCES TicketHolders(ticketHolderID)
      ON UPDATE CASCADE
      ON DELETE SET NULL
) ENGINE=InnoDB;

-- Table: PlayerEvents
CREATE TABLE PlayerEvents (
  eventID INT NOT NULL,
  playerID INT NOT NULL,
  inningsPlayed INT,
  salaryPaid INT,
  PRIMARY KEY (eventID, playerID),
  CONSTRAINT fk_pe_event FOREIGN KEY (eventID)
      REFERENCES Events(eventID)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT fk_pe_player FOREIGN KEY (playerID)
      REFERENCES Players(playerID)
      ON UPDATE CASCADE
      ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insert Example Data
-- Events
INSERT INTO Events (visitingTeam, eventStart) VALUES
('Seattle Mariners', '2024-05-12 19:00:00'),
('San Diego Padres', '2024-06-19 19:10:00'),
('Chicago Cubs', '2024-09-04 18:00:00'),
('New York Mets', '2025-03-30 19:30:00'),
('Toronto Blue Jays', '2025-05-15 19:00:00');

-- ---------- TicketHolders ----------
INSERT INTO TicketHolders (fName, lName, email, phone) VALUES
('John', 'Doe', 'johnDoe@gmail.com', '555-555-5555'),
('Alice', 'Carter', 'aliceCarter@gmail.com', '555-555-5556'),
('Matt', 'Johnson', 'mattJohnson@gmail.com', '555-555-5557'),
('Amanda', 'James', 'amandaJames@gmail.com', '555-555-5558');

-- ---------- Players ----------
INSERT INTO Players (fName, lName, position, salary) VALUES
('Marcus', 'Jones', 'Pitcher', 1250000),
('Julio', 'Romero', 'First Base', 800000),
('Jordan', 'Lee', 'Catcher', 750000),
('Caleb', 'Michaelson', 'Pitcher', 1000000),
('Ryan', 'Howard', 'Shortstop', 900000);

-- ---------- Tickets ----------
INSERT INTO Tickets (eventID, price, ticketHolderID, seatNumber) VALUES
(1, 120.00, 1, 'A12'),
(1, 95.00, 2, 'A13'),
(2, 150.00, 1, 'B27'),
(3, 110.00, 3, 'C9'),
(3, 110.00, 4, 'C10');

-- ---------- PlayerEvents ----------
INSERT INTO PlayerEvents (eventID, playerID, inningsPlayed, salaryPaid) VALUES
(1, 1, 6, 50000),
(1, 2, 6, 55000),
(2, 3, 7, 70000),
(3, 4, 8, 80000),
(3, 5, 8, 85000);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
