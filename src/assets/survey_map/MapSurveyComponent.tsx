/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import mapboxgl from 'mapbox-gl';
import { Tooltip, Box, Button } from '@mui/material';
import DrawingPopup from './DrawingPopup';

// Set your Mapbox token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const MapSurveyComponent = forwardRef(({ onSaveDrawings }: { onSaveDrawings: (data: any[]) => void }, ref) => {
  const mapRef = useRef<any>(null);
  const drawRef = useRef<any>(null);
  const [drawings, setDrawings] = useState<any[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [newDrawing, setNewDrawing] = useState<any>(null);

  useEffect(() => {
    const savedDrawings = JSON.parse(localStorage.getItem('mapDrawings') || '[]');
    setDrawings(savedDrawings);
  }, []);

  const handleMapLoad = () => {
    const map = mapRef.current.getMap();

    // Initialize Mapbox Draw
    const draw = new MapboxDraw();
    drawRef.current = draw;
    map.addControl(draw);

    // Load existing drawings from local storage
    if (drawings.length > 0) {
      drawings.forEach((drawing) => {
        draw.add(drawing);
      });
    }

    // Add other controls
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl());

    // Listen for drawing events
    map.on('draw.create', handleDrawingCreate);
  };

  const handleDrawingCreate = (event: any) => {
    const newFeature = event.features[0];
    setNewDrawing(newFeature);
    setPopupOpen(true);
  };

  const handlePopupSave = (drawingData: { name: string; photo: string; id: string }) => {
    if (newDrawing) {
      const updatedDrawing = {
        ...newDrawing,
        properties: { ...drawingData },
      };
      const updatedDrawings = [...drawings, updatedDrawing];
      setDrawings(updatedDrawings);
      localStorage.setItem('mapDrawings', JSON.stringify(updatedDrawings));
      setShowSaveButton(true);
    }
  };

  const handleSaveDrawings = () => {
    onSaveDrawings(drawings);
    setShowSaveButton(false);
  };

  const jumpToCoordinates = (coordinates: number[] | { lng: number, lat: number }) => {
    const map = mapRef.current.getMap();
    map.flyTo({
      center: Array.isArray(coordinates) ? coordinates : [coordinates.lng, coordinates.lat],
      zoom: 16,
      speed: 1.2,
      curve: 1,
      easing: (t:any) => t,
      essential: true,
    });
  };

  useImperativeHandle(ref, () => ({
    jumpToCoordinates,
  }));

  return (
    <div className="h-screen w-full relative">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 51.505,
          longitude: -0.09,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={mapboxgl.accessToken}
        onLoad={handleMapLoad}
        style={{ width: '100%', height: '100%' }}
      >
        <Box className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <Tooltip title="Zoom In/Out" placement="left">
            <div>
              <NavigationControl showCompass={false} />
            </div>
          </Tooltip>

          <Tooltip title="Toggle Fullscreen" placement="left">
            <div>
              <FullscreenControl />
            </div>
          </Tooltip>

          <Tooltip title="Locate Me" placement="left">
            <div>
              <GeolocateControl />
            </div>
          </Tooltip>

          <Tooltip title="Scale" placement="left">
            <div>
              <ScaleControl />
            </div>
          </Tooltip>
        </Box>
        {showSaveButton && (
          <Box className="absolute bottom-4 left-4 z-10">
            <Button variant="contained" color="primary" onClick={handleSaveDrawings}>
              Save Drawings
            </Button>
          </Box>
        )}
      </Map>
      <DrawingPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSave={handlePopupSave}
      />
    </div>
  );
});

export default MapSurveyComponent;
