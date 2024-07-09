import React, { useEffect, useState } from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import axios from "axios";
import ScheduleCardConductor from "../../components/ScheduleCardConductor/ScheduleCardConductor";
import ScheduleCardOFF from "../../components/ScheduleCardOFF/ScheduleCardOFF";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConductorPage() {
  const [bus, setBus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      try {
        const empBusResponse = await axios.get(
          `http://localhost:8080/userBus/${id}`,
          Authorization
        );
        if (empBusResponse.data !== 0) {
          const busId = empBusResponse.data;
          console.log(busId);
          const response = await axios.get(
            `http://localhost:8080/bus/${busId}`,
            Authorization
          );
          console.log("bus response ", response.data);
          setBus(response.data);
        } else {
          console.log("Employee is not yet assigned with a bus");
        }
      } catch (error) {
        setError("Error fetching bus schedules. Please try again later.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadBus();
  }, [id]);

  useEffect(() => {
    if (bus.status === "off") {
      setOpenSnackbar(true);
    }
  }, [bus.status]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const marStyle = {
    paddingTop: "60px",
  };

  return (
    <div>
      <HeaderBar />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div style={marStyle}>
        {bus.regNo && bus.routeNo && bus.id && bus.status !== "off" && (
          <div
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 18,
            }}
          >
            <div
              style={{ textAlign: "center", marginTop: 10, color: "#071E60" }}
            >
              <h4>Start Your Journey</h4>
            </div>

            <ScheduleCardConductor
              busID={bus.id}
              busRegNo={bus.regNo}
              routeNo={bus.routeNo}
              direction={bus.status}
            />
          </div>
        )}

        {bus.status === "off" && (
          <div
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 18,
            }}
          >
            <div
              style={{ textAlign: "center", marginTop: 10, color: "#071E60" }}
            >
              <h4>Usual Bus Journey(s) For Today</h4>
            </div>
            {bus.regNo && bus.routeNo && bus.id && (
              <ScheduleCardOFF
                busID={bus.id}
                busRegNo={bus.regNo}
                routeNo={bus.routeNo}
                direction={"up"}
              />
            )}
            {bus.regNo && bus.routeNo && bus.id && (
              <ScheduleCardOFF
                busID={bus.id}
                busRegNo={bus.regNo}
                routeNo={bus.routeNo}
                direction={"down"}
              />
            )}
          </div>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Your Bus is not within the time range to start a journey or Today is a
          Off Day. Please come back around the start time of the journey.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ConductorPage;
