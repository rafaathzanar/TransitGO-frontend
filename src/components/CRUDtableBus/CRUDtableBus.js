import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";
import axios from "axios";
import { useNavigate } from "react-router";
import { Schedule } from "@mui/icons-material";

export default function CRUDtableRoute({}) {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [buses, setBuses] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [routeChangesDetected, setRouteChangesDetected] = useState({});
  const [busStatus, setBusStatus] = useState({}); // State to hold bus status

  const navigate = useNavigate();

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const routesResponse = await axios.get("http://localhost:8080/busroutes");
      const routes = routesResponse.data;
      setBusRoutes(routes);

      const busesData = routes.flatMap((route) =>
        route.buses.map((bus) => ({
          busId: bus.id,
          busRegNo: bus.regNo,
          routeNo: route.routeno,
          status: bus.status, // Initialize status
        }))
      );

      setBuses(busesData);
      setFilteredRows(busesData);

      const changesDetected = {};
      await Promise.all(
        busesData.map(async (bus) => {
          try {
            const schedulesResponse = await axios.get(
              `http://localhost:8080/bussched/${bus.busId}`
            );
            const schedules = schedulesResponse.data;

            const route = routes.find((route) =>
              route.buses.some((b) => b.id === bus.busId)
            );

            if (route) {
              const routeStops = route.busStops.map((stop) => stop.stopID);
              const scheduleStops = [
                ...new Set(
                  schedules.map((schedule) => schedule.busStop.stopID)
                ),
              ];

              const routeChanges = !arraysEqual(routeStops, scheduleStops);

              changesDetected[bus.busId] = routeChanges;
            }
          } catch (error) {
            console.error(
              `Error fetching schedules for bus ${bus.busId}:`,
              error
            );
            changesDetected[bus.busId] = false; // Assume no changes detected on error
          }
        })
      );

      setRouteChangesDetected(changesDetected);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Utility function to compare arrays
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  };

  const handleDelete = (busId) => {
    setSelectedRowId(busId);
    setOpen(true);
  };

  const handleConfirmDelete = async (busId) => {
    try {
      await axios.delete(`http://localhost:8080/bus/${busId}`);
      loadBuses(); // Reload buses after deletion
    } catch (error) {
      console.error("Error deleting bus:", error.message);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    navigate(`editbus/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = buses.filter(
      (row) =>
        row.busId
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        row.busRegNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.routeNo
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleStatusChange = async (busId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/busStatus/${busId}`, {
        status: newStatus,
      });
      loadBuses(); // Reload buses after status change
    } catch (error) {
      console.error("Error changing bus status:", error.message);
    }
  };

  const columns = [
    { field: "busId", headerName: "Bus Id", width: 200 },
    { field: "busRegNo", headerName: "Bus Reg No", width: 200 },
    { field: "routeNo", headerName: "Bus Route No", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={
            params.value === "up"
              ? "success"
              : params.value === "down"
              ? "warning"
              : "error"
          }
          onClick={() =>
            handleStatusChange(params.row.busId, getNextStatus(params.value))
          }
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "routeChanges",
      headerName: "Route Changes",
      width: 200,
      renderCell: (params) =>
        routeChangesDetected[params.row.busId] ? (
          <span style={{ color: "red" }}>Route changes detected!</span>
        ) : (
          <span>Up To Date</span>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row.busId)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.busId)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "up":
        return "down";
      case "down":
        return "off";
      case "off":
        return "up";
      default:
        return "up"; // Default to "up" if current status is undefined
    }
  };

  return (
    <div
      style={{
        width: "70rem",
        backgroundColor: "hsla(190, 96%, 80%, 0.2)",
        marginTop: "30px",
      }}
    >
      <SearchField
        placeholderText="Search Bus"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <DataGrid
        rows={filteredRows.map((row) => ({ ...row, id: row.busId }))}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete(selectedRowId)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
