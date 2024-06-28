import React, { useEffect, useState } from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import ScheduleCard from "../../components/ScheduleCard/ScheduleCard";
import axios from "axios";
import ScheduleCardConductor from "../../components/ScheduleCardConductor/ScheduleCardConductor";

function ConductorPage() {
  const [bus, setBus] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [direction, setDirection] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/bus/${1}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("bus response ", response.data);
        setBus(response.data);
      } catch (error) {
        setError("Error fetching bus schedules. Please try again later.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadBus();
  }, []);

  return (
    <div>
      <HeaderBar />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ScheduleCardConductor
        busID={1}
        busRegNo={bus.regNo}
        routeNo={bus.routeNo}
        // fromStop={"Kalmunai"}
        // toStop={"Kandy"}
        direction={bus.status}
      />
    </div>
  );
}

export default ConductorPage;
