import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CommonButton from "../common/CommonButton/CommonButton";

export default function CRUDtableBus() {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([
    { id: 1, busid: 1, busRegNo: "ABC123", busRoutes: "Route A" },
    { id: 2, busid: 2, busRegNo: "XYZ789", busRoutes: "Route B" },
    { id: 3, busid: 3, busRegNo: "DEF456", busRoutes: "Route C" },
    { id: 4, busid: 4, busRegNo: "GHI789", busRoutes: "Route D" },
    { id: 5, busid: 5, busRegNo: "JKL012", busRoutes: "Route E" },
    { id: 6, busid: 6, busRegNo: "MNO345", busRoutes: "Route F" },
    { id: 7, busid: 7, busRegNo: "PQR678", busRoutes: "Route G" },
    { id: 8, busid: 8, busRegNo: "STU901", busRoutes: "Route H" },
    { id: 9, busid: 9, busRegNo: "VWX234", busRoutes: "Route I" },
    { id: 10, busid: 10, busRegNo: "YZA567", busRoutes: "Route J" },
    { id: 11, busid: 11, busRegNo: "BCD890", busRoutes: "Route K" },
    { id: 12, busid: 12, busRegNo: "EFG123", busRoutes: "Route L" },
    { id: 13, busid: 13, busRegNo: "HIJ456", busRoutes: "Route M" },
    { id: 14, busid: 14, busRegNo: "KLM789", busRoutes: "Route N" },
    { id: 15, busid: 15, busRegNo: "NOP012", busRoutes: "Route O" },
    { id: 16, busid: 16, busRegNo: "PQR345", busRoutes: "Route P" },
    { id: 17, busid: 17, busRegNo: "STU678", busRoutes: "Route Q" },
    { id: 18, busid: 18, busRegNo: "VWX901", busRoutes: "Route R" },
    { id: 19, busid: 19, busRegNo: "YZA234", busRoutes: "Route S" },
    { id: 20, busid: 20, busRegNo: "BCD567", busRoutes: "Route T" },
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
    { field: "busid", headerName: "Bus Id", width: 200 },
    { field: "busRegNo", headerName: "Bus RegNo", width: 200 },
    { field: "busRoutes", headerName: "Bus Routes", width: 200 },
    {
      field: "actions",
      headerName: "",
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
        pageSize={10}
        pageSizeOptions={[5, 10]}
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
