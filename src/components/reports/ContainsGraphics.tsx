import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllContaints } from "../../services/containsService.js";
import { getAllIngredients } from "../../services/ingredientsService.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Interfaz para la relación contains
interface Contain {
  idDish: number;
  idIngredient: number;
  quantity: number;
}

// Interfaz para ingredientes (ajustada al JSON recibido)
interface Ingredient {
  id_ingredient: number;
  name: string;
  contains?: any; // esta propiedad la ignoramos en este caso
}

const ContainsGraphics: React.FC = () => {
  const [contains, setContains] = useState<Contain[]>([]);
  const [ingredients, setIngredients] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const containsData = await getAllContaints();
        const ingredientsData: Ingredient[] = await getAllIngredients();

        // Crear un mapeo usando id_ingredient en lugar de id
        const ingredientsMap: Record<number, string> = {};
        ingredientsData.forEach((ingredient) => {
          ingredientsMap[ingredient.id_ingredient] = ingredient.name;
        });

        setContains(containsData);
        setIngredients(ingredientsMap);
      } catch (err) {
        console.error("Error al obtener la información:", err);
        setError("Error al cargar los datos del gráfico.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando datos del gráfico...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Agrupar por nombre del ingrediente y sumar sus cantidades
  const ingredientQuantities: Record<string, number> = {};
  contains.forEach(({ idIngredient, quantity }) => {
    const ingredientName =
      ingredients[idIngredient] || `Ingredient ${idIngredient}`;
    if (ingredientQuantities[ingredientName]) {
      ingredientQuantities[ingredientName] += quantity;
    } else {
      ingredientQuantities[ingredientName] = quantity;
    }
  });

  // Preparar los datos para el gráfico
  const labels = Object.keys(ingredientQuantities);
  const quantities = Object.values(ingredientQuantities);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Quantity per Ingredient",
        data: quantities,
        backgroundColor: "rgb(255, 6, 6)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Cantidad Total de Ingredientes en Platos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ingredient Name",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Quantity",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de Ingredientes en Platos</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ContainsGraphics;
