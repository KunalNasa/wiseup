import Image from 'next/image'
import React from 'react'

const SecondHome = () => {
  return (
    <div className='MainContainer bg-gray-50 flex flex-col'>
        <div className='flex p-10 my-5'>
        <div className='w-1/2 flex flex-col justify-center p-10'>
          <h2 className='text-6xl font-mitr text-violet-600 font-bold'>
          Monitor Your Financial Health with Ease
           
          </h2>
          <p className='text-lg w-[80%] text-start text-gray-600 py-5'>
            Get a clear view of your financial journey with detailed analysis of yearly spending, weekly breakdowns, and a comprehensive profile overview. Keep track of your total expenses in one place and make smarter decisions to achieve your financial goals.

            Unlock the power of AI-powered Smart Analysis to uncover trends and gain actionable insights for better budgeting and savings.
          </p>
        </div>
        <div className=" w-1/2 flex flex-col items-center justify-center rounded-lg">
            <h2 className='mb-3 text-4xl font-mitr text-gradient font-bold'>Maintain Records</h2>
            <Image className='rounded-lg shadow-2xl shadow-pink-500 ' width={500} height={450} src="/track1.svg" alt="Tracker" />
        </div>
      </div>
    </div>
  )
}

export default SecondHome
