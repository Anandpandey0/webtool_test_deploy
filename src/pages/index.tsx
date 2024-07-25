import HomeFilters from "@/assets/home/HomeFilters";
import Sidebar from "@/assets/home/Sidebar";
import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('farm_dashboard');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const renderContent = () => {
    switch (selectedTab) {
      case 'crop_land_monitoring':
        return <HomeFilters/>;
      case 'farm_details':
        return <h1>Farmers Details</h1>;
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
}
