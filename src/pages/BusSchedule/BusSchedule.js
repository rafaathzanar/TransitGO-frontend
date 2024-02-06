import React from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import SearchField from "../../components/SearchField/SearchField";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import ScheduleCard from "../../components/ScheduleCard/ScheduleCard";
function BusSchedule() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <ScheduleSearchBar></ScheduleSearchBar>
      <ScheduleCard></ScheduleCard>
      <ScheduleCard></ScheduleCard>
      <ScheduleCard></ScheduleCard>
      <ScheduleCard></ScheduleCard>
    </div>
  );
}

export default BusSchedule;
