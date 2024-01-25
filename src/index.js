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
import AnnouncementandDelayReports from "./pages/AnnouncementandDelayReports/AnnouncementandDelayReports";

import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Navbar />
      <CornerProfileButton />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="routeschedule" element={<RouteandSchedule />} />
          <Route path="packagetransfer" element={<Package />} />
          <Route
            path="announcementdelayreports"
            element={<AnnouncementandDelayReports />}
          />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
