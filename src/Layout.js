import React from "react";
import Navbar from "./components/navbar/Navbar";
import CornerProfileButton from "./components/CornerProfileButton/CornerProfileButton";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <CornerProfileButton />
    </div>
  );
};

export default Layout;
