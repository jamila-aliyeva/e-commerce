import request from "@/server";
import AllCategoryType from "@/types/all-categories";
import LastProductsType from "@/types/last-products";

import { create } from "zustand";

interface CategoriesType {
  loading: boolean;
  data: LastProductsType[];
  getData: () => void;
}

const useAllCategories = create<CategoriesType>()((set) => ({
  loading: false,
  data: [],
  getData: async () => {
    const { data }: { data: AllCategoryType[] } = await request.get("category");
    set({ data: data });
  },
}));

export default useAllCategories;
