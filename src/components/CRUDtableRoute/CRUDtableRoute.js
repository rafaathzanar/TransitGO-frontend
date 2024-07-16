//CRUDtableRoute.js
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";

export default function CRUDtableRoute() {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRouteNo, setSelectedRouteNo] = useState(null);
  const [openBUSLIST, setOpenBUSLIST] = useState(false);
  const [openBUSSTOPLIST, setOpenBUSSTOPLIST] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/busroutes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const routesWithIds = result.data.map((route) => ({
        ...route,
        id: route.routeno.toString(), // Using routeno as unique id
      }));
      setRoutes(routesWithIds);
      setFilteredRows(routesWithIds);
    } catch (error) {
      console.error("Error loading routes:", error.message);
    }
    setLoading(false);
  };

  const [filteredRows, setFilteredRows] = useState(routes);
  const [searchValue, setSearchValue] = useState("");

  const handleDelete = (id, routeno) => {
    setSelectedRowId(id);
    setSelectedRouteNo(routeno);
    setOpen(true);
  };

  const handleConfirmDelete = async (routeno) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/busroute/${routeno}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadRoutes();
    } catch (error) {
      console.error("Error deleting route:", error.message);
    }
    console.log("Route number ", routeno, "has been deleted");
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleEdit = (routeno) => {
    navigate(`editroute/${routeno}`);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchValue(searchValue);

    const filtered = routes.filter((row) => {
      const routeNoString = row.routeno.toString();

      return (
        routeNoString.includes(searchValue) ||
        row.routename.toLowerCase().includes(searchValue)
      );
    });
    setFilteredRows(filtered);
  };

  const columns = [
    { field: "routeno", headerName: "Route No.", width: 200 },
    { field: "routename", headerName: "Route", width: 200 },
    {
      field: "busstops",
      headerName: "Bus Stops",
      width: 200,
      renderCell: (params) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedRowId(params.id);
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
            setSelectedRowId(params.id);
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
            onClick={() => handleDelete(params.row.id, params.row.routeno)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.routeno)}
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
        marginBottom: "30px",
      }}
    >
      <SearchField
        placeholderText="Search Route"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {loading && <LoadingComponent />}
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
        <DialogTitle>Buses In The Route</DialogTitle>
        <DialogContent>
          <List>
            {selectedRowId !== null &&
              (routes.find((row) => row.id === selectedRowId)?.buses.length >
              0 ? (
                routes
                  .find((row) => row.id === selectedRowId)
                  ?.buses.map((bus) => (
                    <ListItem key={bus.id}>
                      <ListItemText primary={bus.regNo} />
                    </ListItem>
                  ))
              ) : (
                <ListItem key="no-buses">
                  <ListItemText primary="No buses are currently assigned to the route" />
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
        <DialogTitle>Bus Stops In The Route</DialogTitle>
        <DialogContent>
          <List>
            {selectedRowId !== null &&
              routes
                .find((row) => row.id === selectedRowId)
                ?.busStops.sort((a, b) => a.orderIndex - b.orderIndex) // Sort busStops by orderIndex
                .map((stop) => (
                  <ListItem sx={{ color: "#132968" }} key={stop.id}>
                    <ShareLocationIcon />
                    <ListItemText
                      sx={{ marginLeft: "20px" }}
                      primary={stop.name}
                    />
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
            Are you sure you want to delete this route?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete(selectedRouteNo)}
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
