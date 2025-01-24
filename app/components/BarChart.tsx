"use client";
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

type Attr = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};
const BarChart = () => {
  const [state] = React.useState<Attr>({
    series: [
      {
        name: "Populations across India(in millions)",
        data: [400, 430, 448, 470, 540, 580, 690, 1100],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      title: {
        text: "Populations across India(in millions)",
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Banglore",
          "Hyderabad",
          "Kolkata",
          "Mumbai",
          "Delhi",
          "Goa",
          "Kerala",
          "Chennai",
        ],
      },
    },
  });
  return (
    <Box>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default BarChart;
