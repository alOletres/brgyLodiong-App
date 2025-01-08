import axios from "axios";
import { getToken } from "../lib/tokenStorage";

const base = axios.create({
  baseURL: "http://192.168.68.103:4000",
});

// Add a request interceptor
base.interceptors.request.use(
  async (config) => {
    // Get the token dynamically
    const token = await getToken("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
export default base;
