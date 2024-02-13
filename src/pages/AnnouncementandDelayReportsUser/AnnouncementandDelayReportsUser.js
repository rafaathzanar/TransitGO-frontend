import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DelayReport from "../../components/Delay/DelayReport/DelayReport";
import DelayList from "../../components/Delay/DelayList/DelayList";
import "./AnnouncementDelayUser.css";
import Select from "../../components/UI/select/Select";
import Button from "../../components/UI/Button/Button";

function AnnouncementandDelayReportsUser() {
  // const [Delay, setNewDelay] = useState([
  //   { text: '"We are sorry to announce that all bus services from Pettah are currently delayed by 20 minutes. This is due to an unexpected incident on the route. We are working to resolve the issue as quickly as possible and will keep you updated. Thank you for your understanding."', id: 'g1' },
  //   { text: '"Traffic congestion causing delays. Next bus expected at 10:45."', id: 'g2' }
  // ]);

  // const addDelayHandler = enteredText => {
  //   setNewDelay(prevdelay => {
  //     const updateddelay = [...prevdelay];
  //     updateddelay.unshift({ text: enteredText, id: Math.random().toString() });
  //     return updateddelay;
  //   });
  // };

  // const deleteItemHandler = delayId => {
  //   setNewDelay(prevdelay => {
  //     const updateddelay = prevdelay.filter(delay => delay.id !== delayId);
  //     return updateddelay;
  //   });
  // };

  let content = (
    <p style={{ textAlign: "center" }}>No Announcement found. Maybe add one?</p>
  );

  // if (Delay.length > 0) {
  //   content = (
  //     <DelayList items={Delay} onDeleteItem={deleteItemHandler} />
  //   );
  // }

  return (
    // <Grid item xs={12} className="grid">

    <>
      <Grid container spacing={5}>
        <Grid
          item
          xl={5}
          lg={10}
          md={10}
          sm={12}
          xs={12}
          ml={10}
          mb={10}
          mr={5}
          className="grid"
        >
          <div className="ann">
            <div>
              <section id="goal-form">
                <div className="head">ANNOUNCEMENT</div>
                <DelayReport />
              </section>
            </div>
            <section id="goals">
              {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
            </section>
          </div>
        </Grid>

        <Grid
          item
          xl={5}
          lg={10}
          md={10}
          sm={12}
          xs={12}
          ml={10}
          mr={5}
          mb={10}
          className="grid"
        >
          <div className="rep">
            <div className="head">DELAY REPORT</div>
            <div>
              <div className="lab">
                <label className="lab">Select Bus</label>
                <Select sx={{ width: 600 }}></Select>
              </div>
              <div className="lab">
                <label>Delay Time</label>
                <Select></Select>
              </div>
              <div className="lab">
                <label>Delay Reason</label>
                <Select style={{ backgroundColor: "white" }} />
              </div>
            </div>
            <div className="but">
              <Button type="submit">Submit Delay</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>

    // </Grid>
  );
}

export default AnnouncementandDelayReportsUser;
