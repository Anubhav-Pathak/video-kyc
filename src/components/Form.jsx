import React, {useState} from 'react'
import Image from 'next/image';

import useLoadingStore from '@/store/LoadingStore';
import useToastStore from '@/store/ToastStore';

const Form = () => {

    const [verified, setVerified] = useState(false);
    const [data, setData] = useState({name: "",dob: "",address: "",income: "",employment: ""});
    const { loadingStates, setLoadingState } = useLoadingStore();
    const {addToast} = useToastStore();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingState("form", true);
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) return addToast({message: "Failed to save data", type: "error"});
        await setLoadingState("form", false);
        setVerified(true);
    }

  return (
    <>{
        verified ? 
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><Image src="/verified.png" alt="verified" width="100" height="100" /></figure>
        <div className="card-body">
            <h2 className="card-title">Saved !</h2>
            <p>Hang on, while our system verifies your KYC</p>
        </div>
        </div>
        :
        <form className='flex flex-col gap-y-2' onSubmit={submitHandler}>
            <label> Name: <input type="text" className="input input-bordered w-full max-w-xs"  value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/> </label>
            <label> Date of Birth: <input type="date" className="input input-bordered w-full max-w-xs"  value={data.dob} onChange={(e) => setData({...data, dob: e.target.value})} /> </label>
            <label className='flex items-start'> Address: <textarea className="textarea textarea-bordered ml-4" value={data.address} id="" cols="30" rows="5" onChange={(e) => setData({...data, address: e.target.value})}></textarea></label>
            <label> Income Range: <input type='number' className="input input-bordered w-full max-w-xs"  value={data.income} onChange={(e) => setData({...data, income: e.target.value})} /> </label>
            <label> Employment: <input type='text' className="input input-bordered w-full max-w-xs"  value={data.employment} onChange={(e) => setData({...data, employment: e.target.value})} /> </label>
            <div className='flex gap-x-2 mt-4'>
                <button type="submit" className="btn btn-primary flex">{ loadingStates['form'] ? <span className="loading loading-spinner loading-md"></span> : "Save"}</button>
                <button className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    }</>
  )
}

export default Form