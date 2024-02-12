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
import LostFound from "./pages/LostFound/LostFound";
import LostItem from "./pages/LostFound/LostItem";
import FoundItemPage from "./pages/LostFound/FoundItem";
import FoundForm from "./pages/LostFound/FoundForm";
import LostForm from "./pages/LostFound/LostForm";

import LoginBusEmployee from "./pages/LoginBusEmployee/LoginBusEmployee";
import LoginGeneralUser from "./pages/LoginGeneralUser/LoginGeneralUser";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import EmailVerification from './pages/EmailVerification/EmailVerification';
import SignUp from './pages/SignUp/SignUp';
import ManageBusEmployee from "./pages/ManageBusEmployee/ManageBusEmployee";
import NewPassword from "./pages/NewPassword/NewPassword";


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
          <Route path="lostandfound">
            <Route index element={<LostFound />} />
            <Route path="lostitem" element={<LostItem />} />
            <Route path="founditem" element={<FoundItemPage />} />
            <Route path="lostfoundreport" element={<FoundForm />} />
            <Route path="lostfoundreport2" element={<LostForm />} />
          </Route>

          <Route>
            <Route path="/LoginBusEmployee" element={<LoginBusEmployee/>}/>
            <Route path="/LoginGeneralUser" element={<LoginGeneralUser/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/EmailVerification" element={<EmailVerification/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/ManageBusEmployee" element={<ManageBusEmployee/>}/>
            <Route path="/NewPassword" element={<NewPassword/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
