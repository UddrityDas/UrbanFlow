const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./urbanflow.db');

const HAMILTON_LAT = 43.2557;
const HAMILTON_LNG = -79.8711;

// Seed data for routes (Hamilton, ON)
const ROUTES = [
  {
    id: '1',
    name: '1 KING',
    color: '#FF0000',
    path: JSON.stringify([
      [43.2580, -79.9000],
      [43.2557, -79.8711],
      [43.2500, -79.8400]
    ])
  },
  {
    id: '2',
    name: '2 BARTON',
    color: '#00FF00',
    path: JSON.stringify([
      [43.2600, -79.8900],
      [43.2580, -79.8600],
      [43.2550, -79.8300]
    ])
  },
  {
    id: '10',
    name: '10 B-LINE',
    color: '#0000FF',
    path: JSON.stringify([
      [43.2400, -79.9500],
      [43.2557, -79.8711],
      [43.2300, -79.7800]
    ])
  }
];

function initDatabase() {
  db.serialize(() => {
    // Create Routes Table
    db.run(`CREATE TABLE IF NOT EXISTS routes (
      id TEXT PRIMARY KEY,
      name TEXT,
      color TEXT,
      path TEXT
    )`);

    // Create Vehicles Table
    db.run(`CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      route_id TEXT,
      lat REAL,
      lng REAL,
      heading REAL,
      FOREIGN KEY(route_id) REFERENCES routes(id)
    )`);

    // Seed Routes if empty
    db.get("SELECT count(*) as count FROM routes", (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO routes VALUES (?, ?, ?, ?)");
        ROUTES.forEach(route => {
          stmt.run(route.id, route.name, route.color, route.path);
        });
        stmt.finalize();
        console.log("Seeded routes.");
        
        // Initial seed for vehicles
        const vStmt = db.prepare("INSERT INTO vehicles VALUES (?, ?, ?, ?, ?)");
        ROUTES.forEach((route, idx) => {
            const path = JSON.parse(route.path);
            vStmt.run(`v-${route.id}`, route.id, path[1][0], path[1][1], 0);
        });
        vStmt.finalize();
        console.log("Seeded vehicles.");
      }
    });
  });
}

module.exports = { db, initDatabase };
