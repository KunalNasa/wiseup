/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';

// Register necessary components of Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface Category {
  category: string;
  amount: number;
}

interface CircularBarChartProps {
  categoryData: {
    categoryTotals: Array<{
      categories: Array<Category>;
      date: string;
    }>;
  };
}

const CircularBarChart: React.FC<CircularBarChartProps> = ({ categoryData }) => {
  // Extract categories and amounts from the categoryTotals data
  const latestCategoryData = categoryData.categoryTotals[categoryData.categoryTotals.length - 1];
  const categories = latestCategoryData?.categories || [];

  // Prepare the data for the doughnut chart
  const labels = categories.map((item) => item.category);
  const data = categories.map((item) => item.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Category Expenses',
        data: data,
        backgroundColor: ['#4F46E5', '#6D28D9', '#9333EA', '#EC4899'], // You can add more colors or randomize
        borderWidth: 0, // Remove the border for smoother appearance
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: '70%', // Makes the chart look like a circular bar chart
    plugins: {
      legend: {
        position: 'top' as const, // Legend position
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: $${tooltipItem.raw}`, // Custom tooltip label
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl">Category Expenses</h2>
      <div className="flex justify-center my-4"style={{ width: '300px', height: '300px' }} >
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CircularBarChart;
