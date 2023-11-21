"use client";

import axios from "axios";
import { useEffect } from "react";

let headers = {};

const isBrowser = typeof window !== "undefined";

const updateHeaders = () => {
  if (typeof window !== "undefined") {
    const token = isBrowser && window.localStorage.getItem("token");
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      headers = {};
    }
  }
};

updateHeaders();

export const useUpdateHeaders = () => {
  useEffect(() => {
    updateHeaders();
  }, []);
};

const request = axios.create({
  baseURL: `https://ap-vodiy-parfum-backend.up.railway.app/api/v1`,
  timeout: 10000,
  headers,
});

export default request;
