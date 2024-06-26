import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import DelayInput from "../../components/Delay/DelayInput/DelayInputCon"
import DelayList from '../../components/Delay/DelayList/DelayList'
import './AnnouncementDelayConductor.css'
import DelayInputCon from '../../components/Delay/DelayInput/DelayInputCon';


function AnnouncementandDelayReportsConductor() {


  const [Delay, setNewDelay] = useState([
    { text: '"We are sorry to announce that all bus services from Pettah are currently delayed by 20 minutes. This is due to an unexpected incident on the route. We are working to resolve the issue as quickly as possible and will keep you updated. Thank you for your understanding."', id: 'g1' },
    { text: '"Traffic congestion causing delays. Next bus expected at 10:45."', id: 'g2' }
  ]);

  const addDelayHandler = enteredText => {
    setNewDelay(prevdelay => {
      const updateddelay = [...prevdelay];
      updateddelay.unshift({ text: enteredText, id: Math.random().toString() });
      return updateddelay;
    });
  };

  const deleteItemHandler = delayId => {
    setNewDelay(prevdelay => {
      const updateddelay = prevdelay.filter(delay => delay.id !== delayId);
      return updateddelay;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No Announcemet found. Maybe add one?</p>
  );

  if (Delay.length > 0) {
    content = (
      <DelayList items={Delay} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <Grid item xs={10}>
      <div>
      <section id="goal-form1">
        <DelayInputCon onAddGoal={addDelayHandler}  />
      </section>
      </div>
      <section id="goals1">
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </Grid>
  );
}

export default AnnouncementandDelayReportsConductor;