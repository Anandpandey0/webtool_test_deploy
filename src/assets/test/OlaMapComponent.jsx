
import React, { useEffect, useRef, useState } from 'react';

const OlaMap = ({ center = [77.17, 28.61], // Default: Roorkee, India
                   zoom = 10, 
                   apiKey }) => {

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Dynamically load Ola Maps script
    const script = document.createElement('script');
    script.src = `https://maps.olakrutrim.com/static/v2/ol.js?key=${apiKey}`; // Include API key
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (mapContainerRef.current) {
        const newMap = new ol.Map({
          target: mapContainerRef.current,
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM() // You'll likely want to use Ola's tile sources here
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat(center), 
            zoom
          })
        });
        setMap(newMap);
      }
    };

    return () => {
      // Clean up: Remove the script when component unmounts
      document.body.removeChild(script);
    };

  }, [center, zoom, apiKey]); // Re-run effect if props change

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default OlaMap;
