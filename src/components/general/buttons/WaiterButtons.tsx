import { useNavigate } from "react-router-dom";
import "./waiter-buttons.css";
const WaiterButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="button-container">
      <button className="nav-button" onClick={() => handleNavigation("/")}>
        Take order
      </button>
      <button
        className="nav-button"
        onClick={() => handleNavigation("/Report")}
      >
        Pick up
      </button>
    </div>
  );
};
export default WaiterButtons;
