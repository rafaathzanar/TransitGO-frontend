import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "./CornerProfileButton.css";

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
    if (route === "/signin") {
      fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            localStorage.clear();
            navigate(`${route}`);
            console.log("Logout success");
          } else {
            console.log("logout failed");
          }
        })
        .catch((error) => {
          console.error("Error during logout", error);
        });
    } else {
      navigate(`${route}`);
      console.log(`Navigating to ${route}`);
      handleClose();
    }
  };

  const [adminData, setAdminInfo] = useState({
    uname: "",
    id: "",
  });

  const getAdminInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const type = response.data.type;
      if (type === "admin") {
        setAdminInfo({
          uname: response.data.uname,
          id: response.data.id,
        });
      }
    } catch (error) {
      console.log("Error Fetching user information : ", error);
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <div className="corner-button-container">
      <IconButton color="primary" onClick={handleClick}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <div className="menu-header">
          <Typography variant="subtitle1">
            <span className="admin-name">{adminData.uname}</span>
          </Typography>
          <Typography variant="body2">
            admin id: <span className="admin-id">{adminData.id}</span>
          </Typography>
        </div>
        <MenuItem onClick={() => handleMenuItemClick("/")}>
          <HomeIcon className="menu-icon" />
          Home
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/signin")}>
          <ExitToAppIcon className="menu-icon" />
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CornerProfileButton;
