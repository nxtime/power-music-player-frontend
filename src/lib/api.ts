import axios from "axios";

// const serverPort = import.meta.env.SERVER_PORT ?? 7001;
// const baseURL = `http://localhost:3000/api`

const baseURL = `https://play.marcospaulo.dev.br/api`;

export const api = axios.create({
  baseURL
});
