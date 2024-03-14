import React from 'react'
import Modal from './ui/Modal'

const VerifyModal = ({message}) => {

    clickHandler = (value) => {
        console.log(value)
    }

  return (
    <Modal id='verify-modal'>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Please Verify</h2>
                <p>{message}</p>
                <div className="card-actions justify-end"> 
                    <button className="btn btn-success" onClick={clickHandler(true)}>Yes</button> 
                    <button className="btn btn-error" onClick={clickHandler(false)}>No</button>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default VerifyModal