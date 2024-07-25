import FarmDetailsTable from "@/assets/farm_details/FarmDetailsTable";
import HomeFilters from "@/assets/home/HomeFilters";
import Sidebar from "@/assets/home/Sidebar";
import { useState, useMemo, useCallback } from "react";

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

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('crop_land_monitoring');
  const [farmDetails, setFarmDetails] = useState<FarmDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const fetchFarmDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/farm_details');
      const data: FarmDetail[] = await res.json();
      setFarmDetails(data);
    } catch (error) {
      console.error('Failed to fetch farm details', error);
    }
    setLoading(false);
  }, []);

  useMemo(() => {
    if (selectedTab === 'farm_dashboard' && farmDetails.length === 0) {
      fetchFarmDetails();
    }
  }, [selectedTab, fetchFarmDetails, farmDetails.length]);

  const renderContent = () => {
    if (selectedTab === 'farm_dashboard' && loading) {
      return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    switch (selectedTab) {
      case 'crop_land_monitoring':
        return <HomeFilters />;
      case 'farmer_details':
        return <h1>Farmer Details</h1>;
      case 'farm_dashboard':
        return <FarmDetailsTable data={farmDetails} />;
      case 'saved_features':
        return <h1>Saved Features</h1>;
      case 'support':
        return <h1>Support</h1>;
      default:
        return <HomeFilters />;
    }
  };

  return (
    <div className="bg-black flex">
      <div className="w-[15vw] bg-white z-[100]">
        <Sidebar onTabChange={handleTabChange} />
      </div>
      <div className="flex-grow bg-gray-200">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
