import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createRoot } from 'react-dom/client';
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
import { Tooltip } from '@mui/material';
import DrawingPopup from './DrawingPopup';
import FieldItem from './FieldItem';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// Custom mode that disables dragging
const NoDragMode = {
  ...MapboxDraw.modes.simple_select,
  onDrag: () => {}, // Disable dragging completely
  onMouseDown: (state: any, e: any) => {
    // Prevent dragging on mouse down
    if (e.originalEvent.button === 0) {
      state.dragMoving = false;
      state.canDragMove = false;
    }
  },
};

// Wrapper component for HTMLElement
const HTMLElementWrapper = ({ element }: { element: HTMLElement }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(element);
    }
  }, [element]);

  return <div ref={ref} />;
};

const MapSurveyComponent = forwardRef(({ onSaveDrawings }: { onSaveDrawings: (data: any[]) => void }, ref) => {
  const mapRef = useRef<any>(null);
  const drawRef = useRef<any>(null);
  const [fieldList, setFieldList] = useState<any[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pendingDrawing, setPendingDrawing] = useState<any>(null); // Temporarily store the drawing

  useEffect(() => {
    const savedFieldList = JSON.parse(localStorage.getItem('fieldList') || '[]');
    setFieldList(savedFieldList);
  }, []);

  const handleMapLoad = () => {
    const map = mapRef.current.getMap();

    // Initialize Mapbox Draw with custom controls and modes
    const draw = new MapboxDraw({
      displayControlsDefault: false, // Disable all controls by default
      controls: {
        polygon: true,
        trash: true,
      },
      modes: {
        ...MapboxDraw.modes,
        simple_select: NoDragMode, // Override the default mode
      },
    });

    drawRef.current = draw;
    map.addControl(draw);

    if (fieldList.length > 0) {
      fieldList.forEach((field) => {
        if (field.mapDrawing) {
          draw.add(field.mapDrawing);
        }
      });
    }

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl());
    map.addControl(new mapboxgl.ScaleControl(), 'bottom-left'); // Specify position directly here

    map.on('draw.create', handleDrawingCreate);

    // Listen for delete events on the map
    map.on('draw.delete', handleMapDelete);

    // Adding tooltips to the draw controls
    setTimeout(() => {
      const polygonButton = document.querySelector('.mapbox-gl-draw_polygon');
      const trashButton = document.querySelector('.mapbox-gl-draw_trash');

      if (polygonButton && polygonButton.parentElement) {
        const tooltipContainer = document.createElement('div');
        createRoot(tooltipContainer).render(
          <Tooltip title="Draw a Polygon" placement="left">
            <HTMLElementWrapper element={polygonButton.cloneNode(true) as HTMLElement} />
          </Tooltip>
        );
        polygonButton.parentElement.replaceChild(tooltipContainer, polygonButton);
      }

      if (trashButton && trashButton.parentElement) {
        const tooltipContainer = document.createElement('div');
        createRoot(tooltipContainer).render(
          <Tooltip title="Delete Drawing" placement="left">
            <HTMLElementWrapper element={trashButton.cloneNode(true) as HTMLElement} />
          </Tooltip>
        );
        trashButton.parentElement.replaceChild(tooltipContainer, trashButton);
      }
    }, 500);
  };

  const handleMapDelete = (event: any) => {
    const deletedIds = event.features.map((feature: any) => feature.id);
    const updatedFieldList = fieldList.filter((field) => !deletedIds.includes(field.mapDrawing?.id));
    setFieldList(updatedFieldList);
    localStorage.setItem('fieldList', JSON.stringify(updatedFieldList));
  };

  const handleDrawingCreate = (event: any) => {
    const newFeature = event.features[0];
    setPendingDrawing(newFeature); // Temporarily store the drawing
    setPopupOpen(true);
  };

  const handlePopupSave = (drawingData: { name: string; photo: string; id: string }) => {
    if (pendingDrawing) {
      const updatedField = {
        name: drawingData.name,
        id: drawingData.id,
        mapDrawing: {
          ...pendingDrawing,
          properties: {
            ...pendingDrawing.properties,
            name: drawingData.name,
            photo: drawingData.photo,
            id: drawingData.id,
          },
        },
      };
      const updatedFieldList = [...fieldList, updatedField];
      setFieldList(updatedFieldList);
      localStorage.setItem('fieldList', JSON.stringify(updatedFieldList));

      setPendingDrawing(null); // Clear the pending drawing after saving
    }
    setPopupOpen(false);
  };

  const handlePopupCancel = () => {
    if (pendingDrawing) {
      // Delete the drawing from the map if the user cancels the popup
      drawRef.current.delete(pendingDrawing.id);
      setPendingDrawing(null); // Clear the pending drawing
    }
    setPopupOpen(false);
  };

  const handleLocateField = (field: any) => {
    if (mapRef.current && Array.isArray(field.mapDrawing.geometry.coordinates)) {
      const coordinates = field.mapDrawing.geometry.coordinates[0][0];
      mapRef.current.jumpToCoordinates(coordinates);
    }
  };

  const handleEditField = (index: number, updatedField: any) => {
    const updatedFieldList = [...fieldList];
    updatedFieldList[index] = updatedField;
    setFieldList(updatedFieldList);
    localStorage.setItem('fieldList', JSON.stringify(updatedFieldList));
  };

  const handleDeleteField = (index: number) => {
    const deletedField = fieldList[index];
    const updatedFieldList = fieldList.filter((_, i) => i !== index);
    setFieldList(updatedFieldList);
    localStorage.setItem('fieldList', JSON.stringify(updatedFieldList));

    if (mapRef.current && deletedField.mapDrawing.id) {
      drawRef.current.delete(deletedField.mapDrawing.id); // Trigger drawing deletion on the map
    }
  };

  useImperativeHandle(ref, () => ({
    jumpToCoordinates: (coordinates: number[]) => {
      const map = mapRef.current.getMap();
      map.flyTo({
        center: coordinates,
        zoom: 16,
        speed: 1.2,
        curve: 1,
        easing: (t: any) => t,
        essential: true,
      });
    },
    updateMap: (newFields: any[]) => {
      if (mapRef.current && drawRef.current) {
        const map = mapRef.current.getMap();
        const draw = drawRef.current;

        // Clear all existing drawings from the map
        const existingDrawings = draw.getAll().features;
        existingDrawings.forEach((drawing: any) => {
          draw.delete(drawing.id);
        });

        // Add the new set of drawings to the map
        newFields.forEach((field) => {
          if (field.mapDrawing) {
            draw.add(field.mapDrawing);
          }
        });
      } else {
        console.warn('Map or Draw control is not yet initialized.');
      }
    },
    deleteDrawing: (drawingId: string) => {
      if (mapRef.current && drawRef.current) {
        const draw = drawRef.current;
        draw.delete(drawingId);

        const updatedFieldList = fieldList.filter((field) => field.mapDrawing.id !== drawingId);
        setFieldList(updatedFieldList);
        localStorage.setItem('fieldList', JSON.stringify(updatedFieldList));
      }
    },
  }));

  return (
    <div className="h-screen w-full relative">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 27.891535,
          longitude: 78.078743,
          zoom: 4,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={mapboxgl.accessToken}
        onLoad={handleMapLoad}
        style={{ width: '100%', height: '100%' }}
      >
      </Map>

      <ul>
        {fieldList.map((field, index) => (
          <FieldItem
            key={index}
            field={field}
            index={index}
            onEdit={handleEditField}
            onDelete={handleDeleteField}
            onLocate={handleLocateField}
          />
        ))}
      </ul>

      <DrawingPopup
        open={popupOpen}
        onClose={handlePopupCancel}
        onSave={handlePopupSave}
      />
    </div>
  );
});

export default MapSurveyComponent;
