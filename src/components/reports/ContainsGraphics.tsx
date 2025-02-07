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
import { getAllContaints } from "../../services/containsService.js"; // Ajusta la ruta según tu estructura

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Definimos la interfaz para la relación contains
interface Contain {
  idDish: number;
  idIngredient: number;
  quantity: number;
}

const ContainsGraphics: React.FC = () => {
  const [contains, setContains] = useState<Contain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContains = async () => {
      try {
        const data = await getAllContaints();
        setContains(data);
      } catch (err) {
        console.error("Error al obtener la información de contains:", err);
        setError("Error al cargar los datos del gráfico.");
      } finally {
        setLoading(false);
      }
    };

    fetchContains();
  }, []);

  if (loading) {
    return <div>Cargando datos del gráfico...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Preparar los datos para el gráfico:
  // Cada etiqueta combina el id del dish con el id del ingredient
  const labels = contains.map(
    (item) => `Dish ${item.idDish} - Ingredient ${item.idIngredient}`
  );
  const quantities = contains.map((item) => item.quantity);

  const data = {
    labels,
    datasets: [
      {
        label: "Quantity",
        data: quantities,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Cantidad de Ingredientes en Platos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dish - Ingredient",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de la Relación Contains</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ContainsGraphics;
