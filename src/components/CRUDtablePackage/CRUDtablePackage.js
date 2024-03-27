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

export default function CRUDtablePackage({  }) {
  const [packages, setPackages] = useState([]);   
  useEffect(() => {
    loadPackages();
  }, []);
  const loadPackages = async () => {
    const result = await axios.get("http://localhost:8080/packages");
    const packagessWithIds = result.data.map((pack, index) => ({
      ...pack,
      id: index + 1,
    }));
    setPackages (packagessWithIds);
    setFilteredRows(packagessWithIds);
    console.log(result.data);
  }

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [searchValue, setSearchValue] = useState(""); // New state for search input value

  // Function to handle row deletion
  const handleDelete = (id = null) => {
    setSelectedRowId(id);
    setOpen(true);
  };

  // Function to confirm row deletion
  const handleConfirmDelete = () => {
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
    const filtered = packages.filter(
      (row) => 
        row.packageID.toLowerCase().includes(e.target.value.toLowerCase()) ||
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
    { field: "packageID", headerName: "ID", width: 50 },
    { field: "start", headerName: "From", width: 120 },
    { field: "destination", headerName: "To", width: 100 },
    { field: "busID", headerName: "Bus Id", width: 110 },
    { field: "receivedDate", headerName: "Date", width: 130 },
    { field: "receiverName", headerName: "Receiver", width: 140 },
    { field: "receiverNIC", headerName: "NIC", width: 140 },
    { field: "receiverContact", headerName: "Contact", width: 140 },
    { field: "payment", headerName: "Payment", width: 130 },
    { field: "status", headerName: "Delivery Status", width: 130 },
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
