import FarmDetailsTable from "@/assets/farm_details/FarmDetailsTable";
import HomeFilters from "@/assets/home/HomeFilters";
import Sidebar from "@/assets/home/Sidebar";
import path from 'path';
import fs from 'fs';
import { useState } from "react";

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

interface Props {
  data: FarmDetail[];
}

const FarmDetails: React.FC<Props> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('farm_details');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'home_filters':
        return <HomeFilters />;
      case 'farm_details':
        return <FarmDetailsTable data={data} />;
      case 'saved_features':
        return <h1>Saved Features</h1>;
      case 'support':
        return <h1>Support</h1>;
      default:
        return <h1>Farm Dashboard</h1>;
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


export const getStaticProps = async () => {
    const filePath = path.join(process.cwd(), 'src/assets/farm_details/data/farm_details.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: FarmDetail[] = JSON.parse(jsonData);
  
    return {
      props: {
        data,
      },
    };
  };
  
export default FarmDetails