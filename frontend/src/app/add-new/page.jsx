"use client"

import useVotingSystem from '@/hooks/useVotingSystem';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function page() {

    const [title, setTitle] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState(["option1", "option2"]);
    const [error, setError] = useState(null);
    const { createTopic } = useVotingSystem();

    const handleSubmit = (e) => {
        e.preventDefault();
         if(!title) {
            setError("Title cannot be empty");
            toast.error("Title cannot be empty");
            return;
        }

        if(options.length < 2) {
            setError("Atleast two options are required");
        toast.error("Atleast two options are required");
            return;
        }

        createTopic(title, options);
        toast.success("Title added successfully");

    }

    const handleOptionsSubmit = (e) => {
        e.preventDefault();
        if(!option) {
        toast.error("Option input field cannot be empty");
            setError("Option input field cannot be empty");
            return;
        }
        setOptions([...options, option]);
        setOption("")
        toast.success("Option added successfully");
    }
    return (
        <div className='w-full flex justify-center items-center mt-10'>
            <form onSubmit={handleSubmit} className='w-full md:w-1/3 flex flex-col gap-4'>
                <input 
                placeholder='Enter Title'
                className='bg-gray-200 text-xl outline-none rounded-lg shadow focus:shadow-indigo-200 px-2 py-1' type="text" onChange={(e) => { setTitle(e.target.value) }} />
                <hr />
                <p className='font-semibold'>Add Options</p>
                <div className='w-full flex justify-between'>
                    <input 
                    placeholder='Enter option'
                    value={option}
                    className='w-12/10 bg-gray-200 outline-none rounded-l-lg shadow focus:shadow-indigo-200 px-2 py-1' type="text" onChange={(e) => { setOption(e.target.value) }} />
                    <button className='w-2/12 bg-black text-white rounded-r-lg' type='button' onClick={handleOptionsSubmit}>Add</button>
                </div>
                    <div className='flex flex-col gap-2'>
                        {options.map((opt, index) => (
                            <div key={index} className='bg-gray-100 px-2 py-1 rounded-lg'>
                                <p>{opt}</p>
                            </div>
                        ))}
                    </div>
                {error && (<p className='text-red-500'>{error}</p>)}
                <button 
                className='bg-indigo-200 text-white px-2 py-1 rounded-lg'
                type='submit'>Add New Topic</button>
            </form>
        </div>
    )
}

export default page
