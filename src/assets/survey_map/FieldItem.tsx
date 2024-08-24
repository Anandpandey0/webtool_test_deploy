import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getGeoJsonCenter from '@/helper/centroid_geojson';

interface Coordinates {
  type: string;
  coordinates: number[][][]; // Adjust based on the structure of your coordinates
}

type Position = [number, number]; 

interface Field {
  name: string;
  id: string;
  mapDrawing?: {
    id: string;
    type: string;
    properties: {
      name: string;
      photo: string;
      id: string;
    };
    geometry: Coordinates;
  };
}

interface FieldItemProps {
  field: Field;
  index: number;
  onEdit: (index: number, updatedField: Field) => void;
  onDelete: (index: number) => void;
  onLocate: (field: Field) => void;
  center?: Position;  // Make center optional
}

const FieldItem: React.FC<FieldItemProps> = ({ field, index, onEdit, onDelete, onLocate, center }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState<Field>(field);
  const router = useRouter();

  const handleSave = () => {
    onEdit(index, editedField);
    setIsEditing(false);
  };

  const handleStatsClick = () => {
    const coordinates = field.mapDrawing?.geometry?.coordinates;

    if (coordinates) {
      // Save selected field to local storage
      localStorage.setItem('selectedField', JSON.stringify(field));

      // Navigate to the stats page
      router.push({
        pathname: '/field/stats',
        query: {
          centroid: center,  // Use the center calculated and passed as a prop
          name: field.name,
          id: field.id,
        },
      });
    } else {
      console.warn('Coordinates are missing for this field:', field);
    }
  };

  return (
    <li className="mb-2 flex flex-col cursor-pointer text-black give-border">
      {isEditing ? (
        <div className="p-1 border rounded-md bg-gray-100 w-full">
          <input
            type="text"
            value={editedField.name || ''}
            onChange={(e) => setEditedField({ ...editedField, name: e.target.value })}
            className="p-1 mb-1 w-full border rounded text-sm"
            placeholder="Field Name"
          />
          <input
            type="text"
            value={editedField.id || ''}
            onChange={(e) => setEditedField({ ...editedField, id: e.target.value })}
            className="p-1 mb-1 w-full border rounded text-sm"
            placeholder="Field ID"
          />
          <div className="flex justify-end space-x-1">
            <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-500 text-white rounded text-sm">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="p-1 border rounded-md bg-gray-100 w-full">
          <p className="text-sm">Name: {field.name || 'N/A'}</p>
          <p className="text-sm">ID: {field.id || 'N/A'}</p>
          {center && (
            <p className="text-sm">Center: {center[1].toFixed(5)}, {center[0].toFixed(5)}</p>
          )}
          <div className="flex justify-end space-x-1 mt-1 gap-4">
            <button onClick={() => setIsEditing(true)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
            <button onClick={() => onDelete(index)} className="px-2 py-1 bg-red-500 text-black rounded text-sm">Delete</button>
            <button onClick={() => onLocate(field)} className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">Locate</button>
            <button onClick={handleStatsClick} className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">Stats</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default FieldItem;
