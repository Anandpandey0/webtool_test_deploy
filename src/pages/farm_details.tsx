import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


// Dynamically import the FarmDetailsTable component without suspense
const FarmDetailsTable = dynamic(() => import('@/assets/farm_details/FarmDetailsTable'), {
  loading: () => <div className="text-2xl">Loading Table...</div>,
});

interface FarmDetail {
  TEHSIL: string;
  DISTRICT: string;
  STATE: string;
  VILLAGE: string;
  AREA: number;
  ID: number;
  '2019_Rabi': number;
  '2020_Kharif': number;
  '2020_Rabi': number;
  '2021_Kharif': number;
  '2021_Rabi': number;
  '2022_Kharif': number;
  '2022_Rabi': number;
  '2023_Kharif': number;
  '2023_Rabi': number;
}

const FarmDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [farmDetails, setFarmDetails] = useState<FarmDetail[]>([]);

  useEffect(() => {
    const cachedData = localStorage.getItem('farmDetails');
    if (cachedData) {
      setFarmDetails(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetch('/api/farm_details')
        .then((response) => response.json())
        .then((data: FarmDetail[]) => {
          setFarmDetails(data);
          localStorage.setItem('farmDetails', JSON.stringify(data));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch farm details', error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <FarmDetailsTable data={farmDetails} />
      
    </div>
    
  );
};

export default FarmDetails;
