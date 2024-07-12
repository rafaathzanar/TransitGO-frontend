import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { Typography } from "@mui/material";
import RampRightIcon from "@mui/icons-material/RampRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import axios from "axios";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoadingCharacterComponent from "../../components/LoadingComponent/LoadingCharacterComponent";

function DashboardElement() {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(null);
  const [emp, setEmp] = useState(null);
  const [bus, setBus] = useState(null);

  const loadNumber = async () => {
    try {
      const user = await axios.get(
        "http://localhost:8080/admin/users",
        Authorization
      );
      const users = user.data.userList || [];
      const employee = users.filter((user) => user.type === "employee");
      setUser(users.length);
      setEmp(employee.length);

      const route = await axios.get(
        "http://localhost:8080/busroutes",
        Authorization
      );
      const routes = route.data || [];
      setRoute(routes.length);

      const bus = await axios.get("http://localhost:8080/buses");
      const buses = bus.data || [];
      setBus(buses.length);
    } catch (error) {
      console.error("Error loading feed:", error);
    }
  };

  const [adminData, setAdminInfo] = useState({
    uname: "",
  });

  const getAdminInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const type = response.data.type;
      if (type === "admin") {
        setAdminInfo({
          uname: response.data.uname,
        });
      }
    } catch (error) {
      console.log("Error Fetching user information : ", error);
    }
  };

  useEffect(() => {
    getAdminInfo();
    loadNumber();
  }, []);

  return (
    <>
      <div className="welcomeAdmin">
        <AdminPanelSettingsIcon style={{ fontSize: 50 }} />
        <h1>
          Welcome, <span style={{ color: "red" }}>{adminData.uname}</span>
        </h1>
      </div>
      <div className="main-container-hash">
        <div className="main-cards-hash">
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography variant="inherit">
                <h3>TOTAL USERS</h3>
              </Typography>
              <PeopleAltIcon className="card_icon-hash" />
            </div>
            {user !== null ? <h1>{user}</h1> : <LoadingCharacterComponent />}
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <h3>TOTAL ROUTES</h3>
              <RampRightIcon className="card_icon-hash" />
            </div>
            {route !== null ? <h1>{route}</h1> : <LoadingCharacterComponent />}
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                <h3>BUS EMPLOYEES</h3>
              </Typography>
              <BsPeopleFill className="card_icon-hash" />
            </div>
            {emp !== null ? <h1>{emp}</h1> : <LoadingCharacterComponent />}
          </div>
          <div className="card-hash">
            <div className="card-inner-hash">
              <Typography>
                <h3>TOTAL BUSES</h3>
              </Typography>
              <DirectionsBusFilledIcon className="card_icon-hash" />
            </div>
            {bus !== null ? <h1>{bus}</h1> : <LoadingCharacterComponent />}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardElement;
