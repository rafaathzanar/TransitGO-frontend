import React, { useState } from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import ScheduleCard from "../../components/ScheduleCard/ScheduleCard";
import axios from "axios";

function BusSchedule() {
  const [busSchedules, setBusSchedules] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (fromStop, toStop) => {
    setFrom(fromStop);
    setTo(toStop);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/bus/search`, {
        params: { from: fromStop, to: toStop },
      });
      console.log("response.data in BusSchedule First ", response.data);
      setBusSchedules(response.data);
    } catch (error) {
      setError("Error fetching bus schedules. Please try again later.");
      console.error("Error fetching bus schedules:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        />
      ))}
    </div>
  );
}

export default BusSchedule;
