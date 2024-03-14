import usePipelineStore from '@/store/PipelineStore'
import React from 'react'

const Steps = ({questions}) => {
    const {index} = usePipelineStore();
  return (
    <ul className="steps">
        {questions.map((question, i) => <li key={i} className={`step ${i<index ? "step-primary" : ""}`}></li>)}
    </ul>
  )
}

export default Steps