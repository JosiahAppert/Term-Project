// ########################################
// ########## SETUP
// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();



// Middleware
const cors = require('cors');
app.use(cors({ origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = process.env.PORT || 1986;

// ########################################
// ########## ROUTE HANDLERS

app.get('/', (req, res) => res.json({ message: 'Backend is running!' }));

// Reset database by calling stored procedure sp_load_teamdb()
app.post('/reset-db', async function (req, res) {
    try {
        const query = `CALL sp_load_teamdb();`;

        const result = await db.query(query);
        console.log('Executed:', query);
        console.log('DB response:', result);

        return res.status(200).json({ message: 'Database reset successfully' });
    } catch (error) {
        console.error('Error executing stored procedure:', error);

        return res.status(500).json({
            error: 'An error occurred while resetting the database.'
        });
    }
});

// READ ROUTES
app.get('/events', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT eventID, visitingTeam, DATE_FORMAT(eventStart, '%Y-%m-%d %H:%i:%s') AS eventStart FROM Events;`;
        const [events] = await db.query(query1);
    
        res.status(200).json({ events });  // Send the results to the frontend

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
    
});

app.get('/players', async (req, res) => {
    try {
        // Create and execute our queries
        const query2 = `SELECT playerID, fName, lName, position, salary FROM Players;`;
        const [players] = await db.query(query2);
    
        res.status(200).json({ players });  // Send the results to the frontend

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
    
});

app.get('/player-events', async (req, res) => {
    try {
        // Create and execute our queries
        const query3 = `SELECT pe.eventID, pe.playerID, p.fName, p.lName , pe.inningsPlayed, pe.salaryPaid, DATE_FORMAT(e.eventStart, '%Y-%m-%d %H:%i:%s') AS eventStart
                        FROM PlayerEvents pe
                        JOIN Players p ON pe.playerID = p.playerID
                        JOIN Events e ON pe.eventID = e.eventID;`;
        const [playerEvents] = await db.query(query3);

        res.status(200).json({ playerEvents });  // Send the results to the frontend

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

});

app.get('/view-ticket-events', async (req, res) => {
    try {
        // Create and execute our queries
        const query5 = `SELECT t.ticketID, t.eventID, e.visitingTeam, t.price, t.ticketHolderID, th.fName, th.lName, t.seatNumber
                        FROM Tickets t
                        JOIN Events e ON t.eventID = e.eventID
                        JOIN TicketHolders th ON t.ticketHolderID = th.ticketHolderID;`;
        const [tickets] = await db.query(query5);

        res.status(200).json({ tickets });  // Send the results to the frontend

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

});

app.get('/ticket-holders', async (req, res) => {
    try {
        // Create and execute our queries
        const query4 = `SELECT ticketHolderID, fName, lName, email, phone
                        FROM TicketHolders;`;
        const [ticketHolders] = await db.query(query4);

        res.status(200).json({ ticketHolders });  // Send the results to the frontend

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

});

// CREATE ROUTES
app.post('/events/create', async function (req, res) {
    try {
        // Parse frontend form information
        const { visitingTeam, eventStart } = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateEvent(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            visitingTeam,
            eventStart,
        ]);

        console.log(`CREATE Events. ID: ${rows.new_id} ` +
            `Visiting Team: ${visitingTeam} ${eventStart}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/players/create', async function (req, res) {
    try {
        // Parse frontend form information
        const { fName, lName, position, salary } = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreatePlayer(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            fName,
            lName,
            position,
            salary,
        ]);

        console.log(`CREATE Players. ID: ${rows.new_id} ` +
            `Name: ${fName} ${lName}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Player created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/ticket-holders/create', async function (req, res) {
    try {
        // Parse frontend form information
        const { fName, lName, email, phone } = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateTicketHolder(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            fName,
            lName,
            email,
            phone,
        ]);

        console.log(`CREATE TicketHolders. ID: ${rows.new_id} ` +
            `Name: ${fName} ${lName}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'TicketHolder created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/player-events/create', async function (req, res) {
    try {
        // Parse frontend form information
        const { eventID, playerID, inningsPlayed, salary } = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreatePlayerEvent(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            eventID,
            playerID,
            inningsPlayed,
            salary,
        ]);

        console.log(`CREATE PlayerEvents. ID: ${rows.new_id} ` +
            `eventID+playerID: ${eventID}${playerID}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'PlayerEvent created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE ROUTES
app.put('/events/update/:id', async function (req, res) {
    try {
        const eventID = req.params.id;
        const { visitingTeam, eventStart } = req.body;

        const query1 = 'CALL sp_UpdateEvent(?, ?, ?);';
        const query2 = 'SELECT eventID, visitingTeam, eventStart FROM Events WHERE eventID = ?;';

        await db.query(query1, [eventID, visitingTeam, eventStart]);

        const [[rows]] = await db.query(query2, [eventID]);

        console.log(
            `UPDATE Events. ID: ${eventID} Visiting Team: ${rows.visitingTeam} Event Start: ${rows.eventStart}`
        );

        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.put('/players/update/:id', async function (req, res) {
    try {
        const playerID = req.params.id;
        const { fName, lName, position, salary } = req.body;

        const query1 = 'CALL sp_UpdatePlayer(?, ?, ?, ?, ?);';
        const query2 = 'SELECT playerID, fName, lName, position, salary FROM Players WHERE playerID = ?;';

        await db.query(query1, [playerID, fName, lName, position, salary]);

        const [[rows]] = await db.query(query2, [playerID]);

        console.log(
            `UPDATE Players. ID: ${playerID} Name: ${rows.fName} ${rows.lName}`
        );

        res.status(200).json({ message: 'Player updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.put('/ticket-holders/update/:id', async function (req, res) {
    try {
        const ticketHolderID = req.params.id;
        const { fName, lName, email, phone } = req.body;

        const query1 = 'CALL sp_UpdateTicketHolder(?, ?, ?, ?, ?);';
        const query2 = 'SELECT ticketHolderID, fName, lName, email, phone FROM TicketHolders WHERE ticketHolderID = ?;';

        await db.query(query1, [ticketHolderID, fName, lName, email, phone]);

        const [[rows]] = await db.query(query2, [ticketHolderID]);

        console.log(
            `UPDATE TicketHolders. ID: ${ticketHolderID} Name: ${rows.fName} ${rows.lName}`
        );

        res.status(200).json({ message: 'TicketHolder updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.put('/player-events/update/:eventID/:playerID', async function (req, res) {
    try {
        const eventID = req.params.eventID;
        const playerID = req.params.playerID;

        const { inningsPlayed, salary } = req.body;

        const query1 = 'CALL sp_UpdatePlayerEvent(?, ?, ?, ?);';
        const query2 = 'SELECT eventID, playerID, inningsPlayed, salary FROM PlayerEvents WHERE eventID = ? AND playerID = ?;';

        await db.query(query1, [eventID, playerID, inningsPlayed, salary]);

        const [[rows]] = await db.query(query2, [eventID, playerID]);

        console.log(
            `UPDATE PlayerEvents. ID: ${rows.eventID}${rows.playerID}`
        );

        res.status(200).json({ message: 'PlayerEvent updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// DELETE ROUTES
app.delete(`/events/:id`, async function (req, res) {
    try {
        // Parse frontend form information
        const eventID = req.params.id

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteEvent(?);`;
        await db.query(query1, [eventID]);

        console.log(`DELETE Events. ID: ${eventID}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

app.delete('/players/:id', async function (req, res) {
    try {
        // Parse frontend form information
        const playerID = req.params.id

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeletePlayer(?);`;
        await db.query(query1, [playerID]);

        console.log(`DELETE Players. ID: ${playerID}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).json({ error: 'Failed to delete player' });
    }
});

app.delete('/ticket-holders/:id', async function (req, res) {
    try {
        // Parse frontend form information
        const ticketHolderID = req.params.id

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteTicketHolder(?);`;
        await db.query(query1, [ticketHolderID]);

        console.log(`DELETE TicketHolders. ID: ${ticketHolderID}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).json({ error: 'Failed to delete ticket holder' });
    }
});

app.delete('/player-events/:eventID/:playerID', async function (req, res) {
    try {
        // Parse frontend form information
        const eventID = req.params.eventID
        const playerID = req.params.playerID

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeletePlayerEvent(?, ?);`;
        await db.query(query1, [eventID, playerID]);

        console.log(`DELETE PlayerEvents. ID: ${eventID}${playerID}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).json({ error: 'Failed to delete player event' });
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
