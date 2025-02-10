// ingredientsService.js
import axios from "axios";

const API_URL = "http://localhost:8080/ingredients";

// Obtener todos los ingredientes
export const getAllIngredients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo ingredientes:", error);
    throw error;
  }
};

// Obtener un ingrediente por ID
export const getIngredientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo ingrediente:", error);
    throw error;
  }
};

// Crear un nuevo ingrediente
export const createIngredient = async (ingredient) => {
  try {
    await axios.post(API_URL, ingredient);
  } catch (error) {
    console.error("Error creando ingrediente:", error);
    throw error;
  }
};

// Actualizar un ingrediente
export const updateIngredient = async (id, ingredient) => {
  try {
    await axios.put(`${API_URL}/${id}`, ingredient);
  } catch (error) {
    console.error("Error actualizando ingrediente:", error);
    throw error;
  }
};

// Eliminar un ingrediente
export const deleteIngredient = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error eliminando ingrediente:", error);
    throw error;
  }
};
