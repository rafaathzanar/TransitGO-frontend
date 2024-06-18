import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router";


const CornerProfileButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    if (route === "/signin"){
      localStorage.removeItem('token');
      navigate(`${route}`);
    }
    navigate(`${route}`);
    // Perform actions based on the clicked menu item, e.g., navigate to a route
    console.log(`Navigating to ${route}`);
    // Close the menu if needed
    handleClose();
  };

  const StylecornerButtonContainer = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 1000,
  };


  //Get Admin data 
  const [adminData, setAdminInfo] = useState({
    uname: '',
    id: ''
   });

  const getAdminInfo = async(e) =>{
    try{
       const token = localStorage.getItem('token');
       const response = await axios.get("http://localhost:8080/user/profile",{
          headers: {Authorization: `Bearer ${token}`}
       });
       const type = response.data.type;
       if ( type === "admin"){
       //const userInfo = response.data.user;
       setAdminInfo({
          uname: response.data.uname,
          id: response.data.id
       });
      }
       
    }catch(error){
       console.log("Error Fetching user information : ", error);
    }
 };

 useEffect(() => {
  getAdminInfo();
},[]);


  return (
    <div style={StylecornerButtonContainer}>
      <IconButton color="primary" onClick={handleClick}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      {/* <IconButton aria-label="delete" size="large">
        <DeleteIcon fontSize="inherit" />
      </IconButton> */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // Style for the entire menu (optional)
        PaperProps={{
          style: {
            backgroundColor: "#ffffff", // Background color of the menu
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Box shadow
          },
        }}
      >
        <div>
          <Typography variant="subtitle1"><span style={{color:"#FA6B6B"}}> {adminData.uname}</span></Typography>
          <Typography variant="body2">admin id: <span style={{color:"#FA6B6B"}}>{adminData.id}</span></Typography>
        </div>
        {/* <MenuItem onClick={() => handleMenuItemClick("/")}>
          <ManageAccountsIcon style={{ marginRight: "8px", color: "#555" }} />
          Profile
        </MenuItem> */}
        <MenuItem onClick={() => handleMenuItemClick("/")}>
          <HomeIcon style={{ marginRight: "8px", color: "#555" }} />
          Home
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/signin")}>
          <ExitToAppIcon style={{ marginRight: "8px", color: "#555" }} />
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CornerProfileButton;
