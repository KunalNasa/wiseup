import Image from 'next/image'
import React from 'react'

const ThirdHome = () => {
  return (
    <div className='MainContainer bg-white flex flex-col'>
        <div className='flex p-10 my-5'>
        <div className=" w-1/2 flex flex-col items-center justify-center rounded-lg">
            <h2 className='mb-3 text-4xl font-mitr text-gradient font-bold'>Smart Analysis</h2>
            <Image className='rounded-lg shadow-2xl shadow-violet-500 ' width={500} height={450} src="/track2.svg" alt="Tracker" />
        </div>
        <div className='w-1/2 flex flex-col justify-center p-10'>
          <h2 className='text-6xl font-mitr text-violet-600 font-bold'>
          Keep Track of Your Balance
          </h2>
          <p className='text-lg w-[80%] text-start text-gray-600 py-5'>
          Stay on top of your personal or business finances with an intuitive and secure platform designed to help you save time, reduce stress, and grow wealth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThirdHome
