import axios from "axios";

const API_URL = "http://localhost:8080/users"; // URL del backend de Spring Boot

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por id
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con id ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creando el usuario:", error);
    throw error;
  }
};

// Actualizar un usuario por ID
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el usuario con id ${id}:`, error);
    throw error;
  }
};
