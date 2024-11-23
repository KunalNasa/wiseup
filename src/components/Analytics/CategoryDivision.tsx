import React from 'react'
import { categoryData } from '@/lib/cronJobsData'
import CircularBarChart from '../charts/Barchart'
const CategoryDivision = () => {
  return (
    <div className="p-4">
      <h1 className="font-semibold">User Dashboard</h1>
      <CircularBarChart categoryData={categoryData} />
    </div>
  )
}

export default CategoryDivision
