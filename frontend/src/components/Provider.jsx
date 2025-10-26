"use client";

import { config } from '@/config/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@tg-wagmi/wagmi'
import React from 'react'

function Provider({children}) {

    const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Provider
