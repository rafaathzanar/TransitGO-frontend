import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import "./DelayInput.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Add from "@mui/icons-material/Add";

const DelayInput = (onAddGoal) => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showRules, setShowRules] = useState(false);

  const delayInputChangeHandler = (event) => {
    const inputText = event.target.value;
    setEnteredValue(inputText);
    setIsValid(true);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (enteredValue.trim() === "") {
      setIsValid(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/announcement",
        {
          details: enteredValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEnteredValue("");
      window.location.reload();

      console.log("Entered value after submission:", enteredValue);
    } catch (error) {
      console.error("Error adding delay:", error);
    }
 
  };

  const toggleRules = () => {
    if (token != null){
      setShowRules(!showRules);
    }else{
      navigate("/signin");
    }
    
  };

  return (
    <div>
      <div className="on">
        <Button onClick={toggleRules} className="but-add">
          <Add onClick={toggleRules} />
          <span className="button-text">Add Announcement</span>
        </Button>
      </div>

      {showRules && (
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className={`form-control ${!isValid ? "invalid" : ""}`}>
              <textarea
                value={enteredValue}
                type="text"
                onChange={delayInputChangeHandler}
              />
            </div>
            {!isValid && <p className="error-text">Please enter a value!</p>}
            <Button type="submit">Submit Post</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DelayInput;
