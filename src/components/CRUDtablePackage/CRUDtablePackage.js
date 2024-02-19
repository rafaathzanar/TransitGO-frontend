import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";

export default function CRUDtablePackage({ searchData }) {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      packageNo: "P001",
      from: "Location A",
      to: "Location B",
      busID: "B001",
      receiverName: "John Doe",
      nic: "1234567890",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
    },
    {
      id: 2,
      packageNo: "P002",
      from: "Location C",
      to: "Location D",
      busID: "B002",
      receiverName: "Jane Smith",
      nic: "0987654321",
      paymentStatus: "Pending",
      deliveryStatus: "In Transit",
    },
    {
      id: 3,
      packageNo: "P003",
      from: "Location E",
      to: "Location F",
      busID: "B003",
      receiverName: "Alice Johnson",
      nic: "1357924680",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
    },
    // Add more objects as needed with the same structure
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

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = rows.filter(
      (row) =>
        row.packageNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.from.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.to.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.busID.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.receiverName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.nic.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.paymentStatus
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        row.deliveryStatus.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const columns = [
    { field: "packageNo", headerName: "ID", width: 100 },
    { field: "from", headerName: "From", width: 120 },
    { field: "to", headerName: "To", width: 100 },
    { field: "busID", headerName: "Bus Id", width: 110 },
    { field: "receiverName", headerName: "Receiver", width: 140 },
    { field: "nic", headerName: "NIC", width: 100 },
    { field: "paymentStatus", headerName: "Payment", width: 130 },
    { field: "deliveryStatus", headerName: "Delivery", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{ width: "70rem", backgroundColor: "hsla(190, 96%, 80%, 0.2)" }}
    >
      <SearchField
        placeholderText="Search Package"
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
