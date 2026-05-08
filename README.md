🍷 Wine Inventory Manager
A full-stack web application for managing wine cellar stock, built from scratch 
Live Demo: alessandromeuccido.github.io/wine-inventory

Features

Real-time inventory — add and remove wines instantly
Live statistics — total bottles, warehouse value, low-stock count, wine types
Low-stock alerts — automatic warning when a wine falls below minimum threshold
Dynamic filtering — filter by wine type (Rosso, Bianco, Bollicine, Rosato)
Persistent storage — data saved to SQLite database via REST API
Responsive design — works on desktop and mobile


Tech Stack
LayerTechnologyFrontendHTML, CSS (custom properties, Grid, Flexbox), vanilla JavaScriptBackendNode.js + ExpressDatabaseSQLite (better-sqlite3)Deploy (frontend)GitHub PagesDeploy (backend)Railway

Project Structure
wine-inventory/
├── docs/                  # Frontend (served via GitHub Pages)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/               # Node.js server (deployed on Railway)
│   ├── index.js           # Express server + REST API
│   ├── package.json
│   └── wines.db           # SQLite database (local only, gitignored)
└── README.md

API Endpoints
MethodEndpointDescriptionGET/api/winesGet all winesPOST/api/winesAdd a new wineDELETE/api/wines/:idDelete a wine by ID
