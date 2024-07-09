//ScheduleCard.js
import React, { useEffect, useRef, useState } from "react";
import busImg from "../../logo/image 1.png";
import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function ScheduleCardOFF({ busID, busRegNo, routeNo, direction }) {
  const [schedules, setSchedules] = useState([]);
  const [fromSchedule, setFromSchedule] = useState(null);
  const [toSchedule, setToSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bus/${busID}/stops`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        let stops = response.data.map((stop) => {
          return {
            stop: stop["busStop"]["name"],
            arraivalTime: stop["arrivalTime"],
            departureTime: stop["departureTime"],
          };
        });
        console.log("all stops", stops);
        console.log("response data", response.data);
        setSchedules(response.data);
        console.log("schedulessssssss", response.data);
      } catch (error) {
        setError("Error fetching bus schedules.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  useEffect(() => {
    console.log("Schedules", schedules);
    if (schedules.length > 0) {
      const filteredSchedules = schedules.filter(
        (schedule) => schedule.direction === direction
      );
      console.log("filtered schedule", filteredSchedules);
      const filteredStopTimes = filteredSchedules.map((schedule) => {
        return {
          arrivalTime: schedule.arrivalTime,
          departureTime: schedule.departureTime,
          busStop: schedule.busStop,
        };
      });

      console.log("filteredStopTimes:", filteredStopTimes);

      setFromSchedule(filteredStopTimes[0].busStop.name);
      setToSchedule(
        filteredStopTimes[filteredStopTimes.length - 1].busStop.name
      );
    }
  }, [schedules]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.direction === direction
  );

  const fromTime = filteredSchedules[0].departureTime;

  return (
    <Card className="schedule-card">
      <CardContent className="schedule-card-content">
        <div className="header-bar" style={headbarStyle}>
          <div style={{ fontSize: "15px", paddingLeft: 15 }}>
            <p>Bus: {busRegNo}</p>
          </div>
          <div style={{ fontSize: "15px", paddingRight: 15 }}>
            <p>Route No: {routeNo}</p>
          </div>
        </div>
        <div className="middle-bar" style={middlePartStyle}>
          <div>
            <img src={busImg} style={{ position: "relative" }} alt="Bus" />
          </div>
          <div>
            <p style={{ marginBottom: -10, fontSize: 15 }}>From:</p>
            <p>{fromSchedule}</p>
          </div>
          <p className="duration" style={{ textAlign: "center", margin: 20 }}>
            Journey Starts at {fromTime}
          </p>
          <div>
            <p style={{ marginBottom: -10, fontSize: 15 }}>To:</p>
            <p>{toSchedule}</p>
          </div>
        </div>
        <div className="footer-bar" style={footerbarStyle}>
          <div>
            <select
              className="select-option"
              defaultValue=""
              displayEmpty
              style={{
                width: "350px",
                height: "40px",
                backgroundColor: "white",
              }}
            >
              {filteredSchedules.map((schedule, index) => {
                console.log("filteredSchedules:", filteredSchedules);

                return (
                  <option key={index}>
                    {index === 0
                      ? `${schedule.busStop.name} - Departure: ${schedule.departureTime}`
                      : `${schedule.busStop.name} - Arrival: ${schedule.arrivalTime}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const headbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#071E60",
  height: "32px",
  color: "white",
  borderRadius: "6px 6px 0 0",
};
const middlePartStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const footerbarStyle = {
  alignItems: "center",
  backgroundColor: "#071E60",
  borderRadius: " 0 0 6px 6px",
};

export default ScheduleCardOFF;
