import React from "react";
import "./CardBox.css";

function CardBox({  icon,typography, onClick }) {
  return (
    <button className="card-button" onClick={onClick}>
      <div className="card-button-content">
        <span className="card-button-typography">{typography}</span>
        <img src={icon} alt={icon} className="card-button-icon" />
      </div>
    </button>
  );
}

export default CardBox;
