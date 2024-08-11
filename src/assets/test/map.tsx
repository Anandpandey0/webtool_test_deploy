import React, { useEffect } from 'react';

const Map: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.olakrutrim.com/api/v1/map.js?key=icfNcKmIgt8MDVrX0qiufkj4Lm8jGntF9CyNwtlT`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new (window as any).OlaMap.Map('map', {
        center: [12.9716, 77.5946], // Initial center coordinates (Bangalore)
        zoom: 10,
      });
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '70vh' }}></div>;
};

export default Map;
