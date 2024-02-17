import React, { Component } from "react";

import MyForm from "../../components/MyForm";
import { useNavigate } from "react-router-dom";

function LostForm() {
  const navigate = useNavigate();

  return (
    <div className="lost-form">
      <div className="lost-form-container">
        <MyForm heading="Report Lost Item" />
      </div>
    </div>
  );
}

export default LostForm;
