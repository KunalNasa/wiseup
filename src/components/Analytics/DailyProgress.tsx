import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import useCronData from '@/hooks/useCronData';

const DailyProgress = () => {
  const { fetchDailyTotalData } = useCronData();
  const [dailyData, setDailyData] = useState<{
    userId: string;
    dailyTotal: { amount: number; date: string }[];
    date: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDailyTotalData(); // Call the async function to fetch data
        setDailyData(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching daily data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Daily Expenses</h1>
      <div className="max-w-3xl">
        {loading ? (
          <p>Loading...</p>
        ) : (dailyData && dailyData.dailyTotal) ? (
          <LineChart dailyData={dailyData} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default DailyProgress;
