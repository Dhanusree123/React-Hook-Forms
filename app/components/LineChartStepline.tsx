"use client";
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Attr = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};
const ApexChart = () => {
  const [state] = useState<Attr>({
    series: [
      {
        name: "Carona cases",
        data: [34, 44, 54, 21, 12, 43, 34, 56, 59, 57, 23, 34],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 400,
      },
      stroke: {
        curve: "stepline",
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Carona Cases in Japan every month",
        align: "left",
      },
      markers: {
        hover: {
          sizeOffset: 4,
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
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  });
  return (
    <Box>
      <Box>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={400}
        />
      </Box>
    </Box>
  );
};

export default ApexChart;
