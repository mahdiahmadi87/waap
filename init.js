const sqlite3 = require('sqlite3').verbose();

// Connect to a database (in this example, a new file-based database)
const db = new sqlite3.Database('waap_db.db');

// Define the SQL statement to create a table
const createTableVideo = `
CREATE TABLE videos (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);`;

// Execute the SQL statement to create the table
db.run(createTableVideo, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table Video created successfully');
});

const createTableSong = `
CREATE TABLE songs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);`;

// Execute the SQL statement to create the table
db.run(createTableSong, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table Song created successfully');
});

const createTableDoc = `
CREATE TABLE docs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);`;

// Execute the SQL statement to create the table
db.run(createTableDoc, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table Doc created successfully');
});

