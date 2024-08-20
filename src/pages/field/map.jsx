import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapFeature = ({geoJsonFeature,centroids}) => {
  // Define the coordinates for a polygon
// console.log(geoJsonFeature)
if (!geoJsonFeature || !geoJsonFeature.mapDrawing) {
  return <p>No polygon data available</p>;
}

const { coordinates } = geoJsonFeature.mapDrawing.geometry;
console.log({coordinates})
  // Define the position for a marker


  return (
    <MapContainer
      center={[centroids[1],centroids[0]]} // Center the map on the marker position
      zoom={16} // Initial zoom level
      style={{ height: '400px', width: '100%' }} // Map container dimensions
    >
      {/* TileLayer for the base map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker on the map */}
      <Marker position={centroids}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      {/* Polygon on the map */}
      <Polygon positions={coordinates[0]} color="black" />
    </MapContainer>
  );
};

export default MapFeature;
