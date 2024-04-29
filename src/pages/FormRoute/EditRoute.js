import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";

const EditRoute = () => {
  const { routeno } = useParams();
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    routeNo: "",
    routename: "",
    stops: [],
  });
  

  useEffect(() => {
  console.log("Route No:", routeno);
  const fetchRouteData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/busroute/${route.routeNo}`);
      const { routeno, routename, stops } = response.data;
      setRoute({ routeNo: routeno, routename, stops });
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };
  

  if (routeno) {
    fetchRouteData();
  }
}, [routeno]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/busroute/${routeno}`, route);
      navigate("/admin/routeschedule/routemanagement");
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Route No"
                name="routeno"
                type="number"
                value={route.routeno}
                onChange={(e) => handleChange(e)}
                disabled // Disable editing route number
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Route Name"
                name="routename"
                value={route.routename}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Stops</Typography>
              {route.stops.map((stop, index) => (
                <div key={index}>
                  <TextField
                    fullWidth
                    label={`Stop ${index + 1}`}
                    value={stop}
                    onChange={(e) => {
                      const updatedStops = [...route.stops];
                      updatedStops[index] = e.target.value;
                      setRoute((prevData) => ({
                        ...prevData,
                        stops: updatedStops,
                      }));
                    }}
                  />
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditRoute;
