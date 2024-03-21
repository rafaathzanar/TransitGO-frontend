import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";
import { List, ListItem, ListItemText } from "@mui/material";

export default function CRUDtableRoute() {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openBUSLIST, setOpenBUSLIST] = useState(false);
  const [openBUSSTOPLIST, setOpenBUSSTOPLIST] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      routeno: "123",
      route: "Route A",
      busstops:
        "Stop 1 , Stop 2, Stop 3 , Stop 4 ,Stop 5 , Stop 6,Stop 7 , Stop 8 ",
      listofbuses: "Bus 1, Bus 2",
    },
    {
      id: 2,
      routeno: "456",
      route: "Route B",
      busstops: "Stop 1 , Stop 2 ",
      listofbuses: "Bus 3, Bus 4",
    },
    // Add more rows here as needed
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchValue, setSearchValue] = useState("");

  const handleDelete = (id = null) => {
    setSelectedRowId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((row) => row.id !== selectedRowId);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    console.log(`Editing row with id ${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = rows.filter(
      (row) =>
        row.routeno.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.route.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const columns = [
    { field: "routeno", headerName: "Route No.", width: 200 },
    { field: "route", headerName: "Route", width: 200 },
    {
      field: "busstops",
      headerName: "Bus Stops",
      width: 200,
      renderCell: (params) => (
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setSelectedRowId(params.row.id);
            setOpenBUSSTOPLIST(true);
          }}
        >
          List Of Bus Stops
        </a>
      ),
    },
    {
      field: "listofbuses",
      headerName: "Available Buses",
      width: 200,
      renderCell: (params) => (
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setSelectedRowId(params.row.id);
            setOpenBUSLIST(true);
          }}
        >
          List Of Buses
        </a>
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
    <div
      style={{
        width: "70rem",
        backgroundColor: "hsla(190, 96%, 80%, 0.2)",
        marginTop: "30px",
      }}
    >
      <SearchField
        placeholderText="Search Route"
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
      <Dialog open={openBUSLIST} onClose={() => setOpenBUSLIST(false)}>
        <DialogTitle>Current Buses Availabe In The Route</DialogTitle>
        <DialogContent>
          <List>
            {selectedRowId !== null &&
              rows
                .find((row) => row.id === selectedRowId)
                .listofbuses.split(",")
                .map((bus, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={bus.trim()} />
                  </ListItem>
                ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBUSLIST(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBUSSTOPLIST} onClose={() => setOpenBUSSTOPLIST(false)}>
        <DialogTitle>Current Buses Availabe In The Route</DialogTitle>
        <DialogContent>
          <List>
            {selectedRowId !== null &&
              rows
                .find((row) => row.id === selectedRowId)
                .busstops.split(",")
                .map((stop, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={stop.trim()} />
                  </ListItem>
                ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBUSSTOPLIST(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
