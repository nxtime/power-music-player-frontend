import axios from "axios";

const serverPort = import.meta.env.SERVER_PORT ?? 3000;

const baseURL = `http://localhost:${serverPort}/api`

export const api = axios.create({
  baseURL
});
