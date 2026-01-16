import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';

function App() {
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    // Fetch Routes on Mount
    useEffect(() => {
        fetch('http://localhost:3001/api/routes')
            .then(res => res.json())
            .then(data => setRoutes(data))
            .catch(err => console.error("Error fetching routes:", err));
    }, []);

    // Poll Vehicles every 2 seconds
    useEffect(() => {
        const fetchVehicles = () => {
            fetch('http://localhost:3001/api/vehicles')
                .then(res => res.json())
                .then(data => setVehicles(data))
                .catch(err => console.error("Error fetching vehicles:", err));
        };

        fetchVehicles();
        const interval = setInterval(fetchVehicles, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-urban-dark">
            <Sidebar
                routes={routes}
                onSelectRoute={setSelectedRoute}
                selectedRoute={selectedRoute}
            />
            <div className="flex-1 relative">
                <MapComponent
                    vehicles={vehicles}
                    routes={routes}
                    selectedRoute={selectedRoute}
                />

                {/* Overlay Stats (Optional Polish) */}
                <div className="absolute top-4 right-4 bg-urban-panel/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-[1000] border border-gray-700">
                    <div className="text-sm font-medium text-gray-300">Active Vehicles</div>
                    <div className="text-2xl font-bold text-urban-accent">{vehicles.length}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
