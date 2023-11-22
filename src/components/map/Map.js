"use client";

import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
    const [coord, setCoord] = useState(location);
    delete L.Icon.Default.prototype._getIconUrl;

    const customMarkerIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
    });

    return (
        <div>
            <MapContainer
                style={{
                    height: "50vh",
                    width: "50vw",
                }}
                center={coord}
                zoom={2}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <Marker position={coord} icon={customMarkerIcon} />
            </MapContainer>
        </div>
    );
};

Map.defaultProps = {
    location: [36.7538, 3.0588],
};

export default Map;
