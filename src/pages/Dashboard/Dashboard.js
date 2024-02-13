import { Dashboard } from "@mui/icons-material";
import "./Dashboard.css";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";

import BasicPie from "../../components/PieChart/PieChart";
import { Typography } from "@mui/material";
import RampRightIcon from "@mui/icons-material/RampRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
function DashboardElement() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <BasicPie></BasicPie>
      <div className="main-container">
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <Typography variant="inherit">
                <h3>TOTAL USERS</h3>
              </Typography>
              <PeopleAltIcon className="card_icon" />
            </div>
            <h1>300</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>TOTAL ROUTES</h3>

              <RampRightIcon className="card_icon" />
            </div>
            <h1>12</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <Typography>
                <h3>BUS EMPLOYEES</h3>
              </Typography>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>33</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <Typography>
                {" "}
                <h3>TOTAL BUSES </h3>
              </Typography>
              <DirectionsBusFilledIcon className="card_icon" />
            </div>
            <h1>42</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardElement;
