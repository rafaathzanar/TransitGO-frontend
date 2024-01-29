import React from "react";
import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";

const LayoutAdmin = ({ children }) => {
  console.log("Rendering LayoutAdmin");
  return (
    <div>
      <Navbar />
      {children}
      <CornerProfileButton />
    </div>
  );
};

export default LayoutAdmin;
