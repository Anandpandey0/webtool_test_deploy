import React, { useState } from 'react';
import Image from 'next/image';

interface FieldItemProps {
  field: any;
  index: number;
  onEdit: (index: number, updatedField: any) => void;
  onDelete: (index: number) => void;
  onClick: (field: any) => void;
}

const FieldItem: React.FC<FieldItemProps> = ({ field, index, onEdit, onDelete, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(field);

  const handleSave = () => {
    onEdit(index, editedField);
    setIsEditing(false);
  };

  return (
    <li className="mb-2 flex justify-between items-center cursor-pointer text-black give-border">
      {isEditing ? (
        <div className="p-1 border rounded-md bg-gray-100 w-full">
          <input
            type="text"
            value={editedField.properties.name}
            onChange={(e) => setEditedField({ ...editedField, properties: { ...editedField.properties, name: e.target.value } })}
            className="p-1 mb-1 w-full border rounded text-sm"
          />
          <input
            type="text"
            value={editedField.properties.id}
            onChange={(e) => setEditedField({ ...editedField, properties: { ...editedField.properties, id: e.target.value } })}
            className="p-1 mb-1 w-full border rounded text-sm"
          />
          {/* {editedField.properties.photo && (
            <Image
              src={editedField.properties.photo.startsWith('http') ? editedField.properties.photo : `/${editedField.properties.photo}`}
              alt={`Field ${index + 1}`}
              width={100} // Reduced width
              height={50} // Reduced height
              className="w-full h-auto mb-1"
            />
          )} */}
          <div className="flex justify-end space-x-1">
            <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-500 text-white rounded text-sm">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="p-1 border rounded-md bg-gray-100 w-full" onClick={() => onClick(field)}>
          <p className="text-sm">Name: {field.properties.name}</p>
          <p className="text-sm">ID: {field.properties.id}</p>
          {/* {field.properties.photo && (
            <Image
              src={field.properties.photo.startsWith('http') ? editedField.properties.photo : `/${field.properties.photo}`}
              alt={`Field ${index + 1}`}
              width={100} // Reduced width
              height={75} // Reduced height
              className="w-full h-auto"
            />
          )} */}
          <div className="flex justify-end space-x-1 mt-1 gap-4">
            <button onClick={() => setIsEditing(true)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
            <button onClick={() => onDelete(index)} className="px-2 py-1 bg-red-500 text-black rounded text-sm">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default FieldItem;