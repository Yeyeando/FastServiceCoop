import React from "react";
import "./horizontal-card.css";

interface HorizontalCardProps {
  title: string;
  image: string;
  buttonIcon?: string;
  buttonText?: string;
  showButton?: boolean;
  ingredients?: number[]; // Lista de IDs de ingredientes
  onClick?: () => void;
  onRemove?: () => void;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  image,
  ingredients = [],
  onClick,
  showButton = false,
  buttonIcon = "/img/cross.svg",
  onRemove,
}) => {
  return (
    <div className="card-style" onClick={onClick} style={{ cursor: "pointer" }}>
      {showButton && (
        <button
          className="card-button"
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic en el botón active el `onClick` de la tarjeta
            if (onRemove) onRemove();
          }}
        >
          <img src={buttonIcon} alt="Remove" className="button-icon" />
        </button>
      )}
      <img src={image} className="image-style" alt={title} />
      <div className="content-style">
        <h3 className="title-style">{title}</h3>
      </div>
    </div>
  );
};

export default HorizontalCard;
