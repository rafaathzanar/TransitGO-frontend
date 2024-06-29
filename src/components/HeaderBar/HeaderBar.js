import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../logo/logo.png";
import { useNavigate} from "react-router";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useEffect } from "react";



const pages = [
  { displayName: "Home", routePath: "/" },
  { displayName: "Bus Schedules", routePath: "/busschedule" },
  { displayName: "Lost and Found", routePath: "/lostandfound" },
  { displayName: "Package Transfer", routePath: "/packagetransfer" },
  { displayName: "Announcements", routePath: "/announcementanddelay" },
  
];

function HeaderBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  

  //profile detail
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState({
    uname : "",
    type: ""
  });

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsername({
        uname : response.data.uname,
        type: response.data.type
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error Fetching admin profile information: ", error);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

   const handleSignOut = () =>{
     setIsLoggedIn(false);
     setUsername("");
     fetch("http://localhost:8080/api/v1/auth/logout",{
      method: "POST",
      headers: {
        "content-Type" :"application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => {
      if (response.ok){
        localStorage.clear();
        navigate("/signin");
        console.log("Logout success");
      }else{
        console.log("logout failed");
      }
    }).catch(error => {
      console.error("Error during logout", error);
    });
     
   };

  //---------------------------------------

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const isSmallScreen = useMediaQuery("(max-width:400px)");

  const logoWidth = isSmallScreen ? "150px" : "216px"; // Adjust the width based on the screen size

  return (
    <AppBar position="fixed" style={{ zIndex: 100000, top: 0 }} width="100%">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={Logo}
            width={logoWidth}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.routePath);
                  }}
                >
                  <Typography textAlign="center">{page.displayName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.displayName}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.routePath);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
              <Button 
              color="inherit"
              onClick={()=>{
                if(username.type === "admin"){
                  navigate("/admin");
                }else{
                  navigate("/profile");
                }
                
              }}
              sx={{mr:2}}
              >
               {username.uname}
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleSignOut}>
               Sign Out
              </Button>
              </>
            ):(
              <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                // Handle sign-in action
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
            )}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderBar;
