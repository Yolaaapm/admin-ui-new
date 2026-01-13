import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app"; // URL backend

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password }, 
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Login gagal" };
  }
};

export const registerService = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Registrasi gagal" };
  }
};

export const getExpenses = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Gagal mengambil data expenses" };
  }
};

export const logoutService = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return; 

    await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error.response?.data || { msg: "Logout backend gagal" };
  }
};