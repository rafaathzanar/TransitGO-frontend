import React from "react";
import busImg from "../../logo/image 1.png";
import { Typography, Card, CardContent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function ScheduleCard({ busID = "REXY101" }, { routeNo = "101" }) {
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
    alignItems: "center",
    backgroundColor: "#FA6B6B",
  };

  return (
    <>
      <Card
        style={{
          width: "70%",
          marginLeft: "15%",
          marginTop: "40px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent
          style={{
            background: "linear-gradient(to right, lightblue, white)",
          }}
        >
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
            <div>
              <Select
                defaultValue=""
                displayEmpty
                style={{
                  width: "400px",
                  height: "35px",
                  backgroundColor: "white",
                }}
              >
                <MenuItem>Arrival at Colombo 9.00 PM</MenuItem>
                <MenuItem>Arrival at Kollupitiya 9.15 PM</MenuItem>
                <MenuItem>Arrival at Bambalapitiya 9.20 PM</MenuItem>
                <MenuItem>Arrival at Wellawatta 9.30 PM</MenuItem>
              </Select>
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
        </CardContent>
      </Card>
    </>
  );
}

export default ScheduleCard;
