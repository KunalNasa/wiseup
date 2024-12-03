import React, { useEffect, useState } from 'react';
import DoughnutChart from '../charts/DoughnutChart';
import useCronData from '@/hooks/useCronData';

interface Category {
  category: string;
  amount: number;
}

interface CategoryTotals {
  categories: Category[];
  date: string;
}

interface CronData {
  categoryTotals: CategoryTotals[];
}

const CategoryDivision = () => {
  const { categoriesData, loading } = useCronData();
  const [data, setData] = useState<CronData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await categoriesData();
      if (response && response.categoryTotals) {
        setData(response);
      } else {
        setData(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 flex">
      {!data || data.categoryTotals.length === 0 ? (
        <div>{loading ? "Loading": "No data to display right now, data will be available after one week of use"}</div>
      ) : (
        <DoughnutChart categoryData={data} />
      )}
    </div>
  );
};

export default CategoryDivision;
