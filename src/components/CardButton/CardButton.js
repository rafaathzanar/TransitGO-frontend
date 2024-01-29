import React from "react";
import "./CardButton.css"; // Import the CSS file for styling

function CardButton({ typography, icon, onClick }) {
  return (
    <button className="card-button" onClick={onClick}>
      <div className="card-button-content">
        <img src={icon} alt={icon} className="card-button-icon" />
        <span className="card-button-typography">{typography}</span>
      </div>
    </button>
  );
}

export default CardButton;
