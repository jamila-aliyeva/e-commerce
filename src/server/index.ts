import axios from "axios";

let headers = {};

if (typeof window !== "undefined") {
  const token = window.localStorage.getItem("token");
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
}

const request = axios.create({
  baseURL: `https://ap-vodiy-parfum-backend.up.railway.app/api/v1`,
  timeout: 10000,
  headers,
});

export default request;
