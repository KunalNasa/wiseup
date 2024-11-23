/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { dailyData } from '@/lib/cronJobsData';  // Assuming your dailyData is exported here

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart: React.FC = () => {
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
            return `Amount: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
