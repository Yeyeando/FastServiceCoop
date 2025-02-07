import axios from "axios";

const API_URL = "http://localhost:8080/dishes";

// Obtener todos los platos
export const getAllDishes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo platos:", error);
    throw error;
  }
};

// Obtener un plato por ID
export const getDishById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo plato:", error);
    throw error;
  }
};

// Crear un nuevo plato
export const createDish = async (dish: { name: string }) => {
  try {
    await axios.post(API_URL, dish);
  } catch (error) {
    console.error("Error creando plato:", error);
    throw error;
  }
};

// Actualizar un plato
export const updateDish = async (id: number, dish: { name: string }) => {
  try {
    await axios.put(`${API_URL}/${id}`, dish);
  } catch (error) {
    console.error("Error actualizando plato:", error);
    throw error;
  }
};

// Eliminar un plato
export const deleteDish = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error eliminando plato:", error);
    throw error;
  }
};
