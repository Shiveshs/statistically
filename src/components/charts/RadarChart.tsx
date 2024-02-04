import React from "react";
import { Radar } from "react-chartjs-2";
import { ChartData } from "../../types/Interfaces";

interface RadarChartProps {
  chartData: ChartData;
  radarColor: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Multi-dimensional Analysis",
      },
    },
  };

  return <Radar options={options} data={chartData} />;
};

export default RadarChart;
