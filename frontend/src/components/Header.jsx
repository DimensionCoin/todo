import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  

  return (
    <div className="flex justify-between p-4 bg-blue-500 text-white">
      <h1>Logo</h1>

      <div className="flex gap-6">
       
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
