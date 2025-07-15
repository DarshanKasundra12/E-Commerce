import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-commerce-1-zey8.onrender.com/",
});

export default instance;