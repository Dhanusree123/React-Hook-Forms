"use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

type Attr = {
  series: number[];
  options: ApexOptions;
};
const PieChart = () => {
  const [state] = React.useState<Attr>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 400,
        type: "pie",
        toolbar: {
          show: false,
        },
      },
      labels: ["HTML", "JAVA", "SQL", "CSS", "PYTHON"],
      title: {
        text: "Usage of Programming languages",
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
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width={380}
      />
    </>
  );
};

export default PieChart;
