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
export default function CRUDtableRoute({}) {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [buses, setBuses] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
        setFilteredRows(bus);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (busId) => {
    setSelectedRowId(busId);
    console.log("bus id is ", busId);
    setOpen(true);
  };

  const handleConfirmDelete = async (busId) => {
    try {
      await axios.delete(`http://localhost:8080/bus/${busId}`);

      loadBuses();
    } catch (error) {
      console.error("Error deleting bus:", error.message);
    }

    handleClose();
  };

  // Function to close delete confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  // Function to handle row edit
  const handleEdit = (id) => {
    console.log(`Editing row with id ${id}`);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = buses.filter(
      (rows) =>
        rows.busId
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        rows.busRegNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        rows.routeNo
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setFilteredRows(filtered);
  };

  const columns = [
    { field: "busId", headerName: "Bus Id", width: 200 },
    { field: "busRegNo", headerName: "Bus Reg No", width: 200 },
    { field: "routeNo", headerName: "Bus Route No", width: 200 },
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
