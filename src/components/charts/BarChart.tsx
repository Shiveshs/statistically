import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "../../types/Interfaces";

interface BarChartProps {
  chartData: ChartData;
}

const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Comparative Analysis",
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default BarChart;
