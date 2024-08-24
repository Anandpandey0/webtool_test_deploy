// components/VillageArea.tsx
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const VillageArea: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col items-start">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-md">
          <LocationOnIcon className="text-blue-600" />
        </div>
        <span className="text-gray-800 font-semibold text-lg">Selected Village Area</span>
      </div>
      <div className="text-gray-500 mt-2 text-sm">In Meter Square</div>
      <div className="text-3xl font-bold text-gray-900 mt-2">13312</div>
    </div>
  );
};

export default VillageArea;
