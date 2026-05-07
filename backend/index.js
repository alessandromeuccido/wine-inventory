// IMPORT LIBRARIES 
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

// CREA APP EXPRESS
const app = express();
const PORT = 3000;

app.use(express.json());

// NEW/OPEN DATABASE 
const db = new Database('wines.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS wines (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    cantina  TEXT,
    anno     INTEGER,
    types    TEXT,
    quantity INTEGER,
    min      INTEGER,
    price    REAL,
    status   TEXT
  )
`);

// API - GET -> ALL THE WINE
app.get('/api/wines', (req, res) => {
  const wines = db.prepare('SELECT * FROM wines').all();
  res.json(wines);
});

// START A SERVER 
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});