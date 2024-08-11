import React, { useState, useEffect, useRef } from 'react';
import MapSurveyComponent from '@/assets/survey_map/MapSurveyComponent';
import FieldItem from '@/assets/survey_map/FieldItem'; // Adjust the import path as necessary
import { Button } from '@mui/material';
import ShapefileUploadPopup from '@/assets/survey_map/ShapefileUploadPopup';


const SurveyComponent = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const mapRef = useRef<{ jumpToCoordinates: (coordinates: number[]) => void } | null>(null);

  useEffect(() => {
    const savedFields = JSON.parse(localStorage.getItem('fieldList') || '[]');
    setFields(savedFields);
  }, []);

  const handleSaveDrawings = (drawings: any[]) => {
    setFields(drawings);
    localStorage.setItem('fieldList', JSON.stringify(drawings));
  };

  const handleFieldClick = (field: any) => {
    if (mapRef.current && Array.isArray(field.geometry.coordinates)) {
      // Extract the first [lng, lat] pair from the nested coordinates array
      const coordinates = field.geometry.coordinates[0][0];
      mapRef.current.jumpToCoordinates(coordinates);
    }
  };

  const handleEditField = (index: number, updatedField: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
    localStorage.setItem('fieldList', JSON.stringify(updatedFields));
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    localStorage.setItem('fieldList', JSON.stringify(updatedFields));
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePopupData = (drawingData: { name: string; photo: string; id: string; files: { shx: File | null; dbf: File | null; prj: File | null; shp: File | null; } }) => {
    console.log('Popup Data:', drawingData);
    // Handle saving the uploaded shapefile data here
    setIsPopupOpen(false); // Close the popup after saving
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden', // Prevents scrolling on the parent container
      }}
    >
      <div
        className="w-[20vw] flex flex-col sidebar py-4 p-2"
        style={{
          height: '100vh',
          paddingBottom: '5rem', // Ensure it takes the full height of the viewport
        }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">Your Fields</h3>
        <ul
          className="overflow-y-auto flex-grow field-list"
          style={{
            maxHeight: 'calc(100vh - 10rem)', // Adjust height to account for buttons and other elements
            paddingBottom: '1rem',
          }}
        >
          {fields.map((field, index) => (
            <FieldItem
              key={index}
              field={field}
              index={index}
              onEdit={handleEditField}
              onDelete={handleDeleteField}
              onClick={handleFieldClick}
            />
          ))}
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