import React, { useEffect, useState } from "react";
import Image from "next/image";
import { List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SupportIcon from "@mui/icons-material/Support";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useRouter } from "next/router";
import { PATHS } from "@/helper/PageHandler";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(router.pathname);

  const handleListItemClick = (path: string) => {
    setSelectedTab(path);
    router.push(path);
  };

  return (
    <div className="w-full h-screen border-r-2 border-gray-400 bg-white flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center justify-center mb-6 mt-4">
          <Image
            src="/images/logo_bhoomicam.png"
            alt="Logo"
            width={160} // adjusted width
            height={160} // adjusted height
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
              color: selectedTab === PATHS.FARMER_DETAILS ? 'white' : 'black',
              backgroundColor: selectedTab === PATHS.FARMER_DETAILS ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick(PATHS.FARMER_DETAILS)}
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
              color: selectedTab === PATHS.CROP_LAND_MONITORING ? 'white' : 'black',
              backgroundColor: selectedTab === PATHS.CROP_LAND_MONITORING ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick(PATHS.CROP_LAND_MONITORING)}
          >
            <ListItemIcon>
              <AgricultureIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Crop Land Monitoring" />
          </ListItemButton>
          <ListItemButton
            className="custom-hover"
            sx={{
              marginBottom: '10px',
              borderRadius: '10rem',
              color: selectedTab === PATHS.SAVED_FEATURES ? 'white' : 'black',
              backgroundColor: selectedTab === PATHS.SAVED_FEATURES ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick(PATHS.SAVED_FEATURES)}
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
              color: selectedTab === PATHS.FARM_DASHBOARD ? 'white' : 'black',
              backgroundColor: selectedTab === PATHS.FARM_DASHBOARD ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick(PATHS.FARM_DASHBOARD)}
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
              color: selectedTab === PATHS.SUPPORT ? 'white' : 'black',
              backgroundColor: selectedTab === PATHS.SUPPORT ? '#0F623D' : 'transparent',
            }}
            onClick={() => handleListItemClick(PATHS.SUPPORT)}
          >
            <ListItemIcon>
              <SupportIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </div>
      <div className="custom-hover mt-[50rem] bottom-10" style={{ borderRadius: "10rem" }}>
        <ListItemButton className="hover:bg-gray-400" onClick={() => handleListItemClick(PATHS.LOGOUT)}>
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
