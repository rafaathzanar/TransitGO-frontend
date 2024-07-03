//ScheduleCard.js
import React, { useEffect, useRef, useState } from "react";
import busImg from "../../logo/image 1.png";
import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ScheduleCardConductor.css";

function ScheduleCardConductor({ busID, busRegNo, routeNo, direction }) {
  const [schedules, setSchedules] = useState([]);
  const [fromSchedule, setFromSchedule] = useState(null);
  const [toSchedule, setToSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [updateLocationInterval, setUpdateLocationInterval] = useState(null);
  const [retrieveLocationInterval, setRetrieveLocationInterval] = useState(
    null
  );

  const [journeyStarted, setJourneyStarted] = useState(false);
  const [allStops, setAllStops] = useState([]);
  const [requiredStopLocations, setRequiredStopLocations] = useState([]);

  const [delay, setDelay] = useState();
  const delayRef = useRef(null);
  const nextStopRef = useRef(null);
  const [lastLeftStop, setLastLeftStop] = useState("");
  const [nextLocation, setNextLocation] = useState("");

  const token = localStorage.getItem("token");
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
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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
    clearInterval(updateLocationInterval);

    setJourneyStarted(false);
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      console.log(1111111111);
      try {
        const response = await axios.get(
          `http://localhost:8080/bus/${busID}/stops`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ); //Schedules of the current bus
        //console.log("fetched scheduled for the selected bus ", response.data);
        //console.log("stop:", stops);
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
        console.log("schedulessssssss", response.data);
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
    console.log("requiredStopLocations state updated:", requiredStopLocations);
  }, [requiredStopLocations]);

  useEffect(() => {
    const fetchStopLocations = async () => {
      try {
        if (allStops.length) {
          console.log(allStops);
          const response = await axios.get(
            `http://localhost:8080/busstoplocations`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ); //Schedules of the current bus
          //console.log("fetched scheduled for the selected bus ", response.data);
          console.log("all stops in fetchStopLocations", allStops);
          let requiredStopLocationsArr = response.data.filter((location) => {
            for (let i = 0; i < allStops.length; i++) {
              if (allStops[i].stop === location.location) {
                return location.location;
              }
            }
          });
          if (direction === "down") {
            requiredStopLocationsArr.reverse();
          }
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
    const response = await axios.get(`http://localhost:8080/bus/${busID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(
      "current loaction of the bus is ",
      response.data.latitude,
      response.data.longitude
    );

    let curRetrievedLatitude = response.data.latitude;
    let curRetrievedLongitude = response.data.longitude;

    console.log(
      "curRetrieved Latitude Longtitude ",
      curRetrievedLatitude,
      curRetrievedLongitude
    );
    console.log("requiredStopLocations before for loop", requiredStopLocations);
    console.log("Schedules", schedules);

    if (
      requiredStopLocations.length &&
      curRetrievedLatitude &&
      curRetrievedLongitude
    ) {
      requiredStopLocations.forEach(async (requiredStopLocation, index) => {
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

          let delayTimeInMilliSecondsObj = filteredSchedules
            .filter(
              (stop) => stop.busStop.name === requiredStopLocation.location
            )
            .map((stop) => {
              let arrivalOrDepartureTime =
                stop.arrivalTime || stop.departureTime;
              return getAbsoluteDifferenceInMilliseconds(
                arrivalOrDepartureTime
              );
            })
            .sort((a, b) => a.absoluteDifference - b.absoluteDifference)[0];
          console.log("hi");
          if (delayTimeInMilliSecondsObj.difference < 0) {
            let delayTimeInMinutes = convertMillisecondsToMinutesSeconds(
              delayTimeInMilliSecondsObj.absoluteDifference
            );

            console.log("delay is ", delayTimeInMinutes);
            delayRef.current = delayTimeInMinutes;
            setDelay(delayTimeInMinutes);
          } else {
            console.log("No delay");
            setDelay("0");
            delayRef.current = "0";
          }

          setLastLeftStop(requiredStopLocation.location);

          console.log("index ", index);
          console.log(
            "requiredStopLocation.length - 1 ",
            requiredStopLocations.length - 1
          );
          console.log("if condition", index < requiredStopLocations.length - 1);

          if (index < requiredStopLocations.length - 1) {
            nextStopRef.current = requiredStopLocations[index + 1].location;
            setNextLocation(requiredStopLocations[index + 1].location);
          } else {
            console.log("elseee next location ", nextLocation);
            nextStopRef.current = "End of the Stop";
            setNextLocation("End of the Stop");
          }

          try {
            console.log("delay inside ", delayRef.current);

            const postResponse = await axios.post(
              `http://localhost:8080/bus`,
              {
                id: busID,
                delay: delayRef.current,
                lastLeftStop: requiredStopLocation.location,
                nextLocation: nextStopRef.current,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(
              "Updated bus management successfully.",
              postResponse.data
            );
          } catch (postError) {
            console.error("Error updating bus management:", postError.message);
          }
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
    const [endHour, endMinute, endSecond] = "18:12:13".split(":").map(Number); //endTime.split(":").map(Number);

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
    const curRetrieveLocationInterval = setInterval(retrieveLocation, 15000);
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
    console.log("Schedules", schedules);
    if (schedules.length > 0) {
      const filteredSchedules = schedules.filter(
        (schedule) => schedule.direction === direction
      );
      console.log("filtered schedule", filteredSchedules);
      const filteredStopTimes = filteredSchedules.map((schedule) => {
        return {
          arrivalTime: schedule.arrivalTime,
          departureTime: schedule.departureTime,
          busStop: schedule.busStop,
        };
      });

      console.log("filteredStopTimes:", filteredStopTimes);

      const startEndTimes = {
        startTime: filteredStopTimes[0].departureTime,
        endTime: filteredStopTimes[filteredStopTimes.length - 1].arrivalTime,
      };
      if (requiredStopLocations.length)
        scheduleTasks(startEndTimes, startTask, endTask);
      setFromSchedule(filteredStopTimes[0].busStop.name);
      setToSchedule(
        filteredStopTimes[filteredStopTimes.length - 1].busStop.name
      );
    }
  }, [schedules, requiredStopLocations]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.direction === direction
  );

  if (!fromSchedule || !toSchedule) {
    return <p>No schedule available for the selected route.</p>;
  }

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
            <p>{fromSchedule}</p>
          </div>

          <div>
            <p style={{ marginBottom: -10, fontSize: 15 }}>To:</p>
            <p>{toSchedule}</p>
          </div>
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
              {filteredSchedules.map((schedule, index) => {
                console.log("filteredSchedules:", filteredSchedules);

                return (
                  <option key={index}>
                    {index === 0
                      ? `${schedule.busStop.name} - Departure: ${schedule.departureTime}`
                      : `${schedule.busStop.name} - Arrival: ${schedule.arrivalTime}`}
                  </option>
                );
              })}
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
  alignItems: "center",
  backgroundColor: "#071E60",
  height: "32px",
  color: "white",
  borderRadius: "6px 6px 0 0",
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
  borderRadius: " 0 0 6px 6px",
};

export default ScheduleCardConductor;
