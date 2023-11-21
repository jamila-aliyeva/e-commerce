"use client";

import { useEffect } from "react";
import User from "@/types/user";
import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (user: User) => void;
}

const useAuth = create<AuthState>((set, get) => {
  const isBrowser = typeof window !== "undefined";

  const userJson = isBrowser ? window.localStorage.getItem("user") : null;
  const user = userJson ? JSON.parse(userJson) : null;

  return {
    isAuthenticated: Boolean(isBrowser && window.localStorage.getItem("token")),
    user,
    setIsAuthenticated: (user) => {
      const { isAuthenticated } = get();
      set({ isAuthenticated: !isAuthenticated, user });
    },
  };
});

export const useSyncWithLocalStorage = () => {
  const { user, isAuthenticated } = useAuth((state) => state);

  useEffect(() => {
    if (user !== null) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    window.localStorage.setItem("token", isAuthenticated ? "tokenValue" : "");
  }, []);
};

export default useAuth;
