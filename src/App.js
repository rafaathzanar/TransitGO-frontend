import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <Grid container>
      <Outlet />
    </Grid>
  );
}

export default App;
