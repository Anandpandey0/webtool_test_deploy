import FarmDetailsTable from "@/assets/farm_details/FarmDetailsTable";
import HomeFilters from "@/assets/home/HomeFilters";
import { useState, useEffect, useCallback } from "react";
import { PATHS } from "@/helper/PageHandler";
import { useRouter } from "next/router";
import SurveyComponent from "@/assets/survey_map/SurveyComponent";


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
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(router.pathname);
  const [farmDetails, setFarmDetails] = useState<FarmDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFarmDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/farm_details');
      const data: FarmDetail[] = await res.json();
      setFarmDetails(data);
    } catch (error) {
      console.error('Failed to fetch farm details', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTab === PATHS.FARM_DASHBOARD && farmDetails.length === 0) {
      fetchFarmDetails();
    }
  }, [selectedTab, fetchFarmDetails, farmDetails.length]);

  const renderContent = () => {
    switch (selectedTab) {
      case PATHS.CROP_LAND_MONITORING:
        return <HomeFilters />;
      case PATHS.FARMER_DETAILS:
        return <h1>Farmer Details</h1>;
      case PATHS.FARM_DASHBOARD:
        if (loading) {
          return <div className="flex justify-center items-center h-full">Loading...</div>;
        }
        return <FarmDetailsTable data={farmDetails} />;
      case PATHS.SAVED_FEATURES:
        return <h1>Saved Features</h1>;
      case PATHS.SUPPORT:
        return <h1>Support</h1>;
      case PATHS.LOGOUT:
        return <h1>Logout</h1>;
      default:
        return <SurveyComponent />;
    }
  };

  return (
    <div className="flex-grow bg-gray-200 overflow-hidden">

      {renderContent()}
    </div>
  );
};

export default Home;
