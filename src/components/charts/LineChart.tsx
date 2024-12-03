'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface DailyData {
  amount: number;
  date: string;
}

interface LineChartProps {
  dailyData: {
    userId: string;
    dailyTotal: DailyData[];
    date: string;
  };
}

const LineChart: React.FC<LineChartProps> = ({ dailyData }) => {
  // Prepare the data for the chart
  const labels = dailyData.dailyTotal.map((data) => {
    const date = new Date(data.date);
    return date.toLocaleDateString(); // Formats the date to a readable format
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Amount',
        data: dailyData.dailyTotal.map((data) => data.amount),
        fill: false,
        borderColor: '#6366F1',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Use 'as const' to narrow the type to the specific valid values
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `Amount: Rs ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl">Daily Expenses</h2>
      <div className="my-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
