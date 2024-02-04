import React from "react";
import { Scatter } from "react-chartjs-2";
import { ChartData } from "../../types/Interfaces";

interface ScatterPlotProps {
  chartData: ChartData;
  pointColor: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Individual Country Analysis",
      },
    },
  };

  return <Scatter options={options} data={chartData} />;
};

export default ScatterPlot;
