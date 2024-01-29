import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../../logo/logoblack.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./consts/navbarItems";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const AdminfontspanStyle = {
    color: "#000000",
    fontSize: "16px",
  };

  const logoADMINStyle = {
    margin: "20px",
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  const drawerWidth = 220;

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    navigate(item.route);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#FA6B6B",
          color: "#FFFFFF",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <List>
        {mainNavbarItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            selected={selectedItem === item.id}
            onClick={() => handleItemClick(item)}
            sx={{
              "&:hover": {
                border: "1px solid #132968",
              },
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor:
                  selectedItem === item.id ? "#132968" : "inherit",
              }}
            >
              <ListItemIcon sx={{ color: "#FFFFFF" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="logoADMIN" style={logoADMINStyle}>
        <img src={Logo} alt="AppLogo" width="180" height="64"></img>
        <span style={AdminfontspanStyle}> Admin Portal</span>
      </div>
    </Drawer>
  );
};

export default Navbar;
