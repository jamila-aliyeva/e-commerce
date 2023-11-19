import axios from "axios";

const request = axios.create({
  baseURL: `https://ap-vodiy-parfum-backend.up.railway.app/api/v1`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")} ` },
});

export default request;
