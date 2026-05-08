// IMPORT LIBRARIES 
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

// CREA APP EXPRESS
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));

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

// API — POST -> aggiungi un vino
app.post('/api/wines', (req, res) => {

  // req.body contiene i dati inviati dal frontend
  const { name, cantina, anno, types, quantity, min, price, status } = req.body;

  const stmt = db.prepare(`
    INSERT INTO wines (name, cantina, anno, types, quantity, min, price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(name, cantina, anno, types, quantity, min, price, status);

  res.json({ id: result.lastInsertRowid, ...req.body });
});

// API — DELETE -> elimina un vino
app.delete('/api/wines/:id', (req, res) => {

  const id = req.params.id;

  db.prepare('DELETE FROM wines WHERE id = ?').run(id);

  res.json({ deleted: true, id: id });
});

// START A SERVER 
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});