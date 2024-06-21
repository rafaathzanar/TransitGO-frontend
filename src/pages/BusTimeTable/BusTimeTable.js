import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Button, Box, Grid, Typography, Container } from "@mui/material";
import moment from "moment";

const BusTimeTable = () => {
  const token = localStorage.getItem('token');
  const Authorization = {
    headers: {Authorization: `Bearer ${token}`}
  };
  const { busId } = useParams();
  const [weeklyStatus, setWeeklyStatus] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    loadWeeklyStatus();
  }, [currentMonth]);

  const loadWeeklyStatus = async () => {
    const startOfWeek = moment(currentMonth).startOf("week"); // Sunday of the current week
    const endOfWeek = moment(currentMonth).endOf("week"); // Saturday of the current week

    const daysInWeek = 7; // We are only interested in 7 days

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
          : generateDefaultWeeklyStatus(daysInWeek, startOfWeek)
      );
    } catch (error) {
      console.error("Error fetching weekly status:", error);
      setWeeklyStatus(generateDefaultWeeklyStatus(daysInWeek, startOfWeek));
    }
  };

  const generateDefaultWeeklyStatus = (daysInWeek, startOfWeek) => {
    return Array.from({ length: daysInWeek }).map((_, index) => {
      const date = moment(startOfWeek).add(index, "days").format("YYYY-MM-DD");
      return { date, status: "off" };
    });
  };

  const handleStatusChange = (date, status) => {
    const newStatus = weeklyStatus.map((day) => {
      if (day.date === date) {
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
      alert("Weekly status saved successfully");
    } catch (error) {
      console.error("Error saving weekly status:", error);
    }
  };

  const renderDayCell = (dayStatus) => {
    return (
      <Box
        key={dayStatus.date}
        p={2}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        textAlign="center"
      >
        <Typography variant="h6" gutterBottom>
          {moment(dayStatus.date).format("dddd")}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {moment(dayStatus.date).format("MMM D")}
        </Typography>
        <Button
          variant={dayStatus.status === "up" ? "contained" : "outlined"}
          onClick={() => handleStatusChange(dayStatus.date, "up")}
          fullWidth
          sx={{ mb: 1 }}
        >
          Up
        </Button>
        <Button
          variant={dayStatus.status === "down" ? "contained" : "outlined"}
          onClick={() => handleStatusChange(dayStatus.date, "down")}
          fullWidth
          sx={{ mb: 1 }}
        >
          Down
        </Button>
        <Button
          variant={dayStatus.status === "off" ? "contained" : "outlined"}
          onClick={() => handleStatusChange(dayStatus.date, "off")}
          color="error"
          fullWidth
        >
          Off
        </Button>
      </Box>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weekly Schedule for Bus {busId} - {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Grid container spacing={2}>
        {weeklyStatus.map((dayStatus) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dayStatus.date}>
            {renderDayCell(dayStatus)}
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
