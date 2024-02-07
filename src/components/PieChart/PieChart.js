import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import "./PieChart.css";
const data = [
  { id: 0, value: ".35", label: "Colombo-Matara" },
  { id: 1, value: ".25", label: "Kandy-Colombo" },
  {
    id: 2,
    value: ".30",
    label: "Colombo-Katargama",
  },
  { id: 3, value: ".15", label: "Other" },
];

export default function PieActiveArc() {
  return (
    <>
      <div className="pieAndTextContainer">
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
        <div className="centeredTypography">
          <Typography>Busy Routes</Typography>
        </div>
      </div>
    </>
  );
}
