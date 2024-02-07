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

function AdminRoutes() {
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
            </Route>
            <Route path="busmanagement">
              <Route index element={<BusManagement />} />
              <Route path="addbus" element={<FormBus />} />
            </Route>
          </Route>
          <Route
            path="announcementanddelayreports"
            element={<AnnouncementandDelayReportsAdmin />}
          />
          <Route path="employees" element={<Employees />} />
          <Route path="packagetransfer" element={<Package />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminRoutes;
