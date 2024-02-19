import React from "react";
import "./form.css";
import H1 from "../../components/heading/heading";
import M2 from "../../components/assets/p2.png";
import TextField from "../../components/textfield/Textfield";
import LoginButton from "../../components/LoginButton/LoginButton";

const Form = () => {
  return (
    <div className="container">
      <div className="leftside">
        <img className="i1" src={M2} />
      </div>
      <div className="main">
        <div className="heading">
          <H1 text="Where is it going?" />
        </div>
        <div className="form">
          <TextField />
        </div>
        <div className="confirm">
          <LoginButton buttonTitle="Confirm Booking"></LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Form;
