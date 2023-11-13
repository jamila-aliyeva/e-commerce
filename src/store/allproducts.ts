import request from "@/server";
import AllProductsType from "@/types/all-products";

import { create } from "zustand";

interface ProductsType {
  total: number;
  loading: boolean;
  search: string;
  data: AllProductsType[];
  getData: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useAllProducts = create<ProductsType>()((set, get) => ({
  total: 0,
  search: "",
  loading: false,
  data: [],
  getData: async () => {
    const { data }: { data: AllProductsType[] } = await request.get("product");
    set({ data: data });
  },
  handleSearch: async (e) => {
    set((state) => ({ ...state, search: e.target.value }));
    get().getData();
  },
}));

export default useAllProducts;
