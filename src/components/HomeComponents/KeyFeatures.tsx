import React from 'react'
import { features } from '@/helper/KeyFeatures'
import Image from 'next/image'
const KeyFeatures = () => {
  return (
    <div className="w-full py-20 px-6 rounded-t-[2.5rem] bg-slate-100">
      <h2 className="text-center text-5xl font-bold text-indigo-600 mb-8">Why Choose WiseUp?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-10 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300"
          >
            <div className="flex justify-center mb-4">
              <Image width={50} height={50} src={feature.logoSrc} alt={`${feature.title} logo`} className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KeyFeatures
