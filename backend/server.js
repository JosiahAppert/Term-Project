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
app.get('/view-events', async (req, res) => {
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


app.get('/view-players', async (req, res) => {
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

app.get('/view-player-events', async (req, res) => {
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

app.get('/view-ticket-holders', async (req, res) => {
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

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
