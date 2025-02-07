import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDishContext } from "../../../pages/DishContext";
import "./action-buttons.css";

interface ActionButtonsProps {
  cancelRoute: string; 
  confirmRoute: string;
  confirmText: string;
  onSend?: () => void; // Función específica para el botón Confirm/Send
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  cancelRoute,
  confirmRoute,
  confirmText = "Confirm",
  onSend,
}) => {
  const { clearDishes } = useDishContext();
  const navigate = useNavigate();
  const { table } = useParams();

  return (
    <div className="buttons">
      <button
        className="button-cancel"
        onClick={() => {
          clearDishes(Number(table)); // Limpia el JSON
          navigate(cancelRoute);
        }}
      >
        Cancel
      </button>
      <button
        className="button-confirm"
        onClick={() => {
          if (onSend) {
            clearDishes(Number(table));
            navigate(cancelRoute);
          } else {
            navigate(confirmRoute);
          }
        }}
      >
        {confirmText}
      </button>
    </div>
  );
};

export default ActionButtons;
