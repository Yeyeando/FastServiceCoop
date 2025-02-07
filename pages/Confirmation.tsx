import React from "react";
import Grid from "../components/menu-grid/Grid";
import HorizontalCard from "../components/general/horizontalcard/HorizontalCard";
import ActionButtons from "../components/general/buttons/ActionButtons";
import { useDishContext } from "./DishContext";
import Header from "../components/general/header/Header";
import Footer from "../components/general/footer/Footer";
import ingredientsData from "../components/general/jsons/ingredients/ingredients.json";
import "./pages-css/Confirmation.css"
import { useParams } from "react-router-dom";

function Confirmation() {
  const { selectedDishes, removeDish } = useDishContext();
  const { table } = useParams();
  const { id } = useParams();

  const getIngredientName = (id: number) => {
    for (const category of ingredientsData.ingredients) {
      const ingredient = category.ingredients.find((ing) => ing.id === id);
      if (ingredient) {
        return ingredient.name;
      }
    }
    return "Desconocido";
  };

  const groupIngredients = (ingredientIds: number[]) => {
    const ingredientCounts: { [key: number]: number } = {};
    ingredientIds.forEach((id) => {
      ingredientCounts[id] = (ingredientCounts[id] || 0) + 1;
    });

    return Object.entries(ingredientCounts).map(([id, count]) => ({
      name: getIngredientName(Number(id)),
      count,
    }));
  };

  const handleSend = () => {
    // Realiza la misma lógica que Cancel
    console.log("Send button pressed: limpiando JSON y redirigiendo.");
  };

  return (
    <>
      <Header backRoute={`/DishesWaiter/${table}/${id}`} title="Confirmation" />
      <Grid>
        {selectedDishes.length > 0 ? (
          selectedDishes
            .filter((dish) => dish.table === Number(table))
            .map((dish, index) => (
              <div key={index}>
                <div className="ingredients-container">
                <HorizontalCard
                  showButton={true}
                  title={dish.title}
                  image={dish.image}
                  onRemove={() => removeDish(index)}
                />
                {/* Mostrar ingredientes agrupados */}
                
                <ul>
                  {groupIngredients(dish.ingredients).map(
                    ({ name, count }, idx) => (
                      <li key={idx}>
                        {name} x{count}
                      </li>
                    )
                  )}
                </ul>
                </div>
              </div>
            ))
        ) : (
          <p>No hay platos seleccionados</p>
        )}
      </Grid>
      <ActionButtons
        cancelRoute="/" 
        confirmRoute="/" 
        confirmText="Send" // Cambia el texto del botón Confirm a Send
        onSend={handleSend} // Asigna la funcionalidad de Send
      />
      <Footer />
    </>
  );
}

export default Confirmation;
