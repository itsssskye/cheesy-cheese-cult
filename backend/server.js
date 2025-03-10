const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create SQLite database
const db = new sqlite3.Database('./database/members.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    favorite_cheese TEXT,
    reason TEXT
  )
`);

// Serve static frontend files
app.use(express.static('../frontend'));

// Handle form submission
app.post('/apply', (req, res) => {
  const { name, favorite_cheese, reason } = req.body;

  if (!name || !favorite_cheese || !reason) {
    return res.status(400).send('All fields are required');
  }

  // Insert the data into the database
  db.run(
    'INSERT INTO members (name, favorite_cheese, reason) VALUES (?, ?, ?)',
    [name, favorite_cheese, reason],
    function (err) {
      if (err) {
        return res.status(500).send('Error saving your application');
      }
      res.status(200).send('Your application has been received! 🧀');
    }
  );
});