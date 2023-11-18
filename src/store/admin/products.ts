import AllProductsType from "@/types/all-products";
import getData from "./crud";

const useProducts = getData<AllProductsType>("user");

export default useProducts;
