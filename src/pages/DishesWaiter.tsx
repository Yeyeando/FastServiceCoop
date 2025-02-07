import React, { useState } from "react";
import Header from "../components/general/header/Header";
import Footer from "../components/general/footer/Footer";
import HorizontalCard from "../components/general/horizontalcard/HorizontalCard";
import Grid from "../components/menu-grid/Grid";
import ActionButtons from "../components/general/buttons/ActionButtons";
import categoriesData from "../components/general/jsons/categories/categories.json";
import IngredientPanel from "../components/dishes-waiter/sliding-panel/IngredientPanel";
import { useParams } from "react-router-dom";

function DishesWaiter() {
  const { id, table } = useParams();

  const categoryId = Number(id);
  const category = categoriesData.categories.find(
    (cat) => cat.id === categoryId
  );

  const [selectedDish, setSelectedDish] = useState<{
    title: string;
    image: string;
    category: string;
    ingredients: number[];
  } | null>(null);

  return (
    <>
      <Header title="Menu" backRoute={`/MenuWaiter/${table}`} />
      <Grid>
        {category ? (
          category.category.map((dish) => (
            <HorizontalCard
              key={dish.name}
              title={`${dish.name}`}
              image={dish.url}
              ingredients={dish.ingredients}
              onClick={() =>
                setSelectedDish({
                  title: `${dish.name}`,
                  image: dish.url,
                  category: category.title,
                  ingredients: dish.ingredients,
                })
              }
            />
          ))
        ) : (
          <p>No hay platos disponibles para esta categoría.</p>
        )}
      </Grid>
      <ActionButtons
        cancelRoute="/"
        confirmRoute={`/confirmation/${table}/${id}`}
      />
      {selectedDish && (
        <IngredientPanel
          title={selectedDish.title}
          image={selectedDish.image}
          category={selectedDish.category}
          initialIngredients={selectedDish.ingredients}
          onClose={() => setSelectedDish(null)}
        />
      )}
      <Footer/>
    </>
  );
}

export default DishesWaiter;
