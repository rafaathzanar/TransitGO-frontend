import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./DelayInput.css";
import { useNavigate } from "react-router-dom";

const DelayInputCon = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const delayInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div>
      <div className="on">
        <Button >+ Announcement/Delay</Button>
      </div>
    </div>
  );
};

export default DelayInputCon;
