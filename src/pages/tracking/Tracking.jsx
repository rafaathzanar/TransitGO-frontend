import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/heading";
import "./tracking.css";
import { Stack, TextField } from "@mui/material";
import map from "../../components/assets/Basemap image.png";
import Tline from "../../components/Destination/Destination";
import axios from "axios";

function Tracking({ busID }) {
  const [lastLeftStop, setLastLeftStop] = useState(null);
  const [nextLocation, setNextLocation] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bus/${busID}`,
          {}
        );
        setLastLeftStop(response.data.lastLeftStop);
        setNextLocation(response.data.nextLocation);
      } catch (error) {
        console.error("Error fetching tracking data:", error.message);
      }
    };

    fetchTrackingData();
  }, [busID]);

  return (
    <div className="content">
      <div className="header">
        <p className="p1">TRACK PACKAGE</p>
        <Heading className="h1" text="Want to track your belonging?" />
      </div>
      <div className="search">
        <TextField
          className="t1"
          label="Your parcel's tracking ID"
          size="small"
          sx={{ minWidth: 600 }}
        />
      </div>
      <div className="track">
        {/* <img className="im1" src={map} />
        <div className="tline">
          <Tline />
        </div> */}
        <div className="location-info">
          <div className="last-left-stop">{lastLeftStop}</div>
          <div className="next-location">{nextLocation}</div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
