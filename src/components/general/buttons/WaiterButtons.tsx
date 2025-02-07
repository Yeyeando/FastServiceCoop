import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./waiter-buttons.css";

const WaiterButtons: React.FC = () => {
  const navigate = useNavigate();
  const [helpMode, setHelpMode] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const openHelp = () => {
    window.open("/help/Realizarcomanda.html", "_blank");
  };

  const handleImageClick = () => {
    setHelpMode((prev) => !prev);
  };

  return (
    <div className="button-container">
      <button
        className="nav-button"
        onClick={helpMode ? openHelp : () => handleNavigation("/")}
      >
        {helpMode ? "Help" : "Take order"}
      </button>
      <img src="/img/help.svg" alt="help" onClick={handleImageClick} />
      <button
        className="nav-button"
        onClick={
          helpMode ? () => handleNavigation("/Report") : () => handleNavigation("/PickUp")
        }
      >
        {helpMode ? "Report" : "Pick up"}
      </button>
    </div>
  );
};

export default WaiterButtons;
