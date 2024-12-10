import axios from "axios";

const base = axios.create({ baseURL: "http://localhost:4000" });

export default base;
