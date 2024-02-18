import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import "./PieChartTraffic.css";
const data = [
  { id: 0, value: ".35", label: "Very high" },
  { id: 1, value: ".25", label: "High" },
  {
    id: 2,
    value: ".30",
    label: "Low",
  },
  { id: 3, value: ".15", label: "Very Low" },
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
          height={250}
        />
        <div className="centeredTypography">
          <Typography></Typography>
        </div>
      </div>
    </>
  );
}
