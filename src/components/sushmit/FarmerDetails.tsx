// components/FarmerDetails.tsx
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

interface FarmerDetailsProps {
  name: string;
  village: string;
  age: number;
  onMoreDetails: () => void;
}

const FarmerDetails: React.FC<FarmerDetailsProps> = ({ name, village, age, onMoreDetails }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-md">
            <AccountCircleIcon className="text-yellow-600" />
          </div>
          <span className="text-gray-800 font-semibold text-lg">Farmer Details</span>
        </div>
        <Button variant="contained" color="success" onClick={onMoreDetails}>
          More details
        </Button>
      </div>
      <div className="flex flex-row space-x-8 mt-4">
        <div>
          <div className="text-gray-500">Name</div>
          <div className="text-xl font-bold text-gray-900">{name}</div>
        </div>
        <div>
          <div className="text-gray-500">Village</div>
          <div className="text-xl font-bold text-gray-900">{village}</div>
        </div>
        <div>
          <div className="text-gray-500">Age</div>
          <div className="text-xl font-bold text-gray-900">{age}</div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails;
