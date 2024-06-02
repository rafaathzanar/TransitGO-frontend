import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import PageRoutes from "./PageRoutes";
import LoginGeneralUser from "./pages/LoginGeneralUser/LoginGeneralUser";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LoginBusEmployee from "./pages/LoginBusEmployee/LoginBusEmployee";

import ActivityHistory from './pages/ActivityHistory/AvtivityHistory';
import GeneralUserProfile from './pages/GeneralUserProfile/GeneralUserProfile';
import FormEditEmployee from "./pages/FormEditEmployee/FormEditEmployee";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import EmailVerificationSend from "./pages/EmailVerificationSend/EmailVerificationSend";
import EmailVerificationResult from "./pages/EmailVerificationResult/EmailVerificationResult";
import SuccessComponent from "./pages/EmailVerificationResult/SuccessComponent";
import FailComponent from "./pages/EmailVerificationResult/FailComponenet";






function App() {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<PageRoutes />} />
          <Route path="/signin" element={<LoginGeneralUser />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signin-employee" element={<LoginBusEmployee />} />
          <Route path="/LoginBusEmployee" element={<LoginBusEmployee/>}/>
          <Route path="/LoginGeneralUser" element={<LoginGeneralUser/>}/>
          <Route path="/EmailVerification" element={<EmailVerification/>}/>

         <Route path="/ActivityHistory" element={<ActivityHistory/>}/>
         <Route path="/GeneralUserProfile" element={<GeneralUserProfile/>}/>
         <Route path="/edituser/:id" element={<FormEditEmployee/>}/>
         <Route path="/verifyEmail" element={<EmailVerificationSend/>}/>
         <Route path="/verify" element={<EmailVerificationResult/>}/>
         <Route path="/SuccessComponent" element={<SuccessComponent/>}/>
         <Route path="/FailComponent" element={<FailComponent/>}/>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
