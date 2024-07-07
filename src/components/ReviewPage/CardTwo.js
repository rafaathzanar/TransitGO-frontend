// import React, { useState } from "react";
// import Reviews from "./Reviews";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import PieChartTraffic from "../PieChart crowd/PieChartTraffic";

// function CardTwo() {
//   const initialData = [
//     { id: 0, value: 0.25, label: "Very High" },
//     { id: 1, value: 0.25, label: "High" },
//     { id: 2, value: 0.25, label: "Low" },
//     { id: 3, value: 0.25, label: "Very Low" },
//   ];

//   const [pieChartData, setPieChartData] = useState(initialData);

//   const handleRadioChange = (label) => {
//     setPieChartData((prevData) => {
//       const newData = prevData.map((item) => {
//         if (item.label === label) {
//           return { ...item, value: 0.35 };
//         } else {
//           return { ...item, value: 0.65 / (prevData.length - 1) };
//         }
//       });
//       return newData;
//     });
//   };

//   return (
//     <Grid m={3}>
//       <Typography
//         variant="h3"
//         fontFamily="Sans serif"
//         style={{ marginTop: "10px" }}
//       >
//         Passengers Data
//       </Typography>
//       <br />
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={12} md={12} lg={5}>
//           <Reviews heading="Route Traffic" onRadioChange={handleRadioChange} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={12} lg={7}>
//           <h1>Percentages</h1>
//           <PieChartTraffic data={pieChartData} />
//         </Grid>
//       </Grid>
//       <Grid container spacing={5} mt={2}>
//         <Grid item xs={12} sm={12} md={12} lg={5}>
//           <Reviews heading="Bus Crowd" onRadioChange={handleRadioChange} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={12} lg={7}>
//           <h1>Percentages</h1>
//           <PieChartTraffic data={pieChartData} />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }

// export default CardTwo;

