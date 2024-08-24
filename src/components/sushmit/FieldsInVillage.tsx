// components/FieldsInVillage.tsx
import React from 'react';
import GridOnIcon from '@mui/icons-material/GridOn';

interface FieldsInVillageProps {
  fieldsCount: number;
}

const FieldsInVillage: React.FC<FieldsInVillageProps> = ({ fieldsCount }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col items-start">
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-md">
          <GridOnIcon className="text-green-600" />
        </div>
        <span className="text-gray-800 font-semibold text-lg">Fields in Selected Village</span>
      </div>
      <div className="text-gray-500 mt-2 text-sm">Number Of Fields</div>
      <div className="text-3xl font-bold text-gray-900 mt-2">{fieldsCount}</div>
    </div>
  );
};

export default FieldsInVillage;
