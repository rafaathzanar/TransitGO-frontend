import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router";
import SearchField from "../../components/SearchField/SearchField";

export default function CRUDtableStop() {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [stops, setStops] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
  });
  const [busStops, setBusStops] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    loadStops();
    loadBusStops();
  }, []);

  const loadStops = async () => {
    try {
      const result = await axios.get("http://localhost:8080/busstoplocations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const stopsWithIds = result.data.map((stop) => ({
        ...stop,
        id: stop.stopID.toString(),
      }));
      setStops(stopsWithIds);
      setFilteredRows(stopsWithIds);
    } catch (error) {
      console.error("Error loading stops:", error.message);
    }
  };

  const loadBusStops = async () => {
    try {
      const busStopData = await axios.get("http://localhost:8080/busstops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const uniqueNamesSet = new Set();
      const busStopNames = busStopData.data
        .filter((stop) => {
          if (uniqueNamesSet.has(stop.name.trim())) {
            return false;
          } else {
            uniqueNamesSet.add(stop.name.trim());
            return true;
          }
        })
        .map((stop) => ({
          label: stop.name.trim(),
          orderIndex: stop.orderIndex,
        }));
      setBusStops(busStopNames);
    } catch (error) {
      console.error("Error loading bus stops:", error.message);
    }
  };

  const [filteredRows, setFilteredRows] = useState(stops);
  const [searchValue, setSearchValue] = useState("");

  const handleDelete = (id, stopID) => {
    setSelectedRowId(id);
    setSelectedStop(stopID);
    setOpen(true);
  };

  const handleConfirmDelete = async (stopID) => {
    try {
      await axios.delete(`http://localhost:8080/busstoplocation/${stopID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadStops();
    } catch (error) {
      console.error("Error deleting stop:", error.message);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleEdit = (stop) => {
    setSelectedStop(stop);
    setEditFormData({
      location: stop.location,
      latitude: stop.latitude,
      longitude: stop.longitude,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/busstoplocation/${selectedStop.stopID}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        loadStops();
        setIsEditing(false);
        setSelectedStop(null);
      }
    } catch (error) {
      console.error("Error updating stop:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedStop(null);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = stops.filter(
      (row) =>
        row.location.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.stopID.toString().includes(e.target.value)
    );
    setFilteredRows(filtered);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutocompleteChange = (event, value) => {
    setEditFormData({
      ...editFormData,
      location: value ? value.label : "",
    });
  };

  const columns = [
    { field: "stopID", headerName: "Stop ID", width: 200 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "latitude", headerName: "Latitude", width: 200 },
    { field: "longitude", headerName: "Longitude", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row.id, params.row.stopID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "70rem",
        backgroundColor: "hsla(190, 96%, 80%, 0.2)",
        marginTop: "30px",
      }}
    >
      <SearchField
        placeholderText="Search Stop"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
      {isEditing && (
        <Dialog open={isEditing} onClose={handleCancelEdit}>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  options={busStops}
                  getOptionLabel={(option) => option.label}
                  value={
                    busStops.find(
                      (stop) => stop.label === editFormData.location
                    ) || null
                  }
                  onChange={handleAutocompleteChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Bus Stop"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  value={editFormData.latitude}
                  onChange={handleEditFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  value={editFormData.longitude}
                  onChange={handleEditFormChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this stop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete(selectedStop)}
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
