import React, { useState, useEffect, useRef } from 'react';
import MapSurveyComponent from '@/assets/survey_map/MapSurveyComponent';
import FieldItem from '@/assets/survey_map/FieldItem'; // Adjust the import path as necessary

const Test = () => {
  const [fields, setFields] = useState<any[]>([]);
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
        className="w-[20vw] p-4 overflow-y-scroll give-border"
        style={{
          height: '100vh',
          paddingBottom:'5rem' // Ensure it takes the full height of the viewport
        }}
      >
        <h3 className="text-lg font-bold mb-4">Your Fields</h3>
        <ul>
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
      </div>
      <div
        className="w-[80vw] h-full"
        style={{
          overflow: 'hidden', // Prevents scrolling on the map container
        }}
      >
        <MapSurveyComponent
          onSaveDrawings={handleSaveDrawings}
          ref={mapRef}
        />
      </div>
    </div>
  );
};

export default Test;
