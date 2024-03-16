"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import WebCamActions from './WebCamActions';
import useChatStore from '@/store/ChatStore';
import usePipelineStore from '@/store/PipelineStore';
import useToastStore from '@/store/ToastStore';
import useDataStore from '@/store/DataStore';
import useLoadingStore from '@/store/LoadingStore';

const WebCam = () => {
  const webcamRef = useRef(null);
  const {addMessage} = useChatStore();
  const {question, setQuestion, index, setIndex, type} = usePipelineStore();
  const {data, setData} = useDataStore();
  const {addToast} = useToastStore();
  const {loadingStates, setLoadingState} = useLoadingStore();

  const capture = async () => {
    setLoadingState('image-upload', true);
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((response) => response.blob());
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("dob", data.dob);
    formData.append('type', type);
    formData.append('image', blob, 'image/png');
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (!response.ok) return addToast({message: "Error fetching question", type: "error"});
    else {
      const {message} = await response.json();
      await setData(type, message);
      await addToast({message: "File Uploaded Successfully", type: "success"})
      await addMessage({text: "File Uploaded Successfully", type: 'end'});
      await setIndex(index + 1)
    }
    setLoadingState('image-upload', false);
  };

  return (
    <div className="relative">
      {(index === 3 || index === 6 || index === 7) && 
      <>
        <button className='absolute top-2 left-2 btn btn-warning btn-circle z-10' onClick={capture}> { loadingStates['image-upload'] ? <span className="loading loading-spinner loading-md"></span> : <Image src="/capture.png" alt='Capture' width={30} height={30} />}</button>
      </>
      }
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