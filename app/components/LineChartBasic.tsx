"use client";
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Attr = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};

const LineChartBasic = () => {
  const [state] = useState<Attr>({
    series: [
      {
        name: "Employees",
        data: [10, 14, 25, 21, 24, 20, 27, 18, 22],
      },
    ],
    options: {
      chart: {
        height: 400,
        type: "line",
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
        text: "Employees in a Company Every Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  return (
    <Box>
      <Box>
        <ApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={400}
        />
      </Box>
    </Box>
  );
};

export default LineChartBasic;
