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

export default function CRUDtablePackage({}) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const result = await axios.get("http://localhost:8080/packages");
      const packagessWithIds = result.data.map((pack, index) => ({
        ...pack,
        id: index + 1,
      }));
      setPackages(packagessWithIds);
      setFilteredRows(packagessWithIds);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deletePackage = async (packageID) => {
    await axios.delete(`http://localhost:8080/package/${packageID}`);
    loadPackages();
  };

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [searchValue, setSearchValue] = useState(""); // New state for search input value

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = packages.filter(
      (row) =>
        row.from.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.to.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.busID.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.receiverName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.nic.toLowerCase().includes(e.target.value.toLowerCase()) ||
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
      width: 120,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => deletePackage(params.row.packageID)}
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
    </div>
  );
}
