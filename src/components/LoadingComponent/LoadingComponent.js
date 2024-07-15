import React from "react";
import "./LoadingComponent.css";
import Logo from "../../logo/logo.png";
const LoadingComponent = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="circle"></div>
        <div className="loading-text">
          <img
            src={Logo}
            alt="logo"
            width={216}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
