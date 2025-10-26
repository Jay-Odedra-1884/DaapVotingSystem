import { abi } from '@/abi/abi';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from '@tg-wagmi/wagmi';
import React, { useEffect } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

function useVotingSystem() {

    const { data:topics, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getTopics',
    });

    const {data:hash, writeContract } = useWriteContract();

    const { isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if(isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);

  return {
    topics,
    createTopic: (title, options) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'createTopic',
        args: [title, options],
    }),
    vote: (id, index) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'vote',
        args: [id, index],
    }),
    getTopicById: (id) => useReadContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getTopicById',
        args: [id],
    }),
    editTitle: (id, newTitle) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'editTitle',
        args: [id, newTitle],
    }),
    deleteTopic: (id) => writeContract({
        address: CONTRACT_ADDRESS,
        abi:abi,
        functionName: 'deleteTopic',
        args: [id],
    }),
    addOption: (id, newOption) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'addOption',
        args: [id, newOption],
    }),
    editOption: (topicId, optionIndex, newOption) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'editOption',
        args: [topicId, optionIndex, newOption],
    }),
    deleteOption: (topicId, optionIndex) => writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'deleteOption',
        args: [topicId, optionIndex],
    })
  }
}

export default useVotingSystem
