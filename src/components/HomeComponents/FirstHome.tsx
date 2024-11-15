import Image from 'next/image'
import React from 'react'

const FirstHome = () => {
  return (
    <div className='MainContainer bg-slate-100 flex flex-col'>
      <div className='flex p-20 my-5'>
        <div className='w-1/2 flex flex-col items-center justify-center'>
          <h1 className='text-7xl text-gradient font-bold'>
            Take Control of Your Finances with WiseUp
          </h1>
          <p className='text-2xl font-semibold text-gray-700 py-5'>
            Manage transactions, track expenses, and make smarter financial decisions <span className='text-indigo-500'>—all in one place.</span>
          </p>
        </div>
        <div className=" w-1/2 flex items-center justify-center rounded-lg">
            <Image className='p-1 rounded-md' width={500} height={450} src="/Images/ExpenseGraph.png" alt="Tracker" />
        </div>

      </div>
    </div>
  )
}

export default FirstHome
