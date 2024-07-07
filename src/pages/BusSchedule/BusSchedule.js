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
  const [showNoBusesMessage, setShowNoBusesMessage] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("busScheduleState"));
    if (savedState) {
      setFrom(savedState.fromStop);
      setTo(savedState.toStop);
      setDirection(savedState.direction);
      setDate(savedState.date);
      setShowNoBusesMessage(false);
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
    setShowNoBusesMessage(false); // Resetting message state

    try {
      const response = await axios.get(`http://localhost:8080/bus/search`, {
        params: {
          from: fromStop,
          to: toStop,
          direction: direction,
          date: date,
        },
      });

      setBusSchedules(response.data);
      if (response.data.length === 0) {
        setShowNoBusesMessage(true); // Show message if no schedules found
      }
    } catch (error) {
      console.log("error fetching");
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
      {!loading && busSchedules.length === 0 && showNoBusesMessage && (
        <p>No buses available on the route on selected date.</p>
      )}
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
