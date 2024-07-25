import React, { useState } from "react";
import Image from "next/image";
import { List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SupportIcon from "@mui/icons-material/Support";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AgricultureIcon from '@mui/icons-material/Agriculture';

interface SidebarProps {
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('crop_land_monitoring');

  const handleListItemClick = (tab: string) => {
    setSelectedTab(tab);
    onTabChange(tab); // Pass the selected tab to the parent
  };

  return (
    <div className="w-full h-screen border-r-2 border-gray-400 bg-white flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center justify-center mb-6 mt-4">
          <Image
            src="/images/logo_bhoomicam.png"
            alt="Logo"
            width={320} // doubled the width
            height={320} // doubled the height
            objectFit="contain"
          />
        </div>
        <div className="mb-4 p-2 py-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase pl-4 ml-8">
            Overview
          </h2>
        </div>

        <List>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === 'farm_dashboard' ? 'white' : 'black',
              backgroundColor: selectedTab === 'farm_dashboard' ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick('farm_dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Farm Dashboard" />
          </ListItemButton>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === 'farmer_details' ? 'white' : 'black',
              backgroundColor: selectedTab === 'farmer_details' ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick('farmer_details')}
          >
            <ListItemIcon>
              <PersonIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Farmer Details" />
          </ListItemButton>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === 'crop_land_monitoring' ? 'white' : 'black',
              backgroundColor: selectedTab === 'crop_land_monitoring' ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick('crop_land_monitoring')}
          >
            <ListItemIcon>
              <AgricultureIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Crop land monitoring" />
          </ListItemButton>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === 'saved_features' ? 'white' : 'black',
              backgroundColor: selectedTab === 'saved_features' ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick('saved_features')}
          >
            <ListItemIcon>
              <BookmarkIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Saved Features" />
          </ListItemButton>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === 'support' ? 'white' : 'black',
              backgroundColor: selectedTab === 'support' ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick('support')}
          >
            <ListItemIcon>
              <SupportIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </div>
      <div className="custom-hover mt-[50rem] bottom-10" style={{ borderRadius: "10rem" }}>
        <ListItemButton className="hover:bg-gray-400">
          <ListItemIcon>
            <ExitToAppIcon className="text-gray-700" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </div>
    </div>
  );
};

export default Sidebar;
