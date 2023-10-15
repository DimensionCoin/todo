import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleHome = () => {
    navigate("/")
  }

  const toggleLanding = () => {
    navigate("/landing")
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = "/landing";
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div>
      {window.location.pathname === "/" && (
        <div>
          <button onClick={toggleSidebar} className="menu-button">
            ☰
          </button>

          {isOpen && (
            <div className="sidebar">
              <button onClick={() => setIsOpen(false)} className="close-button">
                ×
              </button>
              <ul>
                <li>
                  <button onClick={toggleHome}>Home</button>
                </li>
                <li>
                  <button onClick={toggleLanding}>Landing</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

