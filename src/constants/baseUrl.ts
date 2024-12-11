import axios from "axios";

const base = axios.create({ baseURL: "http://192.168.68.105:4000" });

export default base;
