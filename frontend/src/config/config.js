import { injected } from "@tg-wagmi/core";
import { createConfig, http } from "@tg-wagmi/wagmi";
import { sepolia } from "viem/chains";

export const config = createConfig({
    chains: [sepolia],
    connectors: [
        injected(),
    ],
    transports: {
        [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL)
    }
})