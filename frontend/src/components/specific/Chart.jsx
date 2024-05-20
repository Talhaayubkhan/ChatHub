import React from "react";
import { Line, Doughnut } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { getLastSevenDays } from "../../lib/features";

ChartJS.register(
  Tooltip,
  Filler,
  PointElement,
  LineElement,
  ArcElement,
  LinearScale,
  Legend,
  CategoryScale
);

const labels = getLastSevenDays();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ chartDataArray = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: chartDataArray,
        label: "Revenue",
        backgroundColor: "#423ae0",
        borderColor: "#1d15bd",
        fill: true,
      },
    ],
  };
  return <Line data={data} options={LineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 110,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
};
const DoughnutChart = ({ chartDataArray = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: chartDataArray,
        label: "Total Chats vs Group Chats",
        backgroundColor: ["#423ae0", "#1d15bd"],
        hoverBackgroundColor: ["orange", "#1da3b8"],
        borderColor: ["#3sa123"],
        offset: 35,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 25 }}
      data={data}
      options={doughnutChartOptions}
    ></Doughnut>
  );
};

export { LineChart, DoughnutChart };
