"use client";

import { CART } from "@/constants";
import Cookies from "js-cookie";

import AllCategoryType from "@/types/all-categories";

import { create } from "zustand";
import CartType from "@/types";
import request from "@/server";
import { toast } from "react-toastify";
import storeProduct from "@/types/card";

interface orderCard {
  cart: {
    product: string;
    quantity: number;
  }[];
  comment: string;
}

interface LatestType {
  loading: boolean;
  quantity: number;
  refresh: boolean;
  cart: CartType[];
  data: AllCategoryType[];
  setRefresh: (ref: boolean) => void;
  OrderProduct: () => void;
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

const JsonCart = Cookies.get("cart");

let StorageProducts = JsonCart ? JSON.parse(JsonCart) : null;

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
  cart,
  refresh: false,
  setRefresh: (ref) => {
    set({ refresh: ref });
  },

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
    toast.error("Savatchadan  o'chirildi!");
  },

  setCart: (newCart: CartType[]) => {
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },

  OrderProduct: async () => {
    const cartProducts: orderCard = {
      cart: [],
      comment: "Buyurtma",
    };

    if (!StorageProducts || !Array.isArray(StorageProducts)) {
      StorageProducts = [];
    }

    StorageProducts.map((el: storeProduct) => {
      cartProducts.cart.push({
        product: el.el._id,
        quantity: el.quantity,
      });
    });

    try {
      await request.post("auth/payments");
      console.log(cartProducts);
      Cookies.remove("cart");
      const { refresh } = get();
      set({ refresh: !refresh });
      toast.success("Buyurtmangiz qabul qilindi!");
    } catch (error) {
      console.log(error);
      toast.error("Buyurtma qabul qilishda xatolik yuz berdi!");
    }
  },
}));

export default useCart;
