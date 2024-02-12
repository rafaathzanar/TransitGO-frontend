import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";

export default function CRUDtableRoute({ searchData }) {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      routeno: "123",
      route: "Route A",
      listofbuses: "Bus1, Bus2",
    },
    {
      id: 2,
      routeno: "456",
      route: "Route B",
      listofbuses: "Bus3, Bus4",
    },
    {
      id: 3,
      routeno: "789",
      route: "Route C",
      listofbuses: "Bus5, Bus6",
    },
    {
      id: 4,
      routeno: "101",
      route: "Route D",
      listofbuses: "Bus7, Bus8",
    },
    {
      id: 5,
      routeno: "112",
      route: "Route E",
      listofbuses: "Bus9, Bus10",
    },
    {
      id: 6,
      routeno: "131",
      route: "Route F",
      listofbuses: "Bus11, Bus12",
    },
    {
      id: 7,
      routeno: "145",
      route: "Route G",
      listofbuses: "Bus13, Bus14",
    },
    {
      id: 8,
      routeno: "157",
      route: "Route H",
      listofbuses: "Bus15, Bus16",
    },
    {
      id: 9,
      routeno: "169",
      route: "Route I",
      listofbuses: "Bus17, Bus18",
    },
    {
      id: 10,
      routeno: "171",
      route: "Route J",
      listofbuses: "Bus19, Bus20",
    },
    {
      id: 11,
      routeno: "183",
      route: "Route K",
      listofbuses: "Bus21, Bus22",
    },
    {
      id: 12,
      routeno: "194",
      route: "Route L",
      listofbuses: "Bus23, Bus24",
    },
  ]);

  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [searchValue, setSearchValue] = useState(""); // New state for search input value

  // Function to handle row deletion
  const handleDelete = (id = null) => {
    setSelectedRowId(id);
    setOpen(true);
  };

  // Function to confirm row deletion
  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((row) => row.id !== selectedRowId);
    setRows(updatedRows);
    setFilteredRows(updatedRows); // Update filteredRows
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
    const filtered = rows.filter(
      (row) =>
        row.routeno.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.route.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.listofbuses.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const columns = [
    { field: "routeno", headerName: "Route No.", width: 200 },
    { field: "route", headerName: "Route", width: 200 },
    { field: "listofbuses", headerName: "List Of Buses", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "40rem", width: "60rem", marginTop: "30px" }}>
      <SearchField
        placeholderText="Search Route"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <DataGrid rows={filteredRows} columns={columns} hideFooter={true} />

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
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
