import axios from "axios";
const BASE_ENDPOINT = "https://fiverrnew.cybersoft.edu.vn/api";
export const BASE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NCIsIkhldEhhblN0cmluZyI6IjA4LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTc1MzYwMDAwMCIsIm5iZiI6MTY5NTkyMDQwMCwiZXhwIjoxNzI1OTAxMjAwfQ.fWIHiHRVx9B7UlCgFCwvvXAlcVc-I-RB603rEDsM_wI";
export const http = axios.create({
  baseURL: BASE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    tokenCybersoft: BASE_TOKEN,
  },
});
