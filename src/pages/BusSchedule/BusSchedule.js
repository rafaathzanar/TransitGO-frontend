import React from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import SearchField from "../../components/SearchField/SearchField";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
function BusSchedule() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <ScheduleSearchBar></ScheduleSearchBar>
    </div>
  );
}

export default BusSchedule;
