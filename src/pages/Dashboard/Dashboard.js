import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

import { Typography } from "@mui/material";
import RampRightIcon from "@mui/icons-material/RampRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import axios from "axios";
function DashboardElement() {
 const token = localStorage.getItem('token');
 const Authorization = {
  headers: { Authorization: `Bearer ${token}` },
}
 const [user, setUser] = useState('');
 const [route, setRoute] = useState('');
 const [emp, setEmp] = useState('');
 const [bus, setBus] = useState('');

 useEffect(() => {
  const loadNumber = async () => {
      try{
        const user = await axios.get("http://localhost:8080/admin/users",Authorization);
        const  users = user.data.userList || [];
        const employee = users.filter((user)=>user.type === "employee")
        setUser(users.length);
        setEmp(employee.length);

        const route = await axios.get("http://localhost:8080/busroutes",Authorization);
        const routes = route.data || [];
        setRoute(routes.length);

        const bus = await axios.get("http://localhost:8080/buses");
        const buses = bus.data || [];
        setBus(buses.length);

      }catch(error){
        console.error("Error loading feed:", error);
      }
  }
  loadNumber();

 },[Authorization])

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
            <h1>{user}</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <h3>TOTAL ROUTES</h3>

              <RampRightIcon className="card_icon-hash" />
            </div>
            <h1>{route}</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                <h3>BUS EMPLOYEES</h3>
              </Typography>
              <BsPeopleFill className="card_icon-hash" />
            </div>
            <h1>{emp}</h1>
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                {" "}
                <h3>TOTAL BUSES </h3>
              </Typography>
              <DirectionsBusFilledIcon className="card_icon-hash" />
            </div>
            <h1>{bus}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardElement;
