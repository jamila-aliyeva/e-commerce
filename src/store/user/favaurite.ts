"use client";

import { CART } from "@/constants";

import { create } from "zustand";
import FavauriteType from "../../types/index";
import AllCategoryType from "@/types/all-categories";
import { FAV } from "@/constants";
import { toast } from "react-toastify";

import request from "@/server";

interface FavauriteState {
  loading: boolean;
  fav: boolean;
  cart: FavauriteType[];
  data: AllCategoryType[];
  getData: () => void;
  Liked: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
  removeLiked: (id: string) => void;
  setCart: (newCart: FavauriteType[]) => void;
}

const productJson =
  typeof window !== "undefined" ? localStorage.getItem(FAV) : false;
const cart = productJson ? JSON.parse(productJson) : [];

const useFavaurite = create<FavauriteState>()((set, get) => ({
  loading: false,
  data: [],
  fav: false,
  cart,
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: AllCategoryType[] } = await request.get(
        "category"
      );
      set({ data: data });
    } finally {
      set({ loading: true });
    }
  },

  Liked: async (id, image, title, description, price) => {
    const { cart } = get();
    const values: any = {
      id,
      image,
      title,
      description,
      price,
      liked: false,
    };
    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      cart.push(values);
    } else {
      cart.splice(itemIndex, 1);
    }
    set({ cart });
    localStorage.setItem(FAV, JSON.stringify(cart));
    toast.success("Sevimlilar ro'yhatiga qo'shildi!");
  },

  removeLiked: (id: string) => {
    const { cart } = get();
    const updatedCart = cart.filter((product) => product.id !== id);
    set({ cart: updatedCart });
    localStorage.setItem("FAV", JSON.stringify(updatedCart));
    toast.success("Sevimlilar ro'yhatidan o'chirildi!");
  },

  setCart: (newCart: FavauriteType[]) => {
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },
}));

export default useFavaurite;
