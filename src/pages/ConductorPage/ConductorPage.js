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
  const id = localStorage.getItem('id');
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  }

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      try {
          const empBus = await axios.get(`http://localhost:8080/user/${id}`, Authorization);
          if (empBus.data != 0) {
            const busId = empBus.data;
            console.log(busId);
            const response = await axios.get(`http://localhost:8080/bus/${busId}`, Authorization);
            console.log("bus response ", response.data);
            setBus(response.data);
          }else{
            console.log("Employee is not yet assigned with a bus");
          }
        
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
