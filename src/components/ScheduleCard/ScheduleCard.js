import React from "react";
import busImg from "../../logo/image 1.png";
import { Card, CardContent } from "@mui/material";

import "./ScheduleCard.css";
import { Link } from "react-router-dom";

function ScheduleCard({ busID = "REXY101" }, { routeNo = "101" }) {
  const headbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#071E60",
    height: "32px",
    color: "white",
    borderRadius: 6,
  };
  const middlePartStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const footerbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#071E60",
    borderRadius: 6,
  };

  return (
    <>
      <Card className="schedule-card">
        <CardContent className="schedule-card-content">
          <div className="header-bar" style={headbarStyle}>
            <div style={{ fontSize: "15px", paddingLeft: 15 }}>
              <p>Bus ID: {busID}</p>
            </div>
            <div style={{ fontSize: "15px", paddingRight: 15 }}>
              <p>Route No: {routeNo}</p>
            </div>
          </div>
          <div className="middle-bar" style={middlePartStyle}>
            <div>
              <img src={busImg} style={{ position: "relative" }} />
            </div>
            <div>
              <p style={{ marginBottom: -10, fontSize: 15 }}>From:</p>
              <p>Colombo</p>
              <p>9.00AM</p>
            </div>

            <p className="duration" style={{ textAlign: "center", margin: 20 }}>
              4 Hours and 30 Minutes
            </p>

            <div>
              <p style={{ marginBottom: -10, fontSize: 15 }}>To:</p>
              <p>Galle</p>
              <p>11.00AM</p>
            </div>
            <Link to="/reviews">Review & ReviewRating</Link>
          </div>
          <div className="footer-bar" style={footerbarStyle}>
            <div className="cringe" style={{ padding: 5, fontWeight: "bold" }}>
              <p
                style={{
                  backgroundColor: "#90EE90",
                  padding: 2,
                  borderRadius: 6,
                }}
              >
                Got off from "Pettah" at 8.55 PM
              </p>
            </div>
            <div>
              <select
                className="select-option"
                defaultValue=""
                displayEmpty
                style={{
                  width: "250px",
                  height: "20px",
                  backgroundColor: "white",
                }}
              >
                <option>Arrival at Colombo 9.00 PM</option>
                <option>Arrival at Kollupitiya 9.15 PM</option>
                <option>Arrival at Bambalapitiya 9.20 PM</option>
                <option>Arrival at Wellawatta 9.30 PM</option>
              </select>
            </div>
            <div className="cringe" style={{ padding: 5, fontWeight: "bold" }}>
              <p
                style={{
                  backgroundColor: "red",
                  padding: 6,
                  borderRadius: 15,
                }}
              >
                Delay: 10 min
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ScheduleCard;
