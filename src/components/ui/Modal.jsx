import React from "react";

const Modal = (props) => {
  return (
    <dialog className="modal" id={props.id}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById(props.id).close()}>✕</button>
        {props.children}
      </div>
    </dialog>
  );
};

export default Modal;