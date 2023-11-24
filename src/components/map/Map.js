"use client";

import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Map = ({ coord }) => {
    const [Coord, setCoord] = useState(coord);
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
                center={coord ? Coord : [28.0289837, 1.6666663]}
                zoom={2}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <Marker position={Coord} icon={customMarkerIcon} />
            </MapContainer>
        </div>
    );
};

Map.defaultProps = {
    location: [36.7538, 3.0588],
};

export default Map;
