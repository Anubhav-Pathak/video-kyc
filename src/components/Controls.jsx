import React, { useState } from 'react'

const Controls = () => {
  const [volume, setVolume] = useState(50);
  const [rate, setRate] = useState(25);
  const [pitch, setPitch] = useState(70);
  return (
    <div>
        <label className="form-control w-full max-w-xs">
            <div className="label"><span className="label-text text-xs">Volume</span></div>
            <input type="range" min={0} max="100" value={volume} className="range range-xs" onChange={(e)=>{setVolume(e.target.value)}} /> 
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label"><span className="label-text text-xs">Rate</span></div>
            <input type="range" min={0} max="100" value={rate} className="range range-xs" onChange={(e)=>{setRate(e.target.value)}} /> 
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label"><span className="label-text text-xs">Pitch</span></div>
            <input type="range" min={0} max="100" value={pitch} className="range range-xs" onChange={(e)=>{setPitch(e.target.value)}} /> 
        </label>
    </div>
  )
}

export default Controls