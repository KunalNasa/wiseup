import React from 'react'
import LineChart from '../charts/LineChart'

const DailyProgress = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Daily Amount Chart</h1>
      <div className="max-w-3xl">
        <LineChart />
      </div>
    </div>
  )
}

export default DailyProgress
