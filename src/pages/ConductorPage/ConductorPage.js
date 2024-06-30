import React, { useEffect, useState } from "react";
import ScheduleSearchBar from "../../components/ScheduleSearchBar/ScheduleSearchBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import axios from "axios";
import ScheduleCardConductor from "../../components/ScheduleCardConductor/ScheduleCardConductor";

function ConductorPage() {
  const [bus, setBus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      try {
        const empBusResponse = await axios.get(
          `http://localhost:8080/userBus/${id}`,
          Authorization
        );
        if (empBusResponse.data !== 0) {
          const busId = empBusResponse.data;
          console.log(busId);
          const response = await axios.get(
            `http://localhost:8080/bus/${busId}`,
            Authorization
          );
          console.log("bus response ", response.data);
          setBus(response.data);
        } else {
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
  }, [id]);

  return (
    <div>
      <HeaderBar />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {bus.regNo && bus.routeNo && bus.id && (
        <ScheduleCardConductor
          busID={bus.id}
          busRegNo={bus.regNo}
          routeNo={bus.routeNo}
          direction={bus.status}
        />
      )}
    </div>
  );
}

export default ConductorPage;
