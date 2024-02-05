import React from "react";
import busImg from "../../logo/image 1.png";
import { Typography } from "@mui/material";

function ScheduleCard({ busID = "REXY101" }, { routeNo = "101" }) {
  const containerStyle = {
    width: "70%",
    marginLeft: "15%",
  };
  const headbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#FA6B6B",
  };
  const middlePartStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const footerbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#FA6B6B",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={headbarStyle}>
          <div style={{ padding: 10, fontSize: "20px" }}>
            <p>Bus ID: {busID}</p>
          </div>
          <div style={{ padding: 10, fontSize: "20px" }}>
            <p>Route No: {routeNo}</p>
          </div>
        </div>
        <div style={middlePartStyle}>
          <div>
            <img src={busImg} />
          </div>
          <div>
            <Typography variant="h5">
              <p>Colombo</p>
              <p>9.00AM</p>
            </Typography>
          </div>
          <div style={{ alignItems: "center" }}>
            <p style={{ textAlign: "center" }}>
              •••••••••••••••••••••••••••••••••••••••••••••••••••
            </p>
            <Typography variant="h6">
              {" "}
              <p style={{ textAlign: "center" }}>4 Hours and 30 Minutes</p>
            </Typography>
          </div>
          <div>
            <Typography variant="h5">
              <p>Colombo</p>
              <p>9.00AM</p>
            </Typography>
          </div>
          <a href="#">Review & Ratings</a>
        </div>
        <div style={footerbarStyle}>
          <div style={{ padding: 5, fontSize: "12px", fontWeight: "bold" }}>
            <Typography>
              <p
                style={{
                  backgroundColor: "#90EE90",
                  padding: 2,
                  fontSize: "14px",
                }}
              >
                Got off from "Pettah" at 8.55 PM
              </p>
            </Typography>
          </div>
          <div style={{ padding: 5, fontSize: "12px", fontWeight: "bold" }}>
            <Typography>
              <p
                style={{
                  backgroundColor: "red",
                  padding: 2,
                  fontSize: "14px",
                }}
              >
                Delay 10 Minutes
              </p>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleCard;
