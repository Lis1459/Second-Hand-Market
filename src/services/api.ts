import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (responce) => responce,
  (error) => {
    console.error("API error: ", error);
    return Promise.reject(error);
  },
);
