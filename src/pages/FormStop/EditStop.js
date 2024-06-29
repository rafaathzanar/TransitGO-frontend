// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Autocomplete,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useNavigate } from "react-router";

// const EditStop = () => {
//   const [busStops, setBusStops] = useState([]);
//   const [selectedStop, setSelectedStop] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const navigate = useNavigate();

//   const [openDialog, setOpenDialog] = useState(false); // State for success dialog
//   const [stopsErrorDialog, setStopsErrorDialog] = useState(false); // State for stops validation error dialog
//   const [successMessage, setSuccessMessage] = useState(""); // Message for success dialog

//   useEffect(() => {
//     const loadBusStops = async () => {
//       try {
//         const busStopData = await axios.get("http://localhost:8080/busstoplocations");
//         const busStopNames = busStopData.data.map((stop) => ({
//           label: stop.name.trim(),
//           id: stop.id,
//           latitude: stop.latitude,
//           longitude: stop.longitude,
//         }));
//         setBusStops(busStopNames);
//       } catch (error) {
//         console.error("Error loading bus stops:", error.message);
//       }
//     };
//     loadBusStops();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedStop || !latitude || !longitude) {
//       setStopsErrorDialog(true);
//       return;
//     }

//     const stop = {
//       name: selectedStop.label,
//       latitude: latitude,
//       longitude: longitude,
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/busstoplocation/${selectedStop.id}`,
//         stop
//       );
//       if (response.status === 200) {
//         setSuccessMessage("Stop updated successfully.");
//         setOpenDialog(true);
//       }
//     } catch (error) {
//       console.error("Error updating stop:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedStop) {
//       setStopsErrorDialog(true);
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/busstoplocation/${selectedStop.id}`
//       );
//       if (response.status === 200) {
//         setSuccessMessage("Stop deleted successfully.");
//         setOpenDialog(true);
//       }
//     } catch (error) {
//       console.error("Error deleting stop:", error);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     navigate("/admin/routeschedule/stopmanagement");
//   };

//   const handleCloseStopsErrorDialog = () => {
//     setStopsErrorDialog(false);
//   };

//   return (
//     <Grid container item xs={10}>
//       <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={12}>
//               <Autocomplete
//                 options={busStops}
//                 getOptionLabel={(option) => option.label}
//                 onChange={(event, value) => {
//                   setSelectedStop(value);
//                   if (value) {
//                     setLatitude(value.latitude);
//                     setLongitude(value.longitude);
//                   } else {
//                     setLatitude("");
//                     setLongitude("");
//                   }
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Select Bus Stop"
//                     variant="outlined"
//                     required
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={12}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Latitude"
//                 name="latitude"
//                 value={latitude}
//                 onChange={(e) => setLatitude(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={12}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Longitude"
//                 name="longitude"
//                 value={longitude}
//                 onChange={(e) => setLongitude(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary">
//                 Edit
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 style={{ marginLeft: "10px" }}
//                 onClick={handleDelete}
//               >
//                 Delete
//               </Button>
//             </Grid>
//           </Grid>
//         </form>

//         {/* Success dialog */}
//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <DialogTitle>{successMessage}</DialogTitle>
//           <DialogContent>
//             <Typography>{successMessage}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} color="primary">
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Error dialog */}
//         <Dialog open={stopsErrorDialog} onClose={handleCloseStopsErrorDialog}>
//           <DialogTitle>Error</DialogTitle>
//           <DialogContent>
//             <Typography>Please select a bus stop, and enter latitude and longitude.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseStopsErrorDialog} color="primary">
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Grid>
//     </Grid>
//   );
// };

// export default EditStop;
