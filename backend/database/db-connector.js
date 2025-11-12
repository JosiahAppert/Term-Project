// Get an instance of mysql we can use in the app
const mysql = require('mysql2/promise');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_appertj',
    password: '9444', // your MySQL password
    database: 'cs340_appertj',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export it for use in our application
module.exports = pool;