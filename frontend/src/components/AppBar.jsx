"use client"

import useVotingSystem from '@/hooks/useVotingSystem';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from '@tg-wagmi/wagmi'
import Link from 'next/link';
import React, { useState } from 'react'

function AppBar() {

    const {address} = useAccount();

  return (
    <div className='w-full'>
      <div className='mx-3 my-2 py-5 px-4 flex justify-between items-center bg-indigo-300 rounded-2xl'>
        <div>
           <p className='text-2xl font-semibold text-white under'>Voting</p>
        </div>
        <div>
            {!address ? (
        <Connectors />
      ) : (
        <div className='flex gap-2 justify-center items-center'>
          <Disconnectors />
          <Link href={"/add-new"}>
          <div 
          className='bg-white px-2 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110'>
            <i className="fa-solid fa-plus"></i>
          </div>
          </Link>  
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

function Connectors() {
    const { connectors, connect } = useConnect();
    const [ popup, setPopup ] = useState(false);

    return (
        <div>
            <button 
            className='bg-white font-semibold px-2 py-1 rounded-2xl cursor-pointer'
            onClick={() => (setPopup(!popup))}>Connect Wallet</button>
            {popup && (
                <div className='absolute flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-2xl mt-2'>
                    {connectors.map((connector) => (
                        <div
                        className='bg-gray-300 text-center px-2 py-2 rounded-lg cursor-pointer' 
                        onClick={() => connect({connector})}>
                            {connector.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


function Disconnectors() {

    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    return (
        <div className='flex gap-2 bg-white px-4 py-1 rounded-full'>
            {address.slice(0, 6)}...{address.slice(-4)}
            <button
            className='cursor-pointer'
            onClick={disconnect}><i class="fa-solid fa-power-off"></i></button>
        </div>
    );
}

export default AppBar