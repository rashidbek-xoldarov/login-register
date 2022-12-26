import React, { useRef } from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modal = {
  backgroundColor: "white",
  padding: "30px",
};

const Modal = ({ setAddModal, children, title }) => {
  const modalInner = useRef();

  const overlayClick = (evt) => {
    if (evt.target === modalInner.current) {
      setAddModal(false);
    }
  };

  return (
    <div
      ref={modalInner}
      style={overlayStyle}
      onClick={overlayClick}
      className="overlay d-flex align-items-center justify-content-center"
    >
      <div style={modal} className="my-modal w-50">
        <div className="modal-header ">
          <p className="fs-4">{title}</p>
          <button
            className="btn btn-dark"
            onClick={() => {
              setAddModal(false);
            }}
          >
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
