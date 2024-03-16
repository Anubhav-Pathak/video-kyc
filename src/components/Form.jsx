import React, {useEffect, useState} from 'react'
import Image from 'next/image';

import useLoadingStore from '@/store/LoadingStore';
import useDataStore from '@/store/DataStore';
import useToastStore from '@/store/ToastStore';
import { set } from 'mongoose';
import { Ask } from '@/utils/pipeline.mjs';

const Form = () => {

    const [approval, setApproval] = useState(false);
    const [verified, setVerified] = useState(false);
    const {data, setData} = useDataStore();
    const [value, setValue] = useState(data);
    const { loadingStates, setLoadingState } = useLoadingStore();
    const {addToast} = useToastStore();

    useEffect(() => {
        setValue(data);
    }, [data])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingState("form", true);
        let response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) return addToast({message: "Failed to save data", type: "error"});
        await setLoadingState("form", false);
        setVerified(true);

        // Code fo verification !!!

        // await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights');
        // await faceapi.nets.tinyFaceDetector.loadFromUri('/weights');
        // await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
        // await faceapi.nets.faceRecognitionNet.loadFromUri('/weights');
        // await faceapi.nets.faceExpressionNet.loadFromUri('/weights');

        // response = await fetch('/api/verify', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({profile: data.profile, aadhar: data.aadhar})
        // })
        // const {message} = await response.json();
        // if(response.ok){
        //     if(message === "Face matched"){
        //         setApproval(true);
        //         addToast({message: "Face matched", type: "success"});
        //     }
        //     else{
        //         addToast({message: "Face not matched", type: "error"});
        //     }
        //     await Ask(message);
        // }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        setApproval(true);
        await Ask("KYC Verification completed ! Thank you for your patience.");
    }

  return (
    <>{
        verified ? 
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><Image src="/verified.png" alt="verified" width="100" height="100" /></figure>
        <div className="card-body">
            <h2 className="card-title">Saved !</h2>
            <p>{approval ? "Your KYC has been approved !" : "Hang on..., while our system verifies your KYC"}</p>
        </div>
        </div>
        :
        <form className='flex flex-col gap-y-2' onSubmit={submitHandler}>
            <label> Name: <input type="text" className="input input-bordered w-full max-w-xs"  value={value.name} onChange={(e) => setValue({...value, name: e.target.value})}/> </label>
            <label> Date of Birth: <input type="text" className="input input-bordered w-full max-w-xs"  value={value.dob} onChange={(e) => setValue({...value, dob: e.target.value})} /> </label>
            <label className='flex items-start'> Address: <textarea className="textarea textarea-bordered ml-4" value={value.address} id="" cols="30" rows="5" onChange={(e) => setValue({...value, address: e.target.value})}></textarea></label>
            <label> Income Range: <input type='number' className="input input-bordered w-full max-w-xs"  value={value.income} onChange={(e) => setValue({...value, income: e.target.value})} /> </label>
            <label> Employment: <input type='text' className="input input-bordered w-full max-w-xs"  value={value.employment} onChange={(e) => setValue({...value, employment: e.target.value})} /> </label>
            <div className='flex gap-x-2 mt-4'>
                <button type="submit" className="btn btn-primary flex">{ loadingStates['form'] ? <span className="loading loading-spinner loading-md"></span> : "Save"}</button>
                <button className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    }</>
  )
}

export default Form