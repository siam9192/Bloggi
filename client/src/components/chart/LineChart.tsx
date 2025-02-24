import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type TDataSet = {
  label: string;
  data: number[];
  borderColor: string;
  fill: boolean;
  tension: number;
};
type TOptions = {
  title: string;
  scaleXText?: string;
  scaleYText?: string;
};

interface ILineChartProps {
  data: {
    labels: Array<string | number>;
    datasets: TDataSet[];
  };
  options: TOptions;
}

const LineChart = ({ data, options: optionsData }: ILineChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: optionsData.title,
      },
    },
  };

  return <Line data={data} options={options as any} />;
};

export default LineChart;
