import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapFeature = ({ fieldDetails, centroids ,apiResponse}) => {
  if (!fieldDetails || !fieldDetails.mapDrawing) {
    return <p>No polygon data available</p>;
  }

  // Destructure the coordinates from the GeoJSON feature
  const { coordinates } = fieldDetails.mapDrawing.geometry;
  console.log(apiResponse)

  // Convert coordinates from [longitude, latitude] to [latitude, longitude] format
  const convertedCoordinates = coordinates[0].map(coordPair => [coordPair[1], coordPair[0]]);

  return (
    <MapContainer
      center={[centroids[1], centroids[0]]} // Center the map on the centroid
      zoom={17} // Initial zoom level
      style={{ height: '400px', width: '100%' }} // Map container dimensions
      dragging={false} // Disable dragging
      zoomControl={false} // Disable zoom controls
      scrollWheelZoom={false} // Disable zooming with the scroll wheel
      doubleClickZoom={false} // Disable zooming by double-clicking
      boxZoom={false} // Disable zooming with the box drag
      keyboard={false} // Disable keyboard navigation
      tap={false} // Disable touch navigation
    >
      {/* TileLayer for the base map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Polygon on the map with a blue background */}
      <Polygon positions={convertedCoordinates} pathOptions={{ color: 'black', fillColor: 'blue', fillOpacity: 0.5 }}>
        <Popup>
          <strong>ID:</strong> {fieldDetails.id} <br />
          <strong>Name:</strong> {fieldDetails.name}
        </Popup>
      </Polygon>
    </MapContainer>
  );
};

export default MapFeature;
