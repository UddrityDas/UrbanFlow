import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Bus Icon
const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', // Placeholder bus icon
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
});

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const MapComponent = ({ vehicles, routes, selectedRoute }) => {
    const hamiltonPosition = [43.2557, -79.8711];

    return (
        <MapContainer center={hamiltonPosition} zoom={13} className="h-full w-full">
            <ChangeView
                center={selectedRoute ? JSON.parse(selectedRoute.path)[1] : hamiltonPosition}
                zoom={selectedRoute ? 14 : 13}
            />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Render Routes */}
            {routes.map(route => (
                <Polyline
                    key={route.id}
                    positions={route.path}
                    color={route.color}
                    weight={selectedRoute && selectedRoute.id === route.id ? 6 : 3}
                    opacity={selectedRoute && selectedRoute.id !== route.id ? 0.3 : 0.8}
                />
            ))}

            {/* Render Vehicles */}
            {vehicles.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    position={[vehicle.lat, vehicle.lng]}
                    icon={busIcon}
                >
                    <Popup>
                        <div className="text-black">
                            <strong>Route {vehicle.route_id}</strong><br />
                            Vehicle ID: {vehicle.id}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
