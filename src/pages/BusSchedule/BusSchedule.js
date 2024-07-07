import React, { useEffect, useState } from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import ScheduleCard from "../../components/ScheduleCard/ScheduleCard";
import axios from "axios";
import { useLocation } from "react-router-dom";

function BusSchedule() {
  const location = useLocation();
  const [busSchedules, setBusSchedules] = useState([]);
  const [from, setFrom] = useState(location.state?.fromStop || "");
  const [to, setTo] = useState(location.state?.toStop || "");
  const [direction, setDirection] = useState(location.state?.direction || "");
  const [date, setDate] = useState(location.state?.date || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("busScheduleState"));
    if (savedState) {
      setFrom(savedState.fromStop);
      setTo(savedState.toStop);
      setDirection(savedState.direction);
      setDate(savedState.date);
      handleSearch(
        savedState.fromStop,
        savedState.toStop,
        savedState.direction,
        savedState.date
      );
    } else if (
      location.state &&
      location.state.fromStop &&
      location.state.toStop &&
      location.state.direction &&
      location.state.date
    ) {
      console.log("location : ", location.state);
      console.log("location Fromstop : ", location.state.fromStop);
      console.log("location tostop : ", location.state.toStop);
      console.log("location direction : ", location.state.direction);
      console.log("location date : ", location.state.date);

      handleSearch(
        location.state.fromStop,
        location.state.toStop,
        location.state.direction,
        location.state.date
      );
    }
  }, [location.state]);

  const handleSearch = async (fromStop, toStop, direction, date) => {
    setFrom(fromStop);
    setDirection(direction);
    setTo(toStop);
    setDate(date);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/bus/search`, {
        params: {
          from: fromStop,
          to: toStop,
          direction: direction,
          date: date,
        },
      });

      console.log("bus schedules on that date ", response.data);
      setBusSchedules(response.data);
    } catch (error) {
      setError("Error fetching bus schedules. Please try again later.");
      console.error("Error fetching bus schedules:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      const stateToSave = {
        fromStop: from,
        toStop: to,
        direction: direction,
        date: date,
      };
      localStorage.setItem("busScheduleState", JSON.stringify(stateToSave));
    };
  }, [from, to, direction, date]);

  return (
    <div id="bus-schedule-container">
      <HeaderBar />
      <ScheduleSearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {busSchedules.map((bus) => (
        <ScheduleCard
          key={bus.id}
          busID={bus.id}
          busRegNo={bus.regNo}
          routeNo={bus.routeNo}
          fromStop={from}
          toStop={to}
          direction={direction}
          delay={bus.delay}
          lastLeftStop={bus.lastLeftStop}
          date={date}
        />
      ))}
    </div>
  );
}

export default BusSchedule;
