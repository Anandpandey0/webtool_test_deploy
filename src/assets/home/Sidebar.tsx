import React from "react";
import Image from "next/image";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SupportIcon from "@mui/icons-material/Support";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ListItemButton } from '@mui/material';

const Sidebar = () => {
  return (
    <div className="w-[20vw] h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div className="p-4 ">
        <div className="flex items-center justify-center mb-6 mt-4">
          <Image
            src="/images/logo_bhoomicam.png"
            alt="Logo"
            width={320} // doubled the width
            height={320} // doubled the height
            objectFit="contain"
          />
        </div>
        <div className="mb-4  p-2  py-4 ">
          <h2 className="text-xs font-semibold text-gray-500 uppercase pl-4 ml-8  " >
            Overview
          </h2>
        </div>

        <List>
          <ListItemButton  className="hover:bg-gray-200">
            <ListItemIcon>
              <DashboardIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Farm Dashboard" />
          </ListItemButton>
          <ListItemButton  className="hover:bg-gray-200">
            <ListItemIcon>
              <PersonIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Farmer Details" />
          </ListItemButton>
          <ListItemButton className="hover:bg-gray-200">
            <ListItemIcon>
              <BookmarkIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Saved Features" />
          </ListItemButton>
          <ListItemButton className="hover:bg-gray-200">
            <ListItemIcon>
              <SupportIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </div>
      <div className="p-4 mt-auto">
        <ListItemButton className="hover:bg-gray-200">
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
