"use client";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";

type Attr = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};
const AreaSpinline = () => {
  const [state] = useState<Attr>({
    series: [
      {
        name: "Temperature",
        data: [31, 40, 28, 51, 22, 39, 40],
      },
      {
        name: "Humidity",
        data: [11, 32, 25, 32, 34, 12, 31],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </>
  );
};

export default AreaSpinline;
