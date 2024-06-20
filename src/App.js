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
import ReviewRating from "./pages/ReviewRating/ReviewRating";
import MyLayout from "./components/MyLayout";
import GeneralUserProfile from "./pages/GeneralUserProfile/GeneralUserProfile";
import ActivityHistory from "./pages/ActivityHistory/AvtivityHistory";
import Dummy from "./dummy";
import EditCommentBox from './components/ReviewPage/EditCommentBox';

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
          <Route path="/reviews" element={<ReviewRating />} />
          <Route path="/reviews/:id" element={<EditCommentBox />} />
          <Route path="/profile" element={<GeneralUserProfile />} />
          <Route path="/activityhistory" element={<ActivityHistory />} />
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
