import { ENDPOINT } from "@/constants";
import axios from "axios";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1`,
  timeout: 10000,
});

export default request;
