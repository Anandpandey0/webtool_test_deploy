import React, { useState, useEffect, useRef } from 'react';
import MapSurveyComponent from '@/assets/survey_map/MapSurveyComponent';
import FieldItem from '@/assets/survey_map/FieldItem'; // Adjust the import path as necessary
import { Button } from '@mui/material';
import ShapefileUploadPopup from '@/assets/survey_map/ShapefileUploadPopup';

const SurveyComponent = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const mapRef = useRef<{ jumpToCoordinates: (coordinates: number[]) => void; updateMap: (fields: any[]) => void } | null>(null);

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
    if (mapRef.current && Array.isArray(field.geometry.coordinates)) {
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
    
    if (mapRef.current) {
      mapRef.current.updateMap(updatedFields);  // Trigger map update
    }
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
          paddingBottom: '5rem',
          paddingTop: '6rem',  // Adjust padding at the top
          paddingLeft: '1rem', // Add left padding to give space to the content
          paddingRight: '1rem', // Add right padding for consistency
        }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">Your Fields</h3>
        <ul
          className="overflow-y-auto flex-grow field-list"
          style={{
            maxHeight: 'calc(100vh - 12rem)', // Adjust height to account for buttons and other elements
            paddingBottom: '1rem',
            paddingLeft: '0.5rem', // Add padding inside the list
            paddingRight: '0.5rem', // Add padding inside the list
          }}
        >
          {fields.map((field, index) => (
            <FieldItem
              key={index}
              field={field}
              index={index}
              onEdit={handleEditField}
              onDelete={handleDeleteField}
              onLocate={handleLocateField}  // Pass the handleLocateField function
            />
          ))}
        </ul>
        <div
          className="flex flex-col items-center space-y-2 mt-4"
          style={{
            padding: '1rem',
            paddingBottom: '2rem',
            marginTop: '1rem', // Add margin at the top of the button
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
