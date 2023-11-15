"use client";

import { CART } from "@/constants";

import AllCategoryType from "@/types/all-categories";

import { create } from "zustand";
import CartType from "@/types";
import request from "@/server";

interface LatestType {
  loading: boolean;
  quantity: number;
  cart: CartType[];
  data: AllCategoryType[];
  getData: () => void;
  addToCart: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
    removeCart: (id: string) => void;
  setCart: (newCart: CartType[]) => void;
}

const productJson =
  typeof window !== "undefined" ? localStorage.getItem(CART) : false;
const cart = productJson ? JSON.parse(productJson) : [];

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
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

  addToCart: (id, image, title, description, price) => {
    const { cart } = get();
    const values: any = {
      id: id || id + 1,
      image,
      title,
      description,
      price,
      quantity: 1,
    };

    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      cart.push(values);
    } else {
      cart.splice(itemIndex, 1);
    }
    set({ cart });
    localStorage.setItem(CART, JSON.stringify(cart));
  },

  removeCart: (id: string) => {
    const { cart } = get();
    const updateCart = cart.filter((product) => product.id !== id);
    set({ cart: updateCart });
    localStorage.setItem(CART, JSON.stringify(updateCart));
    toast.success("Savatchadan  o'chirildi!");
  },

  setCart: (newCart: CartType[]) => {
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },
}));

export default useCart;
