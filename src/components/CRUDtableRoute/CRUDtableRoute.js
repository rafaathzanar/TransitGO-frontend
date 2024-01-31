import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CRUDtable() {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      routeno: "123",
      route: "Route A",
      listofbuses: "Bus1, Bus2",
      actions: "Delete",
    },
    {
      id: 2,
      routeno: "456",
      route: "Route B",
      listofbuses: "Bus3, Bus4",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 3,
      routeno: "789",
      route: "Route C",
      listofbuses: "Bus5, Bus6",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 4,
      routeno: "101",
      route: "Route D",
      listofbuses: "Bus7, Bus8",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 5,
      routeno: "112",
      route: "Route E",
      listofbuses: "Bus9, Bus10",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 6,
      routeno: "131",
      route: "Route F",
      listofbuses: "Bus11, Bus12",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 7,
      routeno: "145",
      route: "Route G",
      listofbuses: "Bus13, Bus14",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 8,
      routeno: "157",
      route: "Route H",
      listofbuses: "Bus15, Bus16",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 9,
      routeno: "169",
      route: "Route I",
      listofbuses: "Bus17, Bus18",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 10,
      routeno: "171",
      route: "Route J",
      listofbuses: "Bus19, Bus20",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 11,
      routeno: "183",
      route: "Route K",
      listofbuses: "Bus21, Bus22",
      "update/delete": "Update",
      actions: "Delete",
    },
    {
      id: 12,
      routeno: "194",
      route: "Route L",
      listofbuses: "Bus23, Bus24",
      actions: "Delete",
    },
  ]);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedRowId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleDelete = (id) => {
    handleClickOpen(id);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((row) => row.id !== selectedRowId);
    setRows(updatedRows);

    handleClose();
  };
  const handleEdit = (id) => {
    console.log(`Editing row with id ${id}`);
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
          <Link to={`/edit/${params.row.id}`}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "40rem", width: "60rem", marginTop: "30px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10]}
        checkboxSelection
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
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
