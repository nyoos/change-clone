import React from "react";

export default function ModalWrapper({ children, clickAway }) {
  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-40">
      <div
        className="modal-overlay absolute w-full h-full bg-black opacity-20 "
        onClick={clickAway}
      ></div>

      {children}
    </div>
  );
}
