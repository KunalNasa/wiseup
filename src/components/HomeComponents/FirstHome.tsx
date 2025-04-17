import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { HiOutlineLightBulb } from "react-icons/hi";
const FirstHome = () => {
  return (
    <div className='MainContainer  flex flex-col '>
      <div className='my-10 text-center mx-auto w-[60%]'>
        <p className='bg-pink-500/80 flex gap-2 items-center justify-center border border-pink-500 shadow-sm shadow-pink-500 w-1/3 rounded-full text-white mx-auto'>
        <span><HiOutlineLightBulb/></span>Track and analyze like pro</p>
        <h1 className='text-violet-600 my-10  py-5 font-mitr  text-7xl font-semibold '>Take Control Of Your Finances With <span className='relative text-gradient'>WiseUp <Image className='absolute right-5 ' width={300} height={100}  src="/sketchyline.svg" alt="" /></span></h1>
        <p className='text-gray-600'>Manage transactions, track expenses, and make smarter financial decisions all in one place.</p>
        <div className='my-20 flex gap-5 items-center justify-center'>
          <Link href="/sign-in" className='bg-gradient-to-br from-violet-600 via-violet-500 to-pink-600 shadow-pink  font-semibold text-white hover:bg-none border-2 hover:border-gray-200 hover:text-black rounded-full px-2 w-[30%] py-4'>Join Now</Link>
          <button className='hover:text-white bg-white-500 hover:bg-gradient-to-br hover:from-violet-600 hover:via-violet-500 hover:to-pink-600 text-black border-gray-200 border-2 font-semibold rounded-full px-2 w-[30%] py-4'>Explore Features</button>

        </div>
      </div>
    </div>
  )
}

export default FirstHome
