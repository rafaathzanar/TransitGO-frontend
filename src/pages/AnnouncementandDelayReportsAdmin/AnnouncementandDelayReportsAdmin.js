import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DelayInput from "../../components/Delay/DelayInput/DelayInput";
import DelayList from "../../components/Delay/DelayList/DelayList";
import "./AnnouncementDelayReports.css";

function AnnouncementandDelayReportsAdmin() {
  const [delayList, setDelayList] = useState([]);

  const addDelayHandler = (newDelay) => {
    console.log("shot");
    setDelayList((prevDelays) => [newDelay, ...prevDelays]);
  };

  return (
    <Grid item xs={10}>
      <section id="goal-form1">
        <DelayInput onAddGoal={addDelayHandler} />
        
      </section>
      <Grid item xs={12}>
        <section id="goals1">
          <DelayList delayList={delayList} setDelayList={setDelayList} />
        </section>
      </Grid>
    </Grid>
  );
}

export default AnnouncementandDelayReportsAdmin;
