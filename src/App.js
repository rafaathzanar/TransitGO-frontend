// App.js
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import HomePage from "./pages/HomePage/HomePage";
import RouteEditPage from "./pages/RouteEditPage/RouteEditPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import BusSchedule from "./pages/BusSchedule/BusSchedule";
import ScheduleCard from "./components/ScheduleCard/ScheduleCard";
import AnnouncementandDelayReportsConductor from "./pages/AnnouncementandDelayReportsConductor/AnnouncementandDelayReportsConductor";
import AnnouncementandDelayReportsUser from "./pages/AnnouncementandDelayReportsUser/AnnouncementandDelayReportsUser";
function App() {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="busschedule" element={<BusSchedule />} />
          <Route path="/routeeditpage" element={<RouteEditPage />} />
          <Route path="announcementanddelay">
            <Route index element={<AnnouncementandDelayReportsConductor />} />
            <Route
              path="report"
              element={<AnnouncementandDelayReportsUser />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
