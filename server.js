const express = require('express');
const cors = require('cors');
const { db, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DB
initDatabase();

// API Endpoints
app.get('/api/routes', (req, res) => {
    db.all("SELECT * FROM routes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Parse path string back to JSON
        const routes = rows.map(r => ({ ...r, path: JSON.parse(r.path) }));
        res.json(routes);
    });
});

app.get('/api/vehicles', (req, res) => {
    db.all("SELECT * FROM vehicles", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Simulation Logic (Background Worker)
function updateVehicles() {
    db.all("SELECT * FROM vehicles", (err, vehicles) => {
        if (err) return;

        vehicles.forEach(v => {
            // Simple random movement simulation
            // In a real app, this would follow the route path
            const moveLat = (Math.random() - 0.5) * 0.001;
            const moveLng = (Math.random() - 0.5) * 0.001;

            const newLat = v.lat + moveLat;
            const newLng = v.lng + moveLng;

            // Update DB
            db.run("UPDATE vehicles SET lat = ?, lng = ? WHERE id = ?", [newLat, newLng, v.id]);
        });
    });
}

// Run simulation every 2 seconds
setInterval(updateVehicles, 2000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
