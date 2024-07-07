import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BusSchedule from "./pages/BusSchedule/BusSchedule";
import AnnouncementandDelayReportsConductor from "./pages/AnnouncementandDelayReportsConductor/AnnouncementandDelayReportsConductor";
import AnnouncementandDelayReportsUser from "./pages/AnnouncementandDelayReportsUser/AnnouncementandDelayReportsUser";
import LostFound from "./pages/LostFound/LostFound";
import LostItem from "./pages/LostFound/LostItem";
import FoundItemPage from "./pages/LostFound/FoundItem";
import FoundForm from "./pages/LostFound/FoundForm";
import LostForm from "./pages/LostFound/LostForm";
import Main from "./pages/firstpage/Main";
import Tracking from "./pages/tracking/Tracking";
import Form from "./pages/form/Form";

import FormConductor from "./pages/FormConductor/FormConductor";
import ReviewRating from "./pages/ReviewRating/ReviewRating";
import EditFoundForm from "./components/LostAndFound/EditFoundForm";
import EditLostForm from "./components/LostAndFound/EditLostForm";
import EditCommentBox from "./components/ReviewPage/EditCommentBox";

function PageRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="busschedule">
          <Route index element={<BusSchedule />} />
          <Route path="reviews/:busID" element={<ReviewRating />} />
          <Route path="reviewsedit/:id" element={<EditCommentBox />} />
        </Route>

        <Route path="announcementanddelay">
          <Route index element={<AnnouncementandDelayReportsUser />} />
        </Route>
        <Route path="lostandfound">
          <Route index element={<LostFound />} />
          <Route path="lostitem" element={<LostItem />} />
          <Route path="founditem" element={<FoundItemPage />} />
          <Route path="lostfoundreport" element={<FoundForm />} />
          <Route path="lostfoundreport2" element={<LostForm />} />
          <Route path="lostfoundreport/:id" element={<EditFoundForm />} />
          <Route path="lostfoundreport2/:id" element={<EditLostForm />} />
        </Route>
        <Route path="packagetransfer">
          <Route index element={<Main />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="form" element={<Form />} />
          <Route path="FormConductor" element={<FormConductor />} />
        </Route>
      </Routes>
    </>
  );
}

export default PageRoutes;
