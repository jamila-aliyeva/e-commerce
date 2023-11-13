import request from "@/server";
import CartType from "@/types";

import LastProductsType from "@/types/last-products";

import { create } from "zustand";

interface LatestType {
  loading: boolean;
  quantity: number;
  cart: CartType[];
  data: LastProductsType[];
  getData: () => void;
  addToCart: (id: string) => void;
}

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
  cart: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: LastProductsType[] } = await request.get(
        "category"
      );
      set({ data: data });
    } finally {
      set({ loading: true });
    }
  },
  addToCart: async (id) => {
    const { cart } = get();
    const values = {
      product: id,
      quantity: 1,
    };
    cart.push(values);
    console.log(cart);
  },
}));

export default useCart;
