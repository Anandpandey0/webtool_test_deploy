
import Sidebar from "@/assets/home/Sidebar";
import { useState } from "react";



export default function Home() {
  const [selectedTab, setSelectedTab] = useState('farm_dashboard');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  return <div className="bg-black flex"> 
    <div className="w-[20%] bg-white">
    
      <Sidebar onTabChange={handleTabChange}/>
    
    </div>
  
  <div className="flex-grow bg-gray-200">{selectedTab}</div>
  
  </div>;
}
