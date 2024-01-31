import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import RouteandSchedule from "./pages/RouteandSchedule/RouteandSchedule";
import Package from "./pages/Package/Package";
import Employees from "./pages/Employees/Employees";
import AnnouncementandDelayReportsAdmin from "./pages/AnnouncementandDelayReportsAdmin/AnnouncementandDelayReportsAdmin";

import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";
import HomePage from "./pages/HomePage/HomePage";
import RouteManagement from "./pages/RouteManagement/RouteManagement";
import RouteEditPage from "./pages/RouteEditPage/RouteEditPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Dashboard />} />
          <Route path="/routeschedule" element={<RouteandSchedule />} />
          <Route
            path="announcementanddelayreportsadmin"
            element={<AnnouncementandDelayReportsAdmin />}
          />
          <Route path="employees" element={<Employees />} />
          <Route path="packagetransfer" element={<Package />} />
          <Route path="routemanagement" element={<RouteManagement />} />
          <Route path="RouteEditPage" element={<RouteEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
