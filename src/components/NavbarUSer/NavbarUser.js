import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavbarUserItems } from "./consts/NavbarUserItems";
import { useNavigate } from "react-router-dom";


const NavbarUser = () => {
  const UserfontspanStyle = {
    color: "#000000",
    fontSize: "16px",
  };

  const logoUSERStyle = {
    margin: "20px",
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  

  const drawerWidth = isSmallScreen ? 60 : "14%"; // Adjust the width based on the screen size

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    if(item.route == "/signin"){
      fetch("http://localhost:8080/api/v1/auth/logout",{
        method: "POST",
        headers: {
          "content-Type" :"application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        },
      }).then(response => {
        if (response.ok){
          localStorage.clear();
          navigate(item.route);
          console.log("Logout success");
        }else{
          console.log("logout failed");
        }
      }).catch(error => {
        console.error("Error during logout", error);
      });
    }
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
        {NavbarUserItems.map((item) => (
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
              {!isSmallScreen && <ListItemText primary={item.label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavbarUser;
