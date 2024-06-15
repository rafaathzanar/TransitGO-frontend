import "./Dashboard.css";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";

import { Typography } from "@mui/material";
import RampRightIcon from "@mui/icons-material/RampRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
function DashboardElement() {
  return (
    <>
      <div className="main-container-hash">
        <div className="main-cards-hash">
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography variant="inherit">
                <h3>TOTAL USERS</h3>
              </Typography>
              <PeopleAltIcon className="card_icon-hash" />
            </div>
            <h1>300</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <h3>TOTAL ROUTES</h3>

              <RampRightIcon className="card_icon-hash" />
            </div>
            <h1>12</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                <h3>BUS EMPLOYEES</h3>
              </Typography>
              <BsPeopleFill className="card_icon-hash" />
            </div>
            <h1>33</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                {" "}
                <h3>TOTAL BUSES </h3>
              </Typography>
              <DirectionsBusFilledIcon className="card_icon-hash" />
            </div>
            <h1>42</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardElement;
