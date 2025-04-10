'use client'

import ProfileCard from "@/components/AnalyticsHelper/ProfileCard";
import CategoryDivision from "@/components/Charts/CategoryDivision.chart";
import PaymentDivision from "@/components/Charts/PaymentDivision.chart";
import Weekly from "@/components/Charts/Weekly.chart";
import Yearly from "@/components/Charts/Yearly.chart";
import { statsResponse } from "@/types/stats.type";
import { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState<null | statsResponse>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stats');
      const decoded = await response.json();
      const data: statsResponse = decoded.data;
      setData(data);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col w-full lg:flex-row min-h-screen">
      <div className="flex-1 flex flex-col w-full">
        {/* Top Section */}
        <div className="grid p-2 w-full gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          <div className="md:row-span-2">
            <ProfileCard data={data || null} loading={loading} />
          </div>
          <div>
            <CategoryDivision data={data?.categoryDivisions || []} loading={loading} />
          </div>
          <div>
            <PaymentDivision loading={loading} data={data?.paymentMethodDivisions || []} />
          </div>
          <div className="md:col-span-2">
            <Weekly loading={loading} data={data?.lastWeek || {}} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full p-2">
          <Yearly loading={loading} data={data?.lastYear || {}} />
        </div>
      </div>
    </div>
  );
}
