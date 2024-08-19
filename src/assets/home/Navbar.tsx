import React, { useState } from "react";
import Image from "next/image";

import ListItemButton from "@mui/material/ListItemButton";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SupportIcon from "@mui/icons-material/Support";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useRouter } from "next/router";
import { PATHS } from "@/helper/PageHandler";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(router.pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleListItemClick = (path: string) => {
    setSelectedTab(path);
    router.push(path);
    handleDrawerClose();
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#0F623D" ,zIndex:'1100'}} className="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Bhooomicam
          </Typography>
          <Image
            src="/images/logo_bhoomicam.png"
            alt="Logo"
            width={160}
            height={160}
            objectFit="contain"
            style={{ marginRight: "auto" }}
          />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <div className="p-4">
          <div className="flex items-center justify-center mb-6 mt-4">
            <Image
              src="/images/logo_bhoomicam.png"
              alt="Logo"
              width={160}
              height={160}
              objectFit="contain"
            />
          </div>
          <List>
            <ListItemButton
              selected={selectedTab === PATHS.FARMER_DETAILS}
              onClick={() => handleListItemClick(PATHS.FARMER_DETAILS)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Farmer Details" />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === PATHS.CROP_LAND_MONITORING}
              onClick={() => handleListItemClick(PATHS.CROP_LAND_MONITORING)}
            >
              <ListItemIcon>
                <AgricultureIcon />
              </ListItemIcon>
              <ListItemText primary="Crop Land Monitoring" />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === PATHS.BHOOMISCORE}
              onClick={() => handleListItemClick(PATHS.BHOOMISCORE)}
            >
              <ListItemIcon>
                <AgricultureIcon />
              </ListItemIcon>
              <ListItemText primary="Bhoomiscore" />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === PATHS.SAVED_FEATURES}
              onClick={() => handleListItemClick(PATHS.SAVED_FEATURES)}
            >
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Saved Features" />
            </ListItemButton>
            {/* /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */}
            <ListItemButton
              selected={selectedTab === PATHS.DAMAGE}
              onClick={() => handleListItemClick(PATHS.DAMAGE)}
            >
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Damage" />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === PATHS.FARM_DASHBOARD}
              onClick={() => handleListItemClick(PATHS.FARM_DASHBOARD)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Farm Dashboard" />
            </ListItemButton>
            
           
            <ListItemButton
              selected={selectedTab === PATHS.SUPPORT}
              onClick={() => handleListItemClick(PATHS.SUPPORT)}
            >
              <ListItemIcon>
                <SupportIcon />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
            <ListItemButton onClick={() => handleListItemClick(PATHS.LOGOUT)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
