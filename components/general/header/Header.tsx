import React from "react";
import { useNavigate } from "react-router-dom";
import "../Header/header.css";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backRoute?: string;
  mainRoute?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  backRoute = "/",
  mainRoute = "/",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  };
  const handleMainBack = () => {
    if (mainRoute) {
      navigate(mainRoute);
    }
  };

  return (
    <div className="header-container">
      <div className="header">
        {showBackButton && (
          <img
            src="/img/volver.svg"
            alt="volver"
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          />
        )}
        <h1>{title}</h1>

        <img
          src="/img/salir.svg"
          alt="salir"
          onClick={handleMainBack}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Header;
