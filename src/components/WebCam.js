"use client";

import Image from 'next/image';
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

import WebCamActions from './WebCamActions';
import useChatStore from '@/store/ChatStore';
import {ImageToText} from '@/utils/pipeline.mjs';
import usePipelineStore from '@/store/PipelineStore';
import useToastStore from '@/store/ToastStore';

const WebCam = () => {
  const webcamRef = useRef(null);
  const {addMessage} = useChatStore();
  const {index, setIndex, prompt} = usePipelineStore();
  const {addToast} = useToastStore();

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if(index > 4){
      const blob = await fetch(imageSrc).then((response) => response.blob());
      const formData = new FormData();
      formData.append('image', blob, 'image/png');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) return addToast({message: "Error fetching question", type: "error"});
      else addToast({message: "File Uploaded Successfully", type: "success"})
    }
    const response = await ImageToText(prompt, imageSrc);
    await addMessage({text: response, type: 'end'});    
    await setIndex(index + 1);
  };

  return (
    <div className="relative">
      <button className='absolute top-2 left-2 btn btn-warning btn-circle z-10' onClick={capture}><Image src="/capture.png" alt='Capture' width={30} height={30} /></button>
      <Webcam
        ref={webcamRef}
        muted={true}
        videoConstraints={{ width: 640, height: 480 }}
      />
      <WebCamActions />
    </div>
  );
};

export default WebCam;