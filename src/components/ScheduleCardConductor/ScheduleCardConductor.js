//ScheduleCard.js
import React, { useEffect, useRef, useState } from "react";
import busImg from "../../logo/image 1.png";
import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ScheduleCardConductor.css";

function ScheduleCardConductor({
  busID,
  busRegNo,
  routeNo,
  fromStop,
  toStop,
  direction,
}) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [updateLocationInterval, setUpdateLocationInterval] = useState(null);
  const [retrieveLocationInterval, setRetrieveLocationInterval] =
    useState(null);

  const [journeyStarted, setJourneyStarted] = useState(false);
  const [allStops, setAllStops] = useState([]);
  const [requiredStopLocations, setRequiredStopLocations] = useState([]);

  const [delay, setDelay] = useState("0");
  const [lastLeftStop, setLastLeftStop] = useState("");

  useEffect(() => {
    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    function failure(position) {
      console.log("failed to get location");
    }

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  //SEND LOCATION
  const updateLocation = async () => {
    async function success(position) {
      const response = await axios.put(
        `http://localhost:8080/busLocation/${busID}`,
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      );

      console.log(
        "location updated to",
        position.coords.latitude,
        position.coords.longitude
      );
    }

    function failure(position) {
      console.log("failed to get location");
    }

    navigator.geolocation.getCurrentPosition(success, failure);
  };

  const onJourneyStart = () => {
    let curUpdateLocationInterval = setInterval(updateLocation, 2000);

    setUpdateLocationInterval(curUpdateLocationInterval);
    setJourneyStarted(true);
  };

  const onJourneyEnd = () => {
    console.log(updateLocationInterval);
    clearInterval(updateLocationInterval);
    setJourneyStarted(false);
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      console.log(1111111111);
      try {
        const response = await axios.get(
          `http://localhost:8080/bus/${busID}/stops`
        ); //Schedules of the current bus
        //console.log("fetched scheduled for the selected bus ", response.data);
        let stops = response.data.map((stop) => {
          return {
            stop: stop["busStop"]["name"],
            arraivalTime: stop["arrivalTime"],
            departureTime: stop["departureTime"],
          };
        });
        console.log("all stops", stops);
        console.log("response data", response.data);
        setAllStops(stops);
        setSchedules(response.data);
      } catch (error) {
        setError("Error fetching bus schedules.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  useEffect(() => {
    const fetchStopLocations = async () => {
      try {
        if (allStops.length) {
          console.log(allStops);
          const response = await axios.get(
            `http://localhost:8080/busstoplocations`
          ); //Schedules of the current bus
          //console.log("fetched scheduled for the selected bus ", response.data);
          console.log("all stops in fetchStopLocations", allStops);
          let requiredStopLocationsArr = response.data.filter((location) => {
            for (let i = 0; i < allStops.length; i++) {
              if (allStops[i].stop == location.location) {
                return location.location;
              }
            }
          });
          console.log("required StopLocations", requiredStopLocationsArr);
          setRequiredStopLocations(requiredStopLocationsArr);
          console.log(requiredStopLocations);
          console.log("yessssss");
        }
      } catch (error) {
        setError("Error fetching bus schedules.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStopLocations();
  }, [allStops]);

  // //RETRIEVE LOCATION

  //function for getting distance between two locations
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371e3; // Earth radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  }

  //checking is it exist withing the range
  function isWithinRadius(lat1, lon1, lat2, lon2, radius = 500) {
    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    return distance <= radius;
  }

  function getAbsoluteDifferenceInMilliseconds(targetTime) {
    const now = new Date();

    const [targetHour, targetMinute, targetSecond] = targetTime
      .split(":")
      .map(Number);
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      targetMinute,
      targetSecond
    );

    const differenceInMilliseconds = targetDate - now;
    const absoluteDifferenceInMilliseconds = Math.abs(differenceInMilliseconds);

    return {
      difference: differenceInMilliseconds,
      absoluteDifference: absoluteDifferenceInMilliseconds,
    };
  }

  function convertMillisecondsToMinutesSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}`;
  }

  const retrieveLocation = async () => {
    const response = await axios.get(`http://localhost:8080/bus/${busID}`);

    console.log(
      "current loaction of the bus is ",
      response.data.latitude,
      response.data.longitude
    );

    let curRetrievedLatitude = response.data.latitude;
    let curRetrievedLongitude = response.data.longitude;

    console.log(curRetrievedLatitude, curRetrievedLongitude);
    console.log(requiredStopLocations);
    console.log(schedules);

    if (
      requiredStopLocations.length &&
      curRetrievedLatitude &&
      curRetrievedLongitude
    ) {
      requiredStopLocations.forEach((requiredStopLocation) => {
        const isWithin = isWithinRadius(
          requiredStopLocation.latitude,
          requiredStopLocation.longitude,
          7.291006007978523,
          80.63436016153199
          // ,curRetrievedLatitude,
          // curRetrievedLongitude
        );

        if (isWithin) {
          console.log(
            `Location ${
              requiredStopLocation.location
            } is within ${500} meters of Your current location `
          );

          let delayTimeInMilliSecondsObj = schedules
            .filter(
              (stop) => stop.busStop.name == requiredStopLocation.location
            )
            .map((stop) =>
              getAbsoluteDifferenceInMilliseconds(stop.arrivalTime)
            )
            .sort((a, b) => a.absoluteDifference - b.absoluteDifference)[0];

          if (delayTimeInMilliSecondsObj.difference < 0) {
            let delayTimeInMinutes = convertMillisecondsToMinutesSeconds(
              delayTimeInMilliSecondsObj.absoluteDifference
            );
            console.log(delayTimeInMinutes);
            setDelay(delayTimeInMinutes);
          } else {
            setDelay("0");
          }

          setLastLeftStop(requiredStopLocation.location);
        } else {
          console.log(
            `Location ${
              requiredStopLocation.location
            } is not within ${500} meters of Your current location`
          );
        }
      });
    }
  };

  function scheduleTasks(startEndTimes, startTaskFunction, endTaskFunction) {
    const now = new Date();
    console.log(startEndTimes);
    const { startTime, endTime } = startEndTimes;

    const [startHour, startMinute, startSecond] = "11:12:13" //startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(":").map(Number);

    let startDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond,
      0
    );
    let endDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond,
      0
    );

    // If the end time is in the past today, schedule for tomorrow
    if (endDateTime < startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    const startDelay = startDateTime - now;
    const endDelay = endDateTime - now;

    console.log(
      `Start task scheduled to start at ${startDateTime} which is after ${startDelay} milliseconds`
    );
    console.log(
      `End task scheduled to end at ${endDateTime} which is after ${endDelay} milliseconds`
    );

    setTimeout(() => {
      startTaskFunction();
      setTimeout(endTaskFunction, endDelay - startDelay);
    }, startDelay);
  }

  // // Example task functions
  function startTask() {
    console.log("Start task executed at", new Date());
    const curRetrieveLocationInterval = setInterval(retrieveLocation, 60000);
    setRetrieveLocationInterval(curRetrieveLocationInterval);
  }

  function endTask() {
    console.log("Start task ended at", new Date());
    clearInterval(retrieveLocationInterval);
  }

  // // Example start and end times array (24-hour format with seconds)
  const startEndTimes = { startTime: undefined, endTime: undefined };

  // Schedule the tasks to start and end at each specified time
  useEffect(() => {
    if (schedules.length) {
      console.log("schedules", schedules);
      console.log("allstops", allStops);

      const filteredStopTimes = schedules.filter(
        (stop) =>
          (stop.arrivalTime == null && stop.busStop.name == fromStop) ||
          (stop.departureTime == null && stop.busStop.name == toStop)
      );
      console.log(filteredStopTimes);
      for (let i = 0; i < filteredStopTimes.length; i++) {
        if (
          filteredStopTimes[i].arrivalTime == null &&
          filteredStopTimes[i].busStop.name == fromStop
        ) {
          startEndTimes.startTime = filteredStopTimes[i].departureTime;
        } else if (
          filteredStopTimes[i].departureTime == null &&
          filteredStopTimes[i].busStop.name == toStop
        ) {
          startEndTimes.endTime = filteredStopTimes[i].arrivalTime;
        }
      }

      console.log("start end times", startEndTimes);
      scheduleTasks(startEndTimes, startTask, endTask);
    }
  }, [schedules, requiredStopLocations]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Hours and ${minutes} Minutes`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.direction === direction
  );

  const fromSchedule = filteredSchedules.find(
    (schedule) => schedule.busStop.name === fromStop
  );
  const toSchedule = filteredSchedules.find(
    (schedule) => schedule.busStop.name === toStop
  );

  if (!fromSchedule || !toSchedule) {
    return <p>No schedule available for the selected route.</p>;
  }

  const fromTime = fromSchedule.departureTime;
  const toTime = toSchedule.arrivalTime;

  return (
    <Card className="schedule-card">
      <CardContent className="schedule-card-content">
        <div className="header-bar" style={headbarStyle}>
          <div style={{ fontSize: "15px", paddingLeft: 15 }}>
            <p>Bus: {busRegNo}</p>
          </div>
          <div style={{ fontSize: "15px", paddingRight: 15 }}>
            <p>Route No: {routeNo}</p>
          </div>
        </div>
        <div className="middle-bar" style={middlePartStyle}>
          <div>
            <img src={busImg} style={{ position: "relative" }} alt="Bus" />
          </div>
          <div>
            <p style={{ marginBottom: -10, fontSize: 15 }}>From:</p>
            <p>{fromStop}</p>
            <p>{fromTime}</p>
          </div>
          <p className="duration" style={{ textAlign: "center", margin: 20 }}>
            {calculateDuration(fromTime, toTime)}
          </p>
          <div>
            <p style={{ marginBottom: -10, fontSize: 15 }}>To:</p>
            <p>{toStop}</p>
            <p>{toTime}</p>
          </div>
          <Link to="/reviews">Review & Rating</Link>
        </div>
        <div className="footer-bar" style={footerbarStyle}>
          <div className="cringe" style={{ padding: 5, fontWeight: "bold" }}>
            <p
              style={{
                backgroundColor: "#90EE90",
                padding: 2,
                borderRadius: 6,
              }}
            >
              Get off from {lastLeftStop}
            </p>
          </div>
          <div>
            <select
              className="select-option"
              defaultValue=""
              displayEmpty
              style={{
                width: "250px",
                height: "40px",
                backgroundColor: "white",
              }}
            >
              {filteredSchedules.map((schedule, index) => (
                <option key={index}>
                  Arrival at {schedule.busStop.name} {schedule.arrivalTime}
                </option>
              ))}
            </select>
          </div>
          <div className="cringe" style={{ padding: 5, fontWeight: "bold" }}>
            <p style={{ backgroundColor: "red", padding: 6, borderRadius: 15 }}>
              Delay: {delay}min
            </p>
          </div>
        </div>
        <div className="ConButton">
          <button
            className="ConButtonST"
            onClick={onJourneyStart}
            disabled={journeyStarted}
            style={{ opacity: journeyStarted ? 0.5 : 1 }}
          >
            Start Journey
          </button>
          <button
            className="ConButtonST"
            onClick={onJourneyEnd}
            disabled={!journeyStarted}
            style={{ opacity: journeyStarted ? 1 : 0.5 }}
          >
            End Journey
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

const headbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#071E60",
  height: "32px",
  color: "white",
  borderRadius: 6,
};
const middlePartStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const footerbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#071E60",
  borderRadius: 6,
};

export default ScheduleCardConductor;