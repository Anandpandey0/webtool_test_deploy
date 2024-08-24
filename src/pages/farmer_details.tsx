import React, { useState, useEffect } from 'react';
import { bhoomiscore } from '@/assets/farm_details/data/bhoomiscore';
import FarmerDetailsTable from '@/assets/FarmerDetailsTable';



interface FarmerDetail {
  farm_id: number;
  '2019_Rabi': number;
  '2020_Rabi': number;
  '2021_Rabi': number;
  '2018_Rabi': number;
  '2022_Rabi': number;
  '2019_Kharib': number;
  '2020_Kharib': number;
  '2021_Kharib': number;
  '2022_Kharib': number;
  '2023_Rabi': number;
  '2023_Kharib': number;
  Name: string;
  Age: number;
  Sex: string;
  Area: number;
  crop_1_rabi: string;
  value_1_rabi: number;
  crop_2_rabi: string;
  value_2_rabi: number;
  crop_3_rabi: string;
  value_3_rabi: number;
  crop_1_kharif: string;
  value_1_kharif: number;
  crop_2_kharif: string;
  value_2_kharif: number;
  crop_3_kharif: string;
  value_3_kharif: number;
  Village: string;
  Kharif_soil: number;
  Rabi_Soil: number;
  Current_rabi: string;
  Current_Kharif: string;
  bhoomiscore:any
}

const FarmerDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [farmerDetails, setFarmerDetails] = useState<FarmerDetail[]>([]);

  useEffect(() => {
    setFarmerDetails(bhoomiscore as FarmerDetail[]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div style={{overflow:"hidden"}}>
      <FarmerDetailsTable data={farmerDetails} />
     
    </div>
  );
};

export default FarmerDetails;
