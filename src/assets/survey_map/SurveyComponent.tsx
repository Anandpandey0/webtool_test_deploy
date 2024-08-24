import React, { useState, useEffect, useRef } from 'react';
import MapSurveyComponent from '@/assets/survey_map/MapSurveyComponent';
import FieldItem from '@/assets/survey_map/FieldItem'; // Adjust the import path as necessary
import { Button } from '@mui/material';
import ShapefileUploadPopup from '@/assets/survey_map/ShapefileUploadPopup';
import getGeoJsonCenter from '../../helper/centroid_geojson';

type Position = [number, number]; // Define Position as a tuple with exactly two numbers

const SurveyComponent = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const mapRef = useRef<{ jumpToCoordinates: (coordinates: number[]) => void; updateMap: (fields: any[]) => void, deleteDrawing: (id: string) => void } | null>(null);

  useEffect(() => {
    const savedFields = JSON.parse(localStorage.getItem('fieldList') || '[]');
    setFields(savedFields);
  }, []);

  useEffect(() => {
    // Update the map when fields change
    if (mapRef.current) {
      mapRef.current.updateMap(fields);
    }
  }, [fields]);

  const handleSaveDrawings = (drawings: any[]) => {
    setFields(drawings);
    localStorage.setItem('fieldList', JSON.stringify(drawings));
  };

  const handleLocateField = (field: any) => {
    if (mapRef.current && Array.isArray(field.mapDrawing.geometry.coordinates)) {
      const coordinates = field.mapDrawing.geometry.coordinates[0][0];
      mapRef.current.jumpToCoordinates(coordinates);
    } else {
      console.warn('Invalid coordinates or map reference');
    }
  };

  const handleEditField = (index: number, updatedField: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
    localStorage.setItem('fieldList', JSON.stringify(updatedFields));
  };

  const handleDeleteField = (index: number) => {
    const deletedField = fields[index];
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    localStorage.setItem('fieldList', JSON.stringify(updatedFields));
    
    if (mapRef.current && deletedField.mapDrawing.id) {
      mapRef.current.deleteDrawing(deletedField.mapDrawing.id);  // Trigger drawing deletion on map
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePopupData = (drawingData: { name: string; photo: string; id: string; files: { shx: File | null; dbf: File | null; prj: File | null; shp: File | null; }; geometry?: any }) => {
    console.log('Popup Data:', drawingData);
  
    // Add the new field to the state and update the sidebar immediately
    const newField = {
      ...drawingData,
      mapDrawing: {
        geometry: drawingData.geometry || {}, // Handle the case where geometry might be undefined
      },
    };
  
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    localStorage.setItem('fieldList', JSON.stringify(updatedFields));
    setIsPopupOpen(false); // Close the popup after saving
  };

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 4rem)', // Full viewport height
        overflow: 'hidden', // Prevents scrolling on the parent container
      }}
    >
      <div
        className="w-[20vw] flex flex-col sidebar py-4 p-2"
        style={{
          height: '100%', // Full height of the parent container
          paddingBottom: '5rem', // Ensure it takes the full height of the viewport
        }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">Your Fields</h3>
        <ul
          className="overflow-y-auto flex-grow field-list"
          style={{
            flex: 1, // Take up remaining space in the sidebar
            paddingBottom: '1rem',
          }}
        >
          {fields.map((field, index) => {
            const center = getGeoJsonCenter(field.mapDrawing); // Calculate centroid

            if (center.length >= 2) {  // Ensure the center has at least two elements
              const position: Position = [center[0], center[1]]; // Extract exactly two elements
              return (
                <FieldItem
                  key={index}
                  field={field}
                  index={index}
                  onEdit={handleEditField}
                  onDelete={handleDeleteField}
                  onLocate={handleLocateField}  // Pass the handleLocateField function
                  center={position} // Pass the center point to the FieldItem component
                />
              );
            } else {
              console.warn('Invalid center position:', center);
              return null; // Handle cases where center is not valid
            }
          })}
        </ul>
        <div
          className="flex flex-col items-center space-y-2 mt-4"
          style={{
            padding: '1rem',
            paddingBottom: '2rem',
          }}
        >
          <Button
            variant="contained"
            style={{ width: '100%', backgroundColor: '#0F623D' }}
            onClick={handleOpenPopup}
          >
            Upload Shape Files
          </Button>
        </div>
      </div>
      <div
        className="w-[80vw] h-full"
        style={{
          flex: 1, // Take up remaining space in the container
          overflow: 'hidden', // Prevents scrolling on the map container
        }}
      >
        <MapSurveyComponent onSaveDrawings={handleSaveDrawings} ref={mapRef} />
      </div>

      {/* Shapefile Upload Popup */}
      <ShapefileUploadPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSave={handleSavePopupData}
      />
    </div>
  );
};

export default SurveyComponent;
