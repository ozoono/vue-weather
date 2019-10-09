import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.weatherbit.io/v2.0/"
});
export const key = "YOUR_API_KEY";
