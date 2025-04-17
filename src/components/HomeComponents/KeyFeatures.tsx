'use client'

import React from 'react'
import { features } from '@/helper/KeyFeatures'
import Image from 'next/image'
import { motion } from 'framer-motion'

// this is how you use variants to make code clean, nothing else
// const cardVariants = {
//   offscreen: {
// y: 100,
// opacity: 0,
//   },
//   onscreen: {
// y: 0,
// opacity: 1,
// transition: {
//   type: 'spring',
//   bounce: 0.4,
//   duration: 0.8,
// }

//     },
//   },
// }

export default function KeyFeatures() {
  return (
    <div
      id="features"
      className="w-full py-20 px-6 rounded-t-[2.5rem] my-10 bg-gray-50"
    >
      <h2 className="text-center text-5xl py-2 font-mitr font-bold text-violet-600 mb-8">
        Why Choose WiseUp?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <Cards
            feature={feature}
            key={index}
          />

        ))}
      </div>
    </div>
  )
}

function Cards({ feature }: {
  feature: any
}) {
  return (
    <div className=''>
      <motion.div
        className="p-[4px] hover:shadow-2xl hover:shadow-pink-500 rounded-xl bg-gradient-to-br from-violet-600 via-violet-500 to-pink-500  "
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.8,
          }
        }}
        viewport={{ once: true, amount: 0.6 }}
      // variants={cardVariants}
      >
        <div className='bg-white rounded-xl p-6'>

          <div className="flex  justify-center mb-4">
            <Image
              width={50}
              height={50}
              src={feature.logoSrc}
              alt={`${feature.title} logo`}
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-xl text-gray-700 font-semibold mb-4">{feature.title}</h3>
          <p className="text-gray-700">{feature.description}</p>
        </div>
      </motion.div>
    </div>

  )
}
