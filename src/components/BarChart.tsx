import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js/auto"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LineChart: React.FC<{ chartData: any, chartOptions: any }> = ({ chartData, chartOptions }) => {
    return <Line data={chartData} options = {chartOptions} />;
};

export default LineChart;
