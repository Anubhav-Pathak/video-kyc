"use client";
"use strict";
import React, { useEffect } from 'react'

import Chat from '@/components/Chat'
import WebCam from '@/components/WebCam'
import usePipelineStore from '@/store/PipelineStore';
import useChatStore from '@/store/ChatStore';
import useUserStore from '@/store/UserStore';
import useLoadingStore from '@/store/LoadingStore';
import useToastStore from '@/store/ToastStore';

import data from "@/data.json";
import { Ask, Listen } from '@/utils/pipeline.mjs';
import Toast from '@/components/ui/Toast';
import Steps from '@/components/ui/Steps';
import Navbar from '@/components/Navbar';
import Controls from '@/components/Controls';

const {questions} = data;

const Page = () => {
    const {index, setQuestion, setPrompt} = usePipelineStore();
    const addToast = useToastStore((state) => state.addToast);
    const preference = useUserStore(state => state.preference);
    const {setLoadingState} = useLoadingStore();

    console.log(index);

    const clickHandler = async () => {
        const response = await fetch(`/api/ask?index=${index}`);
        if(!response.ok) return addToast({message: "Error fetching question", type: "error"});
        const {message} = await response.json();
        askPipeline(message);
        await setLoadingState("user-prompt", true)
    }

    const askPipeline = async (question) => {
        try{
            await setQuestion(question);
            await setPrompt(prompt);
            await Ask(question, preference.lang);
        } catch (error){ 
            console.log(error);
        }
    }       

  return (
    <div className="absolute drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <Navbar />
        <div className="drawer-content flex flex-col items-center justify-center">
            <div className='self-start mb-12'> <Steps questions={questions} /> </div>
            <div className=' max-w-4xl rounded-2xl border-2 p-6'>
                <WebCam />
                <button onClick={clickHandler} className="btn btn-primary mt-4">
                    {index > 0 ? "Next" : "Start"}
                </button>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button hidden">Open drawer</label>
            </div>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <div className="menu p-2 w-80 h-full bg-base-200 text-base-content grid-cols-1 grid grid-rows-[70%_30%]">
                <Chat />
                <div className='p-4'>
                    <h1>Voice Controls</h1>
                    <Controls />
                </div>
            </div>
        </div>
        <Toast />
    </div>
  )
}

export default Page