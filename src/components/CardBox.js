import React from "react";
import "./CardBox.css";

function CardBox({ icon, typography, onClick }) {
  return (
    <button className="card-box" onClick={onClick}>
      <div className="card-box-content">
        <img src={icon} alt={icon} className="card-box-icon" />
        <span className="card-box-typography">{typography}</span>
      </div>
    </button>
  );
}

export default CardBox;
