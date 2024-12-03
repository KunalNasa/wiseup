import Footer from '@/components/Footer'
import { PremiumCard } from '@/components/PremiumCard'
import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'

const page = () => {
  return (
    <div className='MainContainer bg-indigo-50 w-full flex flex-col items-center justify-center'>
      <div className='w-10/12 flex flex-col items-center justify-center'>
        <h1 className='text-5xl text-indigo-500 font-semibold p-10 text-center w-8/12'>Unlock Your Financial Freedom with WiseUp Premium</h1>
        <p className='w-11/12 text-gray-700 font-mono'>
          Tired of limits holding you back? With WiseUp Premium, you can take full control of your finances like never before. Enjoy unlimited transaction entries, get detailed weekly spend analysis, and track your daily expenses effortlessly. Make smarter financial decisions and achieve your goals faster. Upgrade today and experience the power of premium financial tracking.
        </p>
        <div className='p-10 my-5'>
          <h2 className='text-4xl text-center font-semibold text-indigo-500 py-10'>
          Why Go Premium?
          </h2>
          <PremiumCard/>
        </div>
      </div>
    </div>
  )
}

export default page
