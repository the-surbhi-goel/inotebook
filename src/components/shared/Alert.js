import React from "react";

const AlertStyle = {
  position: "fixed",
  top: "60px",
  right: 10,
  left: 10,
  zIndex: 1030,
};

export default function Alert(props) {
  return (
    <>
      {props.message && (
        <div className={`alert alert-${props.type}`} role="alert" style={AlertStyle}>
          {props.message}
        </div>
      )}
    </>
  );
}
