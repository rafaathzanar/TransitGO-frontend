import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Button, Box, Grid, Typography, Container } from "@mui/material";
import moment from "moment";

const BusTimeTable = () => {
  const { busId } = useParams();
  const [monthlyStatus, setMonthlyStatus] = useState([]);
  const [currentMonth] = useState(moment()); // No need for updating currentMonth

  useEffect(() => {
    loadMonthlyStatus();
  }, []);

  const loadMonthlyStatus = async () => {
    const firstDay = moment(currentMonth).startOf("month");
    const lastDay = moment(currentMonth).endOf("month");

    // Calculate the number of days in the month
    const daysInMonth = lastDay.diff(firstDay, "days") + 1;

    try {
      const response = await axios.get(
        `http://localhost:8080/bus/${busId}/bustimetable?startDate=${firstDay.format(
          "YYYY-MM-DD"
        )}&endDate=${lastDay.format("YYYY-MM-DD")}`
      );
      console.log("API Response:", response.data);
      setMonthlyStatus(
        response.data.length
          ? response.data
          : generateDefaultMonthlyStatus(daysInMonth, firstDay)
      );
    } catch (error) {
      console.error("Error fetching monthly status:", error);
      setMonthlyStatus(generateDefaultMonthlyStatus(daysInMonth, firstDay));
    }
  };

  const generateDefaultMonthlyStatus = (daysInMonth, firstDay) => {
    return Array.from({ length: daysInMonth }).map((_, index) => {
      const date = moment(firstDay).add(index, "days").format("YYYY-MM-DD");
      return { date, status: "off" };
    });
  };

  const handleStatusChange = (date, status) => {
    const newStatus = monthlyStatus.map((day) => {
      if (day.date === date) {
        return { ...day, status };
      }
      return day;
    });

    setMonthlyStatus(newStatus);
  };

  const saveMonthlyStatus = async () => {
    try {
      await axios.post(
        `http://localhost:8080/bus/${busId}/bustimetable`,
        monthlyStatus
      );
      alert("Monthly status saved successfully");
    } catch (error) {
      console.error("Error saving monthly status:", error);
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
        Monthly Schedule for Bus {busId} - {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Grid container spacing={2}>
        {monthlyStatus.map((dayStatus) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dayStatus.date}>
            {renderDayCell(dayStatus)}
          </Grid>
        ))}
      </Grid>
      <Box mt={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={saveMonthlyStatus}>
          Save Schedule
        </Button>
      </Box>
    </Container>
  );
};

export default BusTimeTable;
