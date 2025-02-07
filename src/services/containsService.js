import axios from "axios";

const API_URL = "http://localhost:8080/contains";

// Obtener la tabla contains
export const getAllContaints = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los conteins:", error);
    throw error;
  }
};

// // Obtener ingredientes de un plato específico
// export const getIngredientsByDish = async (dishId: number) => {
//   try {
//     const response = await axios.get(`${API_URL}/${dishId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error obteniendo ingredientes del plato:", error);
//     throw error;
//   }
// };

// // Obtener una relación específica entre plato e ingrediente
// export const getContainRelation = async (
//   dishId: number,
//   ingredientId: number
// ) => {
//   try {
//     const response = await axios.get(`${API_URL}/${dishId}/${ingredientId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error obteniendo la relación plato-ingrediente:", error);
//     throw error;
//   }
// };

// // Agregar un ingrediente a un plato
// export const addIngredientToDish = async (
//   dishId: number,
//   ingredientId: number,
//   quantity: number
// ) => {
//   try {
//     const containData = {
//       idDish: dishId,
//       idIngredient: ingredientId,
//       quantity,
//     };
//     await axios.post(API_URL, containData);
//   } catch (error) {
//     console.error("Error agregando ingrediente al plato:", error);
//     throw error;
//   }
// };

// // Actualizar cantidad de un ingrediente en un plato
// export const updateIngredientInDish = async (
//   dishId: number,
//   ingredientId: number,
//   quantity: number
// ) => {
//   try {
//     const containData = {
//       idDish: dishId,
//       idIngredient: ingredientId,
//       quantity,
//     };
//     await axios.put(`${API_URL}/${dishId}/${ingredientId}`, containData);
//   } catch (error) {
//     console.error("Error actualizando cantidad de ingrediente:", error);
//     throw error;
//   }
// };

// // Eliminar un ingrediente de un plato
// export const removeIngredientFromDish = async (
//   dishId: number,
//   ingredientId: number
// ) => {
//   try {
//     await axios.delete(`${API_URL}/${dishId}/${ingredientId}`);
//   } catch (error) {
//     console.error("Error eliminando ingrediente del plato:", error);
//     throw error;
//   }
// };
