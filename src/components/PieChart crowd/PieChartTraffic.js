import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import "./PieChartTraffic.css";

export default function PieChartTraffic({ data }) {
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

