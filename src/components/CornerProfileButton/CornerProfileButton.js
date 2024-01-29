import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const CornerProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
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
          <Typography variant="subtitle1">Admin Name</Typography>
          <Typography variant="body2">admin id: ##</Typography>
        </div>
        <MenuItem onClick={() => handleMenuItemClick("profile")}>
          <ManageAccountsIcon style={{ marginRight: "8px", color: "#555" }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("home")}>
          <HomeIcon style={{ marginRight: "8px", color: "#555" }} />
          Home
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("sign-out")}>
          <ExitToAppIcon style={{ marginRight: "8px", color: "#555" }} />
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CornerProfileButton;
