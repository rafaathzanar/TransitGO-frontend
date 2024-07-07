// import React from "react";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import LinearProgress from "@mui/material/LinearProgress";

// export default function Reviews({ heading, onRadioChange }) {
//   const [value, setValue] = React.useState("");

//   const handleChange = (event) => {
//     setValue(event.target.value);
//     onRadioChange(event.target.value);
//   };

//   return (
//     <FormControl>
//       <RadioGroup
//         aria-labelledby="demo-controlled-radio-buttons-group"
//         name="controlled-radio-buttons-group"
//         value={value}
//         onChange={handleChange}
//       >
//         <FormLabel id="demo-controlled-radio-buttons-group">
//           <Typography variant="h4">{heading}</Typography>
//         </FormLabel>
//         <br />
//         <Card
//           sx={{
//             border: 1,
//             borderRadius: "15px",
//             borderColor: "#f2a2a2",
//             width: "15rem",
//             height: "14rem",
//           }}
//         >
//           <CardContent sx={{ backgroundColor: "#e6f2f5" }}>
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <FormControlLabel
//                 value="Very High"
//                 control={<Radio />}
//                 label={<Typography variant="h5">Very High</Typography>}
//                 labelPlacement="start"
//               />
//               <LinearProgress
//                 variant="determinate"
//                 value={value === "Very High" ? 100 : 0}
//               />

//               <FormControlLabel
//                 value="High"
//                 control={<Radio />}
//                 label={<Typography variant="h5">High</Typography>}
//                 labelPlacement="start"
//               />
//               <LinearProgress
//                 variant="determinate"
//                 value={value === "High" ? 100 : 0}
//               />

//               <FormControlLabel
//                 value="Low"
//                 control={<Radio />}
//                 label={<Typography variant="h5">Low</Typography>}
//                 labelPlacement="start"
//               />
//               <LinearProgress
//                 variant="determinate"
//                 value={value === "Low" ? 100 : 0}
//               />

//               <FormControlLabel
//                 value="Very Low"
//                 control={<Radio />}
//                 label={<Typography variant="h5">Very Low</Typography>}
//                 labelPlacement="start"
//               />
//               <LinearProgress
//                 variant="determinate"
//                 value={value === "Very Low" ? 100 : 0}
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </RadioGroup>
//     </FormControl>
//   );
// }
