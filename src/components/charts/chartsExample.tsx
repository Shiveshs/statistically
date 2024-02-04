import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { ChartData } from "../../types/Interfaces";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart 1",
    },
  },
};

interface ChartsExampleProps {
  chartData: ChartData;
}

function ChartsExample({ chartData }: ChartsExampleProps) {
  return <Bar options={options} data={chartData} />;
}

export default ChartsExample;
