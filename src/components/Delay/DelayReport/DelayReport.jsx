import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./DelayReport.css";

const DelayReport = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

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
    <div >
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className={`form-control ${!isValid ? "invalid" : ""}`}>
              <textarea type="text" onChange={delayInputChangeHandler} />
            </div>
            <Button type="submit" class="bb">Submit Post</Button>
          </form>
        </div>
    </div>
  );
};

export default DelayReport;
