"use client";

import { create } from "zustand";
import { toast } from "react-toastify";
import Usertype from "@/types/user";
import request from "@/server";

interface UserState {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

interface AllUsersType {
  loading: boolean;
  search: string;
  page: number;
  total: number;
  users: Usertype[];

  getUsers: (page?: number, search?: string) => void;
  addUser: (user: UserState, selected: string | null) => void;

  deleteUser: (id: string) => void;
}

const useUsers = create<AllUsersType>()((set, get) => ({
  loading: false,
  page: 1,
  total: 0,
  selected: null,
  users: [],
  search: "",
  getUsers: async (page = 1, search = "") => {
    try {
      const {
        data: { users, total },
      } = await request.get("user", { params: { page, search } });
      console.log({ users, total });
      set({ users, total });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  addUser: async (user, selected) => {
    try {
      set({ loading: true });
      if (selected === null) {
        await request.post("user", user);
      } else {
        await request.put(`user/${selected}`, user);
      }
      toast.success("Foydalanuvchi qo'shildi! ");
      get().getUsers();
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true });
      await request.delete(`user/${id}`);
      await get().getUsers();
      toast.info("User deleted");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUsers;
