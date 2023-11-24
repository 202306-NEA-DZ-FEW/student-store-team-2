"use client";

import L from "leaflet";
import { useState } from "react";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";

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
                center={coord ? Coord : Map.defaultProps}
                zoom={13}
                scrollWheelZoom={true}
            >
                <LayersControl position='topright'>
                    <LayersControl.BaseLayer checked name='Esri World Imagery'>
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name='OpenStreetMap'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <Marker position={Coord} icon={customMarkerIcon} />
            </MapContainer>
        </div>
    );
};

export default Map;
