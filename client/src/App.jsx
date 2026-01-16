import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';

import { MOCK_ROUTES, MOCK_VEHICLES } from './mockData';

function App() {
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isOffline, setIsOffline] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Fetch Routes on Mount
    useEffect(() => {
        fetch(`${API_URL}/api/routes`)
            .then(res => {
                if (!res.ok) throw new Error("API not reachable");
                return res.json();
            })
            .then(data => setRoutes(data))
            .catch(err => {
                console.warn("API unreachable, using mock routes:", err);
                setRoutes(MOCK_ROUTES);
                setIsOffline(true);
            });
    }, []);

    // Poll Vehicles every 2 seconds
    useEffect(() => {
        const fetchVehicles = () => {
            fetch(`${API_URL}/api/vehicles`)
                .then(res => {
                    if (!res.ok) throw new Error("API not reachable");
                    return res.json();
                })
                .then(data => setVehicles(data))
                .catch(err => {
                    // Only log once to avoid console spam
                    // console.warn("API unreachable, using mock vehicles");

                    // Simulate movement for mock vehicles
                    const movedVehicles = MOCK_VEHICLES.map(v => ({
                        ...v,
                        lat: v.lat + (Math.random() - 0.5) * 0.001,
                        lng: v.lng + (Math.random() - 0.5) * 0.001
                    }));
                    setVehicles(movedVehicles);
                });
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
