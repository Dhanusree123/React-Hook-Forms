"use client";

import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { Navigation } from "./Navigation";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart = () => {
  const options = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    title: {
      text: "Pie Chart",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = [30, 40, 35, 50, 49, 60, 70, 91, 125, 105, 90, 130];

  return (
    <>
      <Navigation />
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", width: "100%" }}
      >
        <Grid2>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            width="500px"
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default PieChart;
