import React from 'react'
import { categoryData } from '@/lib/cronJobsData'
import CircularBarChart from '../charts/Barchart'
const CategoryDivision = () => {
  return (
    <div className="p-4 flex items-center justify-center">
      <CircularBarChart categoryData={categoryData} />
    </div>
  )
}

export default CategoryDivision
