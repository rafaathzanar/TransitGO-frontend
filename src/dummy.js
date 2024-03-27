import React, { useState, useEffect } from "react";

const Dummy = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    fetch("http://localhost:8080/busroutes")
      .then((response) => response.json())
      .then((data) => {
        setBusRoutes(data);
        const bus = data.flatMap((route) =>
          route.buses.map((bus) => ({
            busId: bus.id,
            busRegNo: bus.regNo,
            routeNo: route.routeno,
          }))
        );
        setBuses(bus);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  console.log("Result is ", buses);
  return (
    <div>
      <h2>Bus Information</h2>
      <table>
        <thead>
          <tr>
            <th>Bus Registration Number</th>
            <th>Bus ID</th>
            <th>Route Name</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.busId}</td>
              <td>{bus.busRegNo}</td>
              <td>{bus.routeNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dummy;
