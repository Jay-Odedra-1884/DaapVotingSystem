"use client"

import useVotingSystem from '@/hooks/useVotingSystem'
import React from 'react'

function Landing() {

    const { topics } = useVotingSystem();

    if(topics === undefined) {
        return <div>Loading...</div>
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 mt-10'>
      {topics.map((topic, index) => (
        <div key={index} className='flex flex-col gap-2 shadow-2xl shadow-gray-400 rounded-2xl p-2'>
            <h2 className='text-xl font-semibold'>{topic.title}</h2>
            {
              topic.options.map((opt, idx) => (
                <div key={idx} className='bg-gray-200 flex w-full px-2 py-1 rounded-lg'>
                  <p>{opt}</p>
                </div>
              ))
            }
        </div>
      ))}
    </div>
  )
}

export default Landing
