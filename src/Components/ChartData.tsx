"use client";

import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { Navigation } from "./Navigation";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartType = {
  label: string;
  chartid: string;
  charttype: "line" | "bar" | "area" | "pie";
  chartcurve?: "smooth" | "straight" | "stepline";
  horizontal?: boolean;
  chartdatalabel?: boolean;
  align?: "center";
};

const ChartData = ({
  label,
  chartid,
  charttype,
  chartcurve,
  horizontal = false,
  chartdatalabel = false,
  align = "center",
}: ChartType) => {
  const options = {
    chart: {
      id: chartid,
      zoom: {
        enabled: false,
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

    plotOptions: {
      bar: {
        horizontal: horizontal,
      },
    },

    title: {
      text: label,
      align: align,
    },
    stroke: {
      curve: chartcurve,
    },
    dataLabels: {
      enabled: chartdatalabel,
    },
  };

  const series = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 105, 90, 130],
    },
  ];

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
            type={charttype}
            width="900px"
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default ChartData;
