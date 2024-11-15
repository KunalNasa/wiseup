import Image from 'next/image'
import React from 'react'

const SecondHome = () => {
  return (
    <div className='MainContainer flex flex-col'>
        <div className='flex p-10 my-5'>
        <div className=" w-1/2 flex items-center justify-center rounded-lg">
            <Image className='p-1 rounded-md' width={500} height={450} src="/Images/ManageExpense.png" alt="Tracker" />
        </div>
        <div className='w-1/2 flex flex-col items-center justify-center'>
          <h2 className='text-6xl text-indigo-500 font-bold'>
            Simplify Your Financial Life
          </h2>
          <p className='text-2xl font-semibold text-gray-700 py-5'>
            Stay on top of your personal or business finances with an intuitive and secure platform designed to help you save time, reduce stress, and grow wealth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecondHome
