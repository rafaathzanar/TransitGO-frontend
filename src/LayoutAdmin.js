//LayoutAdmin.js
import React from "react";
import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";
import { Outlet } from "react-router";
const LayoutAdmin = () => {
  
  return (
    
    <>
      <Navbar />
      <CornerProfileButton />
      <Outlet></Outlet>
    </>
  );
};

export default LayoutAdmin;
