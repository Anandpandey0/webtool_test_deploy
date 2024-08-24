import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapFeature = ({ fieldDetails, centroids, apiResponse }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBounds, setImageBounds] = useState(null);

  if (!fieldDetails || !fieldDetails.mapDrawing) {
    return <p>No polygon data available</p>;
  }

  // Destructure the coordinates from the GeoJSON feature
  const { coordinates } = fieldDetails.mapDrawing.geometry;

  // Convert coordinates from [longitude, latitude] to [latitude, longitude] format
  const convertedCoordinates = coordinates[0].map(coordPair => [coordPair[1], coordPair[0]]);

  useEffect(() => {
    // Set the bounds for the image overlay based on the polygon coordinates
    setImageBounds(L.latLngBounds(convertedCoordinates));
    
    // Convert the raster array to an image
    const rasterData = apiResponse?.process_api?.[0]?.['GCI.tif'];

    if (rasterData) {
      const height = rasterData.length;
      const width = rasterData[0].length;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const value = rasterData[y][x]; // Assuming value ranges from 0 to some max value
          const index = (y * width + x) * 4;

          // Set pixel color based on the raster value
          imageData.data[index] = value * 50;     // Red (scaled value for visualization)
          imageData.data[index + 1] = value * 50; // Green (scaled value for visualization)
          imageData.data[index + 2] = value * 50; // Blue (scaled value for visualization)
          imageData.data[index + 3] = 255;   // Alpha (fully opaque)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setImageUrl(canvas.toDataURL());
    }
  }, [apiResponse, convertedCoordinates]);

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

      {/* Raster Image Overlay */}
      {imageUrl && imageBounds && (
        <ImageOverlay
          url={imageUrl}
          bounds={imageBounds}
          opacity={0.5}
        />
      )}

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
