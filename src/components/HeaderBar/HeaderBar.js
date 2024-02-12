import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../logo/logo.png";
import { useNavigate } from "react-router";

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" style={{ zIndex: 100000, top: 0 }} width="100%">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={Logo}
            width="216px"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                display: { xs: "block", md: "none" },
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderBar;
