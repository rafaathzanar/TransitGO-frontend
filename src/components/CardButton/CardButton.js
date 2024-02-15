import React from "react";
import "./CardButton.css";

function CardButton({ typography, icon, onClick }) {
  return (
    <button className="card-button " onClick={onClick}>
      <div className="card-button-content">
        <span className="card-button-typography">{typography}</span>
        <img src={icon} alt={icon} className="card-button-icon" />
      </div>
    </button>
  );
}

export default CardButton;
