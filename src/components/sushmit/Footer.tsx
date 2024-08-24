// components/Footer.tsx
import React from 'react';
import VillageArea from './VillageArea';
import FieldsInVillage from './FieldsInVillage';
import FarmerDetails from './FarmerDetails';

const Footer: React.FC = () => {
  return (
    <div className="flex justify-between bg-gray-100 p-4 rounded-md shadow-md w-full space-x-4 ">
      <div className="w-1/4">
        <VillageArea />
      </div>
      <div className="w-1/4">
        <FieldsInVillage fieldsCount={868} />
      </div>
      <div className="w-2/4">
        <FarmerDetails name="Manoj Singh" village="Bhagwanpur" age={48} onMoreDetails={() => alert("More details clicked")} />
      </div>
    </div>
  );
};

export default Footer;
