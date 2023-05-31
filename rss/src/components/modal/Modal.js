import React from "react";
import "./modal.css";

export default function Modal({ open, setOpen, children }) {
  return (
    open && (
      <div className="modal">
        <div className="modal_main">{children}</div>
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="modal_background"
        ></div>
      </div>
    )
  );
}
