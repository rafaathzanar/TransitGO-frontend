import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button type={props.type} className="buttondelay" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
