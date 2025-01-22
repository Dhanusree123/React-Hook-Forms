"use client";
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

type Attr = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};

const AreaChart = () => {
  const [state] = useState<Attr>({
    series: [
      {
        name: "STOCK MARKET",
        data: [8165, 8173, 8183, 8245, 8264, 8345],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Fundamental Analysis of Stock Market",
        align: "left",
      },
      subtitle: {
        text: "Prices",
        align: "left",
      },
      labels: ["17 Nov", "21 Nov", "25 Nov", "29 Nov", "03 Dec", "07 Dec"],
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });
  return (
    <Box>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </Box>
  );
};

export default AreaChart;
