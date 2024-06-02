import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";

const EditRoute = () => {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    routeNo: "",
    routename: "",
    busStops: [],
  });

  useEffect(() => {
    fetchRouteData();
  }, []);

  const fetchRouteData = async () => {
    try {
      console.log("Route No:", id);
      console.log("route no form param is : ", id);
      const response = await axios.get(`http://localhost:8080/busroute/${id}`);
      console.log("response ", response.data);
      setRoute(response.data);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  useEffect(() => {
    console.log("Setted route ", route);
  }, [route]); // This will log whenever `route` changes

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
      await axios.put(`http://localhost:8080/busroute/${id}`, route);
      navigate("/admin/routeschedule/routemanagement");
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  return (
    <Grid container item xs={10}>
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="routeno"
                type="number"
                value={route.routeno}
                onChange={(e) => handleChange(e)}
                disabled // Disable editing route number
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Route Name"
                name="routename"
                value={route.routename}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Bus Stops</Typography>
              {route.busStops &&
                route.busStops.map((stop, index) => (
                  <div key={index}>
                    <TextField
                      fullWidth
                      label={`Stop ${index + 1}`}
                      value={stop.name || ""} // Ensure the value is defined or set it to an empty string
                      onChange={(e) => {
                        const updatedbusStops = [...route.busStops];
                        updatedbusStops[index] = {
                          ...updatedbusStops[index],
                          name: e.target.value,
                        };
                        setRoute((prevData) => ({
                          ...prevData,
                          busStops: updatedbusStops,
                        }));
                      }}
                      sx={{ marginTop: 2 }}
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
