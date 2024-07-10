import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Button, Box, Grid, Typography, Container } from "@mui/material";
import moment from "moment";

const BusTimeTable = () => {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { busId } = useParams();
  const [bus, setBus] = useState({
    regNo: "",
    busroute: { routeno: "" },
    noOfJourneysPerDay: 1,
    status: "off",
  });
  const [weeklyStatus, setWeeklyStatus] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const navigate = useNavigate();

  useEffect(() => {
    loadBusData();
  }, []);

  useEffect(() => {
    if (bus.noOfJourneysPerDay) {
      loadWeeklyStatus();
    }
  }, [currentMonth, bus]);

  const loadBusData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bus/${busId}`,
        Authorization
      );
      setBus(response.data);
    } catch (error) {
      console.error("Error fetching bus data:", error);
    }
  };

  const loadWeeklyStatus = async () => {
    const startOfWeek = moment(currentMonth).startOf("week");
    const endOfWeek = moment(currentMonth).endOf("week");
    const daysInWeek = 7;

    try {
      const response = await axios.get(
        `http://localhost:8080/bus/${busId}/bustimetable?startDate=${startOfWeek.format(
          "YYYY-MM-DD"
        )}&endDate=${endOfWeek.format("YYYY-MM-DD")}`,
        Authorization
      );
      console.log("API Response:", response.data);
      setWeeklyStatus(
        response.data.length
          ? response.data
          : generateDefaultWeeklyStatus(
              daysInWeek,
              startOfWeek,
              bus.noOfJourneysPerDay
            )
      );
    } catch (error) {
      console.error("Error fetching weekly status:", error);
      setWeeklyStatus(
        generateDefaultWeeklyStatus(
          daysInWeek,
          startOfWeek,
          bus.noOfJourneysPerDay
        )
      );
    }
  };

  const generateDefaultWeeklyStatus = (
    daysInWeek,
    startOfWeek,
    noOfJourneys
  ) => {
    const statuses = [];
    for (let dayIndex = 0; dayIndex < daysInWeek; dayIndex++) {
      const date = moment(startOfWeek)
        .add(dayIndex, "days")
        .format("YYYY-MM-DD");
      for (let journeyIndex = 0; journeyIndex < noOfJourneys; journeyIndex++) {
        statuses.push({
          date,
          journeyNumber: journeyIndex + 1,
          status: "off",
        });
      }
    }
    return statuses;
  };

  const handleStatusChange = (date, journeyNumber, status) => {
    const newStatus = weeklyStatus.map((day) => {
      if (day.date === date && day.journeyNumber === journeyNumber) {
        return { ...day, status };
      }
      return day;
    });

    setWeeklyStatus(newStatus);
  };

  const saveWeeklyStatus = async () => {
    try {
      await axios.post(
        `http://localhost:8080/bus/${busId}/bustimetable`,
        weeklyStatus,
        Authorization
      );
      navigate(-1);
    } catch (error) {
      console.error("Error saving weekly status:", error);
    }
  };

  const renderJourneyCell = (date, journey) => {
    return (
      <Box
        key={`${date}-${journey.journeyNumber}`}
        p={1}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        textAlign="center"
        mb={1}
      >
        <Typography variant="subtitle1" gutterBottom>
          Journey {journey.journeyNumber}
        </Typography>
        <Button
          variant={journey.status === "up" ? "contained" : "outlined"}
          onClick={() => handleStatusChange(date, journey.journeyNumber, "up")}
          fullWidth
          sx={{ mb: 1 }}
        >
          Up
        </Button>
        <Button
          variant={journey.status === "down" ? "contained" : "outlined"}
          onClick={() =>
            handleStatusChange(date, journey.journeyNumber, "down")
          }
          fullWidth
          sx={{ mb: 1 }}
        >
          Down
        </Button>
        <Button
          variant={journey.status === "off" ? "contained" : "outlined"}
          onClick={() => handleStatusChange(date, journey.journeyNumber, "off")}
          color="error"
          fullWidth
        >
          Off
        </Button>
      </Box>
    );
  };

  const renderDayCell = (day) => {
    const journeys = weeklyStatus.filter((status) => status.date === day.date);
    return (
      <Box
        key={day.date}
        p={2}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        textAlign="center"
      >
        <Typography variant="h6" gutterBottom>
          {moment(day.date).format("dddd")}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {moment(day.date).format("MMM D")}
        </Typography>
        {journeys.map((journey) => renderJourneyCell(day.date, journey))}
      </Box>
    );
  };

  const getUniqueDays = (statuses) => {
    const uniqueDates = [];
    statuses.forEach((status) => {
      if (!uniqueDates.some((date) => date.date === status.date)) {
        uniqueDates.push({ date: status.date });
      }
    });
    return uniqueDates;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weekly Schedule for Bus {bus.regNo} - {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Grid container spacing={2}>
        {getUniqueDays(weeklyStatus).map((day) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={day.date}>
            {renderDayCell(day)}
          </Grid>
        ))}
      </Grid>
      <Box mt={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={saveWeeklyStatus}>
          Save Schedule
        </Button>
      </Box>
    </Container>
  );
};

export default BusTimeTable;
