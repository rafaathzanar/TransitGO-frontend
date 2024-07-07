//AdminRoute.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteandSchedule from "./pages/RouteandSchedule/RouteandSchedule";
import AnnouncementandDelayReportsAdmin from "./pages/AnnouncementandDelayReportsAdmin/AnnouncementandDelayReportsAdmin";
import Employees from "./pages/Employees/Employees";
import Package from "./pages/Package/Package";
import DashboardElement from "./pages/Dashboard/Dashboard";
import LayoutAdmin from "./LayoutAdmin";
import RouteManagement from "./pages/RouteManagement/RouteManagement";
import BusManagement from "./pages/BusManagement/BusManagement";
import FormBus from "./pages/FormBus/FormBus";
import FormRoute from "./pages/FormRoute/FormRoute";
import FormAddEmployee from "./pages/FormAddEmployee/FormAddEmployee";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import axios from "axios";
import { useState, useEffect } from "react";
import EditRoute from "./pages/FormRoute/EditRoute";
import EditBus from "./pages/FormBus/EditBus";
import BusTimeTable from "./pages/BusTimeTable/BusTimeTable";
import StopManagement from "./pages/StopManagement/StopManagement";
import FormStop from "./pages/FormStop/FormStop";
import FormEditEmployee from "./pages/FormEditEmployee/FormEditEmployee";
import Location from "./pages/Location/Location";
import FormAddAdmin from "./pages/FormAddAdmin/FormAddAdmin";

function AdminRoutes() {
  console.log("Rendering LayoutAdmin");
  const [profileInfo, setProfileInfo] = useState({});

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileInfo(response.data);
    } catch (error) {
      console.log("Error Fetching admin profile information: ", error);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  return (
    <>
      <LayoutAdmin></LayoutAdmin>
      <div style={{ marginLeft: "16%", marginTop: "6%" }}>
        <Routes>
          <Route index element={<DashboardElement />} />
          <Route path="routeschedule">
            <Route index element={<RouteandSchedule />} />
            <Route path="routemanagement">
              <Route index element={<RouteManagement />} />
              <Route path="addroute" element={<FormRoute />} />
              <Route path="editroute/:id" element={<EditRoute />} />
            </Route>
            <Route path="busmanagement">
              <Route index element={<BusManagement />} />
              <Route path="bustimetable/:busId" element={<BusTimeTable />} />
              <Route path="addbus" element={<FormBus />} />
              <Route path="editbus/:id" element={<EditBus />} />
            </Route>
            <Route path="stopmanagement">
              <Route index element={<StopManagement />} />
              <Route path="addstop" element={<FormStop />} />
            </Route>
            <Route path="employees"></Route>
          </Route>
          <Route
            path="announcementanddelayreports"
            element={<AnnouncementandDelayReportsAdmin />}
          />
          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="addemployee" element={<FormAddEmployee />} />
            <Route path="edituser/:id" element={<FormEditEmployee />} />
            <Route path="adminAdd" element={<FormAddAdmin />} />
          </Route>

          <Route path="locationmanagement">
            <Route index element={<Location />} />
            <Route path="stopmanagement">
              <Route index element={<StopManagement />} />
              <Route path="addstop" element={<FormStop />} />
            </Route>
          </Route>

          <Route path="packagetransfer" element={<Package />} />

          <Route
            path="ProfileForm"
            element={
              <ProfileForm
                profileInfo={profileInfo}
                setProfileInfo={setProfileInfo}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default AdminRoutes;
